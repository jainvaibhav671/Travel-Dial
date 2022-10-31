
async function navbar() {
  let request = new Request("json/nav.json");
  let res = await fetch(request);

  let jsonObj = await res.json();
  loadHeader(jsonObj["header"]);
  loadFooter(jsonObj["footer"]);
}

function loadLogo(jsonObj, elem) {
  let logo = document.createElement("img");
  logo.setAttribute("src", jsonObj["logo"]["src"]);
  logo.setAttribute("alt", jsonObj["logo"]["alt"]);
  logo.setAttribute("onclick", "window.location.href=\"index.html\"")
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

function loadHeader(jsonObj) {
  let header = document.querySelector(".header");
  loadLogo(jsonObj, header);
  loadLinks(jsonObj, header);
}

function loadFooter(jsonObj) {
  let footer = document.querySelector(".footer");
  loadLogo(jsonObj, footer);
  loadLinks(jsonObj, footer);
}

navbar();
