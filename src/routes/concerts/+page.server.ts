// src/routes/concerts/+page.server.ts
import { getConcerts } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const data = await getConcerts();
    
    // Повертаємо ВСІ майбутні концерти на цю сторінку
    return {
        concerts: data.future
    };
};