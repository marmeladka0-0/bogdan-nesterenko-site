// src/routes/+page.server.ts
import { getConcerts, type Concert } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const data = await getConcerts();
    let displayConcerts: Concert[] = [];

    // Ваша логіка відображення для головної сторінки
    if (data.future.length >= 3) {
        displayConcerts = data.future.slice(0, 5);
    } else {
        const neededFromPast = 3 - data.future.length;
        displayConcerts = [...data.future, ...data.past.slice(0, neededFromPast)];
        
        // Сортуємо результат хронологічно, як у вашому оригінальному коді
        const parseToDate = (dateStr: string) => {
            if (dateStr.includes('.')) {
                const [d, m, y] = dateStr.split('.');
                return new Date(`${y}-${m}-${d}`);
            }
            return new Date(dateStr);
        };
        displayConcerts.sort((a, b) => parseToDate(a.date).getTime() - parseToDate(b.date).getTime());
    }

    return {
        concerts: displayConcerts,
        hasMoreConcerts: data.future.length > displayConcerts.length // Прапорець для показу кнопки "Всі концерти"
    };
};

// export const load = (async () => {
//     return {};
// }) satisfies PageServerLoad;
