var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    displayData(this);
  }
};
xhttp.open("GET", "./xml/menu.xml", true);
xhttp.send();

function displayData(xml) {
  var xmlDoc = xml.responseXML;
  var meals = xmlDoc
    .getElementsByTagName("meals")[0]
    .getElementsByTagName("menuItem");

  var hotBeverages = xmlDoc
    .getElementsByTagName("hotBeverages")[0]
    .getElementsByTagName("menuItem");

  var otherBeverages = xmlDoc
    .getElementsByTagName("otherBeverages")[0]
    .getElementsByTagName("menuItem");

  createMenu("#meals", meals);
  createMenu("#hotBeverages", hotBeverages);
  createMenu("#otherBeverages", otherBeverages);
}

function createMenu(containerName, menuLists) {
  for (var i = 0; i < menuLists.length; i++) {
    var name = menuLists[i].innerHTML.includes("name")
      ? menuLists[i].getElementsByTagName("name")[0].childNodes[0].nodeValue
      : "";

    var price = menuLists[i].innerHTML.includes("price")
      ? menuLists[i].getElementsByTagName("price")[0].childNodes[0].nodeValue
      : "";

    var description = menuLists[i].innerHTML.includes("description")
      ? menuLists[i].getElementsByTagName("description")[0].childNodes[0]
          .nodeValue
      : "";

    var imageURL = menuLists[i].innerHTML.includes("imageURL")
      ? menuLists[i].getElementsByTagName("imageURL")[0].childNodes[0].nodeValue
      : "";

    var size = menuLists[i].innerHTML.includes("size")
      ? menuLists[i].getElementsByTagName("size")[0].childNodes[0].nodeValue
      : "";

    createMenuCard(name, price, description, imageURL, size, containerName);
  }
}

function createMenuCard(
  name,
  price,
  description,
  imageURL,
  size,
  containerName
) {
  let div = document.querySelector(containerName);

  let colNode = createNodeWithAttribuites("div", {
    class: "col mb-1",
    style: "height:300;",
  });
  let cardNode = createNodeWithAttribuites("div", {
    class: "card",
  });

  let imgNode = createNodeWithAttribuites("img", {
    class: "card-img-top rounded mx-auto w-50 h-50",
    src: "images/menu/" + imageURL,
    alt: "image",
  });

  let cardBodyNode = createNodeWithAttribuites("div", {
    class: "card-body text-center",
  });

  let cardTitleNode = createNodeWithAttribuites("h5", { class: "card-title" });
  cardTitleNode.appendChild(document.createTextNode(name));

  let cardDescriptionNode = createNodeWithAttribuites("p", {
    class: "card-text",
  });
  cardDescriptionNode.appendChild(document.createTextNode(description));

  let cardPriceNode = createNodeWithAttribuites("p", { class: "card-text" });
  cardPriceNode.appendChild(document.createTextNode(price + "$"));

  let cardSizeNode = createNodeWithAttribuites("h5", { class: "card-title" });
  cardSizeNode.appendChild(document.createTextNode(size));

  cardBodyNode.appendChild(cardTitleNode);
  cardBodyNode.appendChild(cardSizeNode);
  cardBodyNode.appendChild(cardDescriptionNode);
  cardBodyNode.appendChild(cardPriceNode);

  cardNode.appendChild(imgNode);
  cardNode.appendChild(cardBodyNode);

  colNode.appendChild(cardNode);
  div.appendChild(colNode);
}

function createNodeWithAttribuites(element, attributes) {
  let node = document.createElement(element);

  for (att in attributes) {
    const thisAttribute = document.createAttribute(att);
    thisAttribute.value = attributes[att];
    node.setAttributeNode(thisAttribute);
  }

  return node;
}
