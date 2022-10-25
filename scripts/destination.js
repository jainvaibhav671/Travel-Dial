class Package {
	constructor(jsonData) {
		this.package = document.createElement('div');
		this.package.className = "package";
		this.jsonObj = jsonData;

		addImage(jsonData["image"]);
		addInfo(jsonData["info"]);
	}

	addImage = function(imgData) {
		let img = document.createElement('img');
		img.src = imgData["src"];
		img.alt = imgData["alt"];
		this.package.append(img);
	}

	addInfo = function (packageInfo) {
		let div = document.createElement('div');
		div.className = "info";

		// Title of Package
		div.append(document.createElement('h3').textContent = packageInfo["title"]);

		// Location
		div.append(document.createElement('p').textContent = packageInfo["location"]);

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
		div.append(button);
	}

	getPackage = function() {
		return this.package;
	}
}

async function loadDestinationPageContent() {
	let request = new Request("json/Destination.json");
	let response = await fetch(request);

	let jsonObj = await response.json();

	loadPackages(jsonObj);
}

function loadPackages(jsonObj) {
	let packagesDiv = document.createElement('div');
	packagesDiv.setAttribute('id', "packages");
	for (let packageData in jsonObj["packages"]) {
		let package = new Package(packageData);
		packagesDiv.append(package.getPackage());
	}
	let main = document.querySelector('.main');
	main.append(packagesDiv);
}

loadDestinationPageContent();
