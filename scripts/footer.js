function loadLogo(jsonObj, elem) {
  let logo = document.createElement("img");
  logo.setAttribute("src", jsonObj["logo"]["src"]);
  logo.setAttribute("alt", jsonObj["logo"]["alt"]);
  elem.append(logo);
}

function loadLinks(jsonObj, elem) {
  let div = document.createElement("div");
  let links = document.createElement("ul");

  elem.append(div);
  div.append(links);

  for (let link of jsonObj["links"]) {
    let li = document.createElement("li");
    let a = document.createElement("a");

    a.textContent = link["text"];
    a.href = link["href"];

    li.append(a);
    links.append(li);
  }
}

function loadFooter() {
  let request = new Request("json/footer.json");
  let response = await fetch(request);

  let jsonObj = await response.json();
  loadLogo(jsonObj);
  loadLinks(jsonObj);
}

loadHeader()
