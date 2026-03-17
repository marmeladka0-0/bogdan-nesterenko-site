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

	const csvUrl =
		'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqMDUj77vjDIR45hcIp_X_g3zW41sqidJz_B7LBey4hxEqOBoyBfYPvqNWxrTtOMxnOZV2dndppUrJ/pub?gid=0&single=true&output=csv';

	try {
		const response = await fetch(csvUrl);
		const csvText = await response.text();
		const allLines = csvText.split(/\r?\n/);

		const now = new Date();
		now.setHours(0, 0, 0, 0); // Початок сьогоднішнього дня

		const concerts = allLines.slice(1).reduce((acc: Concert[], line) => {
			const columns = line
				.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
				.map((col) => col.replace(/^"|"$/g, '').trim());

			if (columns.length < 5 || !columns[0] || columns[0].toLowerCase().includes('date')) {
				return acc;
			}

			// Розумний парсинг дати (підтримка DD.MM.YYYY)
			let dateStr = columns[0];
			if (dateStr.includes('.')) {
				const [d, m, y] = dateStr.split('.');
				dateStr = `${y}-${m}-${d}`;
			}
			const concertDate = new Date(dateStr);

			// ДОДАЄМО ПЕРЕВІРКУ: тільки сьогоднішні та майбутні
			if (isNaN(concertDate.getTime()) || concertDate < now) {
				return acc;
			}

			acc.push({
				date: columns[0], // зберігаємо оригінальний формат для виводу
				time: columns[1] || '',
				city: columns[2] || '',
				country: columns[3] || '',
				program: columns[4] || '',
				link: columns[5] || ''
			});

			return acc;
		}, []);

		// 1. Сортуємо від найближчих
		concerts.sort((a, b) => {
			const dateA = a.date.includes('.') ? a.date.split('.').reverse().join('-') : a.date;
			const dateB = b.date.includes('.') ? b.date.split('.').reverse().join('-') : b.date;
			return new Date(dateA).getTime() - new Date(dateB).getTime();
		});

		// 2. БЕРЕМО ПЕРШІ 5
		const limitedConcerts = concerts.slice(0, 5);

		cachedConcerts = limitedConcerts;
		cachedConcertsTimestamp = Date.now();

		return limitedConcerts;
	} catch (e) {
		console.error('Error loading CSV:', e);
		return [];
	}
}
