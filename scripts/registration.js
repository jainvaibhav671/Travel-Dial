class RegistrationPage {
	constructor() {
		this.main = document.querySelector('.main');
	}
	loadForm = function (jsonObj) {
		let form = document.createElement('div');
		form.className = "form";
		this.main.append(form);

		// row 1
		let div1 = document.createElement('div');
		div1.className = jsonObj["div1"]["class"];
		for (let input of jsonObj["div1"]["inputs"]) {
			let inp = document.createElement('input');
			inp.setAttribute('type', input["type"]);
			inp.setAttribute('placeholder', input["placeholder"]);
			div1.append(inp);
		}
		form.append(div1);

		let div2 = document.createElement('div');
		div2.className = jsonObj["div2"]["class"];
		for (let input of jsonObj["div2"]["inputs"]) {
			let inp = document.createElement('input');
			inp.setAttribute('type', input["type"]);
			inp.setAttribute('placeholder', input["placeholder"]);
			div2.append(inp);
		}
		form.append(div2);

		let div3 = document.createElement('div');
		div3.className = jsonObj["div3"]["class"];
		for (let input of jsonObj["div3"]["inputs"]) {
			let inp = document.createElement('input');
			inp.setAttribute('type', input["type"]);
			inp.setAttribute('placeholder', input["placeholder"]);
			div3.append(inp);
		}
		form.append(div3);

		let itenaries = document.createElement('div');
		itenaries.className = jsonObj["itenaries"]["class"];
		let span = document.createElement('span');
		span.textContent = jsonObj["itenaries"]["span"];
		let ul = document.createElement('ul');
		for (let day of jsonObj["itenaries"]["days"]) {
			let li = document.createElement('li');
			li.textContent = day;
			ul.append(li);
		}
		let btn = document.createElement('button');
		btn.className = jsonObj["itenaries"]["button"]["class"];
		btn.textContent = jsonObj["itenaries"]["button"]["text"];
		ul.append(btn);

		itenaries.append(span);
		itenaries.append(ul);
		form.append(itenaries);
	}

	loadAmenities = function (jsonObj) {
		let amenities = document.createElement('div');
		amenities.className = "amenities";
		this.main.append(amenities);

		let h2 = document.createElement('h2');
		h2.textContent = jsonObj["h2"];
		amenities.append(h2);

		let items = document.createElement('div');
		items.className = "items";

		for (let item of jsonObj["items"]) {
			if (item.length === 0) {
				items.append(document.createElement('div'));
				continue;
			}
			let am = document.createElement('amenity');
			let inp = document.createElement('input');
			let label = document.createElement('label');
			inp.setAttribute('type', "checkbox");
			inp.setAttribute('value', item);
			label.textContent = item;
			am.append(inp);
			am.append(label);
			items.append(am);
		}
		amenities.append(items);

		let div = document.createElement('div');
		let btn = document.createElement('button');
		div.className = jsonObj["button"]["class"];
		btn.textContent = jsonObj["button"]["text"];
		div.append(btn);
		amenities.append(div);
	}

	loadMain = function (jsonObj) {
		// add photo
		let img = document.createElement('img');
		this.main.append(img);
		img.setAttribute('src', jsonObj["image"]["src"]);
		img.setAttribute('alt', jsonObj["image"]["alt"]);

		// Form
		console.log(jsonObj);
		this.loadForm(jsonObj["form"]);
		this.loadAmenities(jsonObj["amenities"]);
	}
}


async function loadRegistrationPage() {
	let req = new Request("json/registration.json");
	let res = await fetch(req);
	jsonObj = await res.json();

	let rp = new RegistrationPage();
	rp.loadMain(jsonObj);
}

loadRegistrationPage();