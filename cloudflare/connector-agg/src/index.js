/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const connectors = [
	"https://connector-http.jon-herron.workers.dev",
	"https://connector-rand.jon-herron.workers.dev"
];

var commands = null;

export default {
	async fetch(request, env, ctx) {
		const { pathname, searchParams } = new URL(request.url);

		if (pathname === "/v1/commands") {
			if (commands === null) {
				await fetchCommands();
			}

			return new Response(JSON.stringify(commands), {
				headers: {
					"Content-Type": "application/json",
				}
			});
		}
		
		return new Response("Welcome to the connector aggregator");
	},
};

//
// https://stackoverflow.com/questions/33438158/best-way-to-call-an-asynchronous-function-within-map
//
let amap = async (arr,fun) => await Promise.all(arr.map(async v => await fun(v)))

async function fetchCommands() {
	console.log("Fetching commands...");

	const connector_commands = await amap(connectors, fetchConnectorCommands);
	commands = connector_commands.flat();
}

async function fetchConnectorCommands(connector) {
	const response = await fetch(`${connector}/v1/commands`);
	return await response.json();
}
