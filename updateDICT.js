const fs = require("fs");
var pages = require("./repo-list.json");
const https = require("https");

pages = [
	"https://github.com/LogicWorld-Mod-Repository/.github"
];

for (var page in pages)
{
	page = pages[page];

	try {
		var user = page.match(/[^/]+/g)[2];
		var repo = page.match(/[^/]+/g)[3];

		const req = https.request(`https://raw.githubusercontent.com/${user}/${repo}/master/mod-info.json`, res => {
			if {res.statusCode == 200)
			{
				var dat = "";
				
				res.on('data', d => {
					dat += d;
				});
				res.on('end', () => {
					console.log(dat);
				})
			}
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