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
		button.textContent = "View Deal";
		priceDiv.append(button);
	}

	getPackage = function() {
		return this.package;
	}
}

async function loadDestinationPageContent() {
	let request = new Request("json/destination.json");
	let response = await fetch(request);

	let jsonObj = await response.json();

	loadPackages(jsonObj);
}

function loadPackages(jsonObj) {
	let packagesDiv = document.querySelector("#packages");
	for (let packageData of jsonObj["packages"]) {
		let package = new Package(packageData);
		console.log(packageData);
		console.log(package.getPackage());
		packagesDiv.append(package.getPackage());
	}
}

loadDestinationPageContent();
