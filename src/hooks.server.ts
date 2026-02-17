// import type { Handle } from '@sveltejs/kit';
// import { paraglideMiddleware } from '$lib/paraglide/server';

// const handleParaglide: Handle = ({ event, resolve }) =>
// 	paraglideMiddleware(event.request, ({ request, locale }) => {
// 		event.request = request;

// 		return resolve(event, {
// 			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
// 		});
// 	});

// export const handle: Handle = handleParaglide;
import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/paraglide/server.js';
import { setLocale } from '$lib/paraglide/runtime.js';

export const handle: Handle = ({ event, resolve }) => {
	return paraglideMiddleware(event.request, ({ request, locale }) => {
		// Обов'язково встановлюємо мову для поточного запиту
		setLocale(locale);

		// @ts-ignore
		event.request = request;
		// @ts-ignore
		event.locals.locale = locale;

		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});
};
