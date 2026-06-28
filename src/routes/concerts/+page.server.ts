import { getConcerts } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    const data = await getConcerts();
    
    return {
        concerts: data.future
    };
};