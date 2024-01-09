window.onload = init();
var buttonCategories, tags, cards;
function init() {
  tags = document.querySelector(".tags");
  cards = document.querySelector(".cards");
  createTags();
  displayTags();
  displayAll();
  filter("All");
}

function createTags() {
  buttonCategories = [];

  for (var i of products.data) {
    var isunique = 1;
    for (var j = 0; j < buttonCategories.length; j++) {
      if (buttonCategories[j] === i.category) {
        isunique = 0;
      }
    }
    if (isunique) {
      buttonCategories.push(i.category);
    }
  }
}

function displayTags() {
  for (var i = 0; i < buttonCategories.length; i++) {
    var button = document.createElement("button");
    button.classList.add("tagButtons", buttonCategories);
    button.innerText = buttonCategories[i];
    button.onclick = function () {
      filter(this.innerText);
    };
    tags.appendChild(button);
  }
}

function displayAll() {
  for (var i of products.data) {
    var card = document.createElement("div");
    card.classList.add("card", i.category, "hide");

    var imageContainer = document.createElement("div");
    imageContainer.classList.add("imageContainer");
    var image = document.createElement("img");
    image.classList.add("img");
    image.setAttribute("src", i.images[0]);
    imageContainer.appendChild(image);
    card.appendChild(imageContainer);
    var contentContainer = document.createElement("div");
    contentContainer.classList.add("contentContainer");
    var name = document.createElement("p");
    name.innerText = i.title;
    name.classList.add("name");
    contentContainer.appendChild(name);

    var description = document.createElement("p");
    description.innerText = i.description;
    description.classList.add("description");
    contentContainer.appendChild(description);
    card.appendChild(contentContainer);

    cards.appendChild(card);
  }
}

function filter(value) {
  var allCards = document.querySelectorAll(".card");
  allCards.forEach((element) => {
    if (value === "All") {
      element.classList.remove("hide");
    } else {
      if (element.classList.contains(value)) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    }
  });
  tags = document.querySelectorAll(".tagButtons");

  tags.forEach((element) => {
    if (element.innerText === value) {
      element.classList.add("active");
    } else {
      element.classList.remove("active");
    }
  });
}

function searchQuery() {
  var names = document.querySelectorAll(".name");
  var searchInput = document.querySelector("#searchInput").value;
  if (searchInput === "") {
    alert("Field is Empty !!!");
  } else {
    names.forEach((element) => {
      if (element.innerText.toUpperCase().includes(searchInput.toUpperCase())) {
        element.parentElement.parentElement.classList.remove("hide");
      } else {
        element.parentElement.parentElement.classList.add("hide");
      }
    });
  }
  document.querySelector("#searchInput").value='';
}
