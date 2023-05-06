var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    displayData(this);
  }
};
xhttp.open("GET", "./xml/branches.xml", true);
xhttp.send();

function displayData(xml) {
  var xmlDoc = xml.responseXML;
  var item = xmlDoc.getElementsByTagName("branch");

  for (var i = 0; i < item.length; i++) {
    var address =
      item[i].getElementsByTagName("address")[0].childNodes[0].nodeValue;
    var contact =
      item[i].getElementsByTagName("contact")[0].childNodes[0].nodeValue;
    var hour = item[i].getElementsByTagName("hours")[0].childNodes[0].nodeValue;
    var mapLink =
      item[i].getElementsByTagName("mapsLink")[0].childNodes[0].nodeValue;

    createBranceCard(address, contact, mapLink, hour);
  }
}

function createBranceCard(address, contact, mapLink, hour) {
  let div = document.querySelector("#branches");

  let colNode = createNodeWithAttribuites("div", {
    class: "col-sm",
  });
  let cardNode = createNodeWithAttribuites("div", {
    class: "card mb-4",
  });

  let mapNode = createNodeWithAttribuites("iframe", {
    class: "card-img-top rounded mx-auto d-block",
    src: mapLink,
  });

  let cardBodyNode = createNodeWithAttribuites("div", {
    class: "card-body text-center",
  });
  let cardTitleNode = createNodeWithAttribuites("h5", { class: "card-title" });
  cardTitleNode.appendChild(document.createTextNode(address));
  let cardContactNode = createNodeWithAttribuites("p", { class: "card-text" });
  cardContactNode.appendChild(document.createTextNode(contact));
  let cardHourNode = createNodeWithAttribuites("p", { class: "card-text" });
  cardHourNode.appendChild(document.createTextNode(hour));

  cardBodyNode.appendChild(cardTitleNode);
  cardBodyNode.appendChild(cardContactNode);
  cardBodyNode.appendChild(cardHourNode);

  cardNode.appendChild(mapNode);
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
