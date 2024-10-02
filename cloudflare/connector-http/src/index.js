/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const commands = require("./commands");
 
export default {
	async fetch(request, env, ctx) {
		const { pathname, searchParams } = new URL(request.url);

		console.log(pathname);
		console.log(searchParams);
		console.log(request.method);
		console.log(request.body);

		if (pathname === "/v1/commands") {
			return new Response(JSON.stringify(commands), {
				headers: {
					"Content-Type": "application/json"
				}
			});
		}

		return new Response("Welcome to the http connector");
	},
};
