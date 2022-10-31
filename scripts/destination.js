class Package {
	constructor(jsonData) {
		this.package = document.createElement('div');
		this.package.setAttribute('class', 'package');

		this.addImage(jsonData["image"]);
		this.addInfo(jsonData["info"]);
	}

	addImage = function(imgData) {
		let img = document.createElement('img');
		img.setAttribute("src", imgData["src"]);
		img.setAttribute("alt", imgData["alt"]);
		this.package.append(img);
	}

	addInfo = function (packageInfo) {
		let div = document.createElement('div');
		div.setAttribute('class', 'info');
		this.package.append(div);

		// Title of Package
		let title = document.createElement('h3');
		title.textContent = packageInfo["title"];
		div.append(title);

		// Location
		let loc = document.createElement('p');
		loc.textContent = packageInfo["location"];
		div.append(loc);

		// Rating
		let ratings = document.createElement('div');
		for (let i=0; i<parseInt(packageInfo["rating"]["checked-stars"]); i++) {
			let span = document.createElement('span');
			span.className = packageInfo["rating"]["checked-star-class"];
			ratings.append(span);
		}
		for (let i=0; i<parseInt(packageInfo["rating"]["unchecked-stars"]); i++) {
			let span = document.createElement('span');
			span.className = packageInfo["rating"]["unchecked-star-class"];
			ratings.append(span);
		}
		ratings.append(`  ${packageInfo["rating"]["checked-stars"]}.0`)
		div.append(ratings);

		// Route
		let route = document.createElement('div');
		route.textContent = packageInfo["route"]
		route.className = "route";
		div.append(route);

		// Price
		let priceDiv = document.createElement('div');
		priceDiv.className = "price";
		div.append(priceDiv);

		//  old price
		let op = document.createElement('span');
		op.className = "old-price";
		op.textContent = packageInfo["old-price"];
		priceDiv.append(op);

		//  new price
		let np = document.createElement('span');
		np.className = "new-price";
		np.textContent = packageInfo["new-price"];
		priceDiv.append(np);

		// view deal button
		let button = document.createElement('button');
		button.setAttribute('onclick', `window.location.href=${packageInfo["details-page"]}`);
		button.setAttribute('class', "red-button");
		button.textContent = "View Deal";
		priceDiv.append(button);
	}

	getPackage = function() {
		return this.package;
	}
}

class SearchBar {
	constructor(jsonObj) {
		this.searchBar = document.querySelector("#searchbar");
		this.jsonObj = jsonObj;
	}

	makeDateForm = function(data) {
		let div = document.createElement("div");
		div.setAttribute("class", "date");

		let label = document.createElement("label");
		label.setAttribute("for", data["label"]["for"]);
		label.textContent = data["label"]["text"];

		let inp = document.createElement("input");
		inp.setAttribute("type", data["input"]["type"]);
		inp.setAttribute("name", data["input"]["name"]);
		div.append(label);
		div.append(inp);

		return div;
	}

	makeDropdown = function(data) {
		let select = document.createElement('select');
		select.setAttribute('name', data["name"]);

		for (let options of data["options"]) {
			let opt = document.createElement('option');
			opt.setAttribute("value", options);
			opt.textContent = options;
			select.append(opt);
		}
		return select;
	}

	loadSearchBar = function () {
		// what is your destination?
		let span = document.createElement("span");
		span.textContent = this.jsonObj["sp1"];
		this.searchBar.append(span);

		// form
		let sb = document.createElement("div");
		sb.className = "sb";
		this.searchBar.append(sb);

		// dropdowns (City and State)
		for (let dropdown of this.jsonObj["dropdown"]) {
			sb.append(this.makeDropdown(dropdown));
		}

		// to and from date
		for (let date of this.jsonObj["date-forms"]) {
			sb.append(this.makeDateForm(date));
		}

		// button
		let btn = document.createElement("button");
		btn.setAttribute("class", this.jsonObj["button"]["class"]);
		btn.textContent = this.jsonObj["button"]["text"];
		this.searchBar.append(btn);
	}
}

async function loadDestinationPageContent() {
	let request = new Request("json/destination.json");
	let response = await fetch(request);

	let jsonObj = await response.json();

	let sb = new SearchBar(jsonObj["SearchBar"]);
	sb.loadSearchBar();
	loadPackages(jsonObj["Packages"]);
}

function loadPackages(jsonObj) {
	let packagesDiv = document.querySelector("#packages");
	for (let packageData of jsonObj) {
		let package = new Package(packageData);
		console.log(packageData);
		console.log(package.getPackage());
		packagesDiv.append(package.getPackage());
	}
}

loadDestinationPageContent();
