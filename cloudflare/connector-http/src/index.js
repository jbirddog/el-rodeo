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

		if (pathname === "/v1/commands") {
			return new Response(JSON.stringify(commands), {
				headers: {
					"Content-Type": "application/json"
				}
			});
		}

		if (request.method === "POST" && pathname === "/v1/do/http/GetRequestV2") {
			const params = await request.json();			
			const command_response = await commandResponseForUrl(params.url,
				params.headers,
				params.attempts);
			
			const response = {
				command_response,
				error: null,
				command_response_version: 2,
				spiff__logs: []
			};
			
			return new Response(JSON.stringify(response), {
				headers: {
					"Content-Type": "application/json"
				}
			});
		}

		return new Response("Welcome to the http connector");
	},
};

async function commandResponseForUrl(url, reqHeaders, attempts) {
	const response = await fetch(url, reqHeaders);
	const { headers, status } = response;
	const contentType = headers.get("content-type") || "application/json";

	if (contentType.includes("application/json")) {
		const body = await response.json();
		return {
			body,
			mimetype: "application/json",
			http_status: status
		};
	}
	
	const body = { "raw_response": response.text() };
	return {
		body,
		mimetype: "application/json",
		http_status: status
	};
}
