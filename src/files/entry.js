// @ts-expect-error will be resolve by https://github.com/sveltejs/kit/pull/2285
import * as App from '../output/server/app.js';
import {toSvelteKitRequest} from './firebase-to-svelte-kit.js';

/** @type {import('@sveltejs/kit').App} */
const app = App;

app.init();

/**
 * Firebase Cloud Function handler for SvelteKit
 *
 * This function converts the Firebase Cloud Function (Express.js) Request object
 * into a format consumable to the SvelteKit render() function
 *
 * Relevant documentation - https://firebase.google.com/docs/functions/http-events#read_values_from_the_request
 *
 * @param {import('firebase-functions').https.Request} request
 * @param {import('express').Response} response
 * @returns {Promise<void>}
 */
export default async function svelteKit(request, response) {
	const rendered = await app.render(toSvelteKitRequest(request));

	return rendered
		? response.writeHead(rendered.status, rendered.headers).end(rendered.body)
		: response.writeHead(404, 'Not Found').end();
}