import { getConcerts } from '$lib/utils';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		concerts: await getConcerts()
	};
};

// export const load = (async () => {
//     return {};
// }) satisfies PageServerLoad;
