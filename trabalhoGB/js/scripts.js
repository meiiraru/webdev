//card generator
//takes an ID to display together with the name 
function cardGenerator(id) {
    let card = document.createElement("div");
    card.className = "card";

    let cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    card.appendChild(cardHeader);

    let img = document.createElement("img");
    img.className = "avatar";
    img.setAttribute("src", "img/avatar.webp");
    img.setAttribute("alt", "Avatar");
    cardHeader.appendChild(img);

    let info = document.createElement("div");
    info.className = "info";
    cardHeader.appendChild(info);

    let name = document.createElement("h2");
    name.innerText = `${id} Nome Sobrenome`;
    info.appendChild(name);

    let title = document.createElement("p");
    title.innerText = "Desenvolvedor Fullstack.";
    info.appendChild(title);

    let cardFooter = document.createElement("div");
    cardFooter.className = "card-footer";
    card.appendChild(cardFooter);

    let followBtn = document.createElement("button");
    followBtn.innerText = "Seguir";
    cardFooter.appendChild(followBtn);

    let messageBtn = document.createElement("button");
    messageBtn.innerText = "Mensagem";
    cardFooter.appendChild(messageBtn);

    return card;
};

//grab the document elements
let cardsContainer = document.getElementById("cards-container");
let addBtn = document.getElementById("add-card");
let removeBtn = document.getElementById("remove-card");

let count = 0;

//add click event
//generates a new card and append to the cards container
addBtn.addEventListener("click", () => {
    let card = cardGenerator(++count);
    cardsContainer.appendChild(card);
});

//remove click event
//removes the last card from the cards container
//if theres no cards, replaces the page with the roadblock image
removeBtn.addEventListener("click", () => {
    let cards = cardsContainer.getElementsByClassName("card");
    let len = cards.length;

    if (len >= 1) {
        cardsContainer.removeChild(cards[len - 1]);
        count--;
        return;
    }

    document.querySelector(".main-container").classList.add("hidden");
    document.getElementById("roadblock").classList.remove("hidden");
});