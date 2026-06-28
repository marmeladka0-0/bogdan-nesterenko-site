import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
    // params.slug буде містити 'trio-svita', 'pan-bayan' тощо
    return {
        slug: params.slug
    };
};