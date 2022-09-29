const fs = require("fs");
const pages = require("./repo-list.json");
const https = require("https");

for (var page in pages)
{
	page = pages[page];

	try {
		var user = page.match(/[^/]+/g)[2];
		var repo = page.match(/[^/]+/g)[3];

		const req = https.request(`https://raw.githubusercontent.com/${user}/${repo}/master/mod-info.json`, res => {
			console.log(`statusCode: ${res.statusCode}`);
		
			res.on('data', d => {
				process.stdout.write(d);
			});
		});
		
		req.on('error', error => {
			console.error(error);
		});
		
		req.end();
	}
	catch (err)
	{
		console.log(err);
	}
}