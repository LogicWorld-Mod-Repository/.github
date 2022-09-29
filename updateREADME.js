const fs = require("fs");
const repos = require("./repo-dict.json");

class Author {
	constructor(raw)
	{
		this.raw = raw;
		try
		{
			this.name = raw.name;
			this.link = raw.link;
		}
		catch (err)
		{
			console.error("Couldn't create author class", err);
		}
	}

	toMD()
	{
		return `[\`${this.name}\`](${this.link})`;
	}
}

class Mod {
	constructor(raw)
	{
		this.raw = raw;
		try
		{
			this.name = raw.name;
			this.desc = raw.description;
			this.link = raw.link;
			this.author = new Author(raw.author);
		}
		catch (err)
		{
			console.error("Couldn't create mod class", err);
		}
	}

	toMD()
	{
		return `* [\`${this.name}\`](${this.link}) by ${this.author.toMD()} &mdash; ${this.desc} `;
	}
}

fs.readFile("./preREADME.md", (err, data) => {
	if (err)
		return console.error("Couldn't read file", err);
	var rep = "";
	repos.sort((a, b) => {
		var i = 0;
		var j = (a.name.length > b.name.length ? b.name.length : a.name.length);
		while (i < j)
		{
			var k = a.name.toLowerCase().charCodeAt(i) - b.name.toLowerCase().charCodeAt(i);
			if (k != 0)
			{
				return k;
			}
			i++;
		}
		return 0;
	});
	for (var mod in repos)
	{
		mod = new Mod(repos[mod]);
		rep += `${mod.toMD()}\n`;
	}
	fs.writeFile("./profile/README.md", data.toString().replace("{{LIST}}", rep), (err) => {
		if (err)
			return console.error("Couldn't write file", err);
	});
});