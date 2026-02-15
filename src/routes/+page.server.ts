import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqMDUj77vjDIR45hcIp_X_g3zW41sqidJz_B7LBey4hxEqOBoyBfYPvqNWxrTtOMxnOZV2dndppUrJ/pub?gid=0&single=true&output=csv';

    try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        
        const allLines = csvText.split(/\r?\n/);

        // Використовуємо reduce для безпечного збору даних
        const concerts = allLines.slice(1).reduce((acc: any[], line) => {
            const columns = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(col => 
                col.replace(/^"|"$/g, '').trim()
            );

            // ПЕРЕВІРКА: Ігноруємо рядок, якщо:
            // 1. Мало колонок
            // 2. Перша колонка порожня
            // 3. Це випадково заголовок (містить слово "Date")
            if (columns.length < 5 || !columns[0] || columns[0].toLowerCase().includes('date')) {
                return acc; // Просто повертаємо акумулятор без додавання цього рядка (це і є твій "pass")
            }

            acc.push({
                date: columns[0],
                time: columns[1] || '',
                city: columns[2] || '',
                country: columns[3] || '',
                venue: columns[4] || '',
                program: columns[5] || '',
                link: columns[6] || '',
                image: columns[7] || '',
                status: columns[8] || 'upcoming'
            });

            return acc;
        }, []);

        // Сортування тепер безпечне, бо в масиві гарантовано тільки об'єкти
        concerts.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

        return { concerts };
    } catch (e) {
        console.error('Error loading CSV:', e);
        return { concerts: [] };
    }
};

// export const load = (async () => {
//     return {};
// }) satisfies PageServerLoad;