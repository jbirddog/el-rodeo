import json
import random

from js import Response
from urllib.parse import urlparse

commands = [
	{
		"id": "rand/Number",
		"parameters": [
			{"id": "max", "type": "int", "required": True},
		]
	}

]

async def on_fetch(request, env):
    url = urlparse(request.url)
    print(url.path)
    print(request.method)

    if url.path == "/v1/commands":
        response = Response.new(json.dumps(commands))
        response.headers["Content-Type"] = "application/json"
        return response

    if request.method == "POST" and url.path == "/v1/do/rand/Number":
        params = await request.json()
        num = random.randint(1, params.max)
        response_payload = {
            "command_response": {
                "body": { "number": num },
                "mimetype": "application/json",
                "http_status": 200,
            },
            "error": None,
            "command_response_version": 2,
            "spiff__logs": [],
        }
        response = Response.new(json.dumps(response_payload))
        response.headers["Content-Type"] = "application/json"
        return response
    
    return Response.new("Welcome to the rand connector")
