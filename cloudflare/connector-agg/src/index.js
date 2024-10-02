/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const connector_http = "https://connector-http.jon-herron.workers.dev";
const connector_rand = "https://connector-rand.jon-herron.workers.dev";

const connectors = [
	connector_http,
	connector_rand
];

var commands = null;

//
// https://stackoverflow.com/questions/33438158/best-way-to-call-an-asynchronous-function-within-map
//
let amap = async (arr,fun) => await Promise.all(arr.map(async v => await fun(v)))

export default {
	async fetch(request, env, ctx) {
		const { pathname, searchParams } = new URL(request.url);

		if (pathname === "/v1/commands") {
			if (commands === null) {
				await fetchCommands(request, env);
			}

			return new Response(JSON.stringify(commands), {
				headers: {
					"Content-Type": "application/json",
				}
			});
		}

		if (request.method === "POST" && pathname === "/v1/do/http/GetRequestV2") {
			return await env.CONN_HTTP.fetch(`${connectors[0]}${pathname}`, request);
		}
		
		if (request.method === "POST" && pathname === "/v1/do/rand/Number") {
			return await env.CONN_RAND.fetch(`${connectors[1]}${pathname}`, request);
		}
		
		return new Response("Welcome to the connector aggregator");
	},
};

async function fetchCommands(request, env) {
	const connector_commands = await amap(connectors, async (connector) => {
		var response;

		switch (connector) {
		case connector_http:
			response = await env.CONN_HTTP.fetch(request);
			break;
		case connector_rand:
			response = await env.CONN_RAND.fetch(request);
			break;
		default:
			response = await fetch(`${connector}/v1/commands`);
		}
	
		return await response.json();
	});
	
	commands = connector_commands.flat();
}
