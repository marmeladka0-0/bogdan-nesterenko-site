import { parse } from 'csv-parse/sync';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
    // 1. Встав сюди своє посилання на CSV з Google Таблиць
    const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTLAH697pn2BhaHKnXq81X7TkR8hrn6mrs5BsL5AEPum9S4Q-93YKD-iDBz9FNcW4kPalvalzMHQRJS/pub?gid=0&single=true&output=csv"; 

    try {
        const response = await fetch(SHEET_URL);
        const csvText = await response.text();
        
        // 2. Перетворюємо текст таблиці у зрозумілий масив
        const records = parse(csvText, {
            columns: true,
            skip_empty_lines: true
        });

        // Повертаємо дані сторінці
        return {
            profile: records[0] // Беремо перший рядок (основна інфа про Богдана)
        };
    } catch (e) {
        console.error("Помилка завантаження:", e);
        return {
            profile: { name: "Богдан Нестеренко", headline: "Академічний баян" }
        };
    }
};