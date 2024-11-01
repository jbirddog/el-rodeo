const commands = [
	{
		"id": "http/GetRequestV2",
		"parameters": [
			{"id": "url", "type": "str", "required": true},
			{"id": "headers", "type": "any", "required": false},
			{"id": "params", "type": "any", "required": false},
			{"id": "basic_auth_username", "type": "str", "required": false},
			{"id": "basic_auth_password", "type": "str", "required": false},
			{"id": "attempts", "type": "int", "required": false}
		]
	}
];

module.exports = commands;
