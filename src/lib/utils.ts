export interface Concert {
	date: string;
	time: string;
	city: string;
	country: string;
	program: string;
	link: string;
}

let cachedConcerts: Concert[] | null = null;
let cachedConcertsTimestamp: number | null = null;
const CACHE_TTL = 10 * 60 * 1000;

export async function getConcerts(): Promise<Concert[]> {
    if (
        cachedConcerts &&
        cachedConcertsTimestamp &&
        Date.now() - cachedConcertsTimestamp < CACHE_TTL
    ) {
        return cachedConcerts;
    }

    const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqMDUj77vjDIR45hcIp_X_g3zW41sqidJz_B7LBey4hxEqOBoyBfYPvqNWxrTtOMxnOZV2dndppUrJ/pub?gid=0&single=true&output=csv';

    try {
        const response = await fetch(csvUrl);
        const csvText = await response.text();
        const allLines = csvText.split(/\r?\n/);

        const now = new Date();
        now.setHours(0, 0, 0, 0);

        const allParsedConcerts = allLines.slice(1).reduce((acc: Concert[], line) => {
            const columns = line
                .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
                .map((col) => col.replace(/^"|"$/g, '').trim());

            if (columns.length < 5 || !columns[0] || columns[0].toLowerCase().includes('date')) {
                return acc;
            }

            acc.push({
                date: columns[0],
                time: columns[1] || '',
                city: columns[2] || '',
                country: columns[3] || '',
                program: columns[4] || '',
                link: columns[5] || ''
            });
            return acc;
        }, []);

        // Функция для корректного сравнения дат (поддержка DD.MM.YYYY)
        const parseToDate = (dateStr: string) => {
            if (dateStr.includes('.')) {
                const [d, m, y] = dateStr.split('.');
                return new Date(`${y}-${m}-${d}`);
            }
            return new Date(dateStr);
        };

        // Разделяем на будущие и прошедшие
        const futureConcerts = allParsedConcerts
            .filter(c => parseToDate(c.date) >= now)
            .sort((a, b) => parseToDate(a.date).getTime() - parseToDate(b.date).getTime());

        const pastConcerts = allParsedConcerts
            .filter(c => parseToDate(c.date) < now)
            // Прошедшие сортируем от самых новых к старым
            .sort((a, b) => parseToDate(b.date).getTime() - parseToDate(a.date).getTime());

        let result: Concert[] = [];

        if (futureConcerts.length >= 3) {
            // Если будущих достаточно, берем первые 5 (как в оригинале)
            result = futureConcerts.slice(0, 5);
        } else {
            // Если будущих мало (меньше 3), берем все будущие и дополняем из прошедших до 3 штук
            const neededFromPast = 3 - futureConcerts.length;
            result = [...futureConcerts, ...pastConcerts.slice(0, neededFromPast)];
            
            // Финальная сортировка результата, чтобы прошедшие были сверху (по хронологии)
            result.sort((a, b) => parseToDate(a.date).getTime() - parseToDate(b.date).getTime());
        }

        cachedConcerts = result;
        cachedConcertsTimestamp = Date.now();

        return result;
    } catch (e) {
        console.error('Error loading CSV:', e);
        return [];
    }
}