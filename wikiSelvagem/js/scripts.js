const WIKI_API_URL = "https://api.api-ninjas.com/v1/animals?";

/**
 * DOM elements
 */
const modalOverlay = document.getElementById("modal-overlay");
const apikeyForm   = document.getElementById("api-key-form");
const apiField     = document.getElementById("api-key-input");
const apiBtn       = document.getElementById("api-key-btn");
const apiModal     = document.getElementById("api-key-modal");
const searchForm   = document.getElementById("search-form");
const searchField  = document.getElementById("search-input");
const msgModal     = document.getElementById("message-modal");
const msgContent   = document.getElementById("message-content");
const statusCont   = document.getElementById("status-container");
const statusMsg    = document.getElementById("status-message");
const loader       = document.getElementById("loader");
const resultsCont  = document.getElementById("results-container");
const favList      = document.getElementById("favorites-list");
const animalsModal = document.getElementById("animals-modal");

/**
 * variables
 */
let apiKey = "";
let animals = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let activeModals = [];

/**
 * API key management
 */
apikeyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    apiKey = apiField.value.trim();
    closeModal();
});

apiField.addEventListener("input", () => {
    apiKey = apiField.value.trim();
});

apiBtn.addEventListener("click", () => {
    openModal(apiModal);
});

/**
 * modal management
 */
modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay)
        closeModal();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape")
        closeModal();
});

function openModal(...modals) {
    modalOverlay.hidden = false;
    for (const modal of modals) {
        modal.hidden = false;
        activeModals.push(modal);
    }
}
function closeModal() {
    modalOverlay.hidden = true;
    while (activeModals.length > 0) {
        const modal = activeModals.pop();
        modal.hidden = true;
    }
}

function modalMessage(message, ...extraModals) {
    msgContent.textContent = message;
    openModal(msgModal, ...extraModals);
}

/**
 * search handling
 */
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (apiKey === "") {
        modalMessage("Por favor, insira sua chave de API para realizar a pesquisa", apiModal);
        return;
    }

    const query = searchField.value.trim();
    if (query === "") {
        modalMessage("Insira o nome de um animal para pesquisar");
        return;
    }

    searchField.value = "";
    getAnimal(query);
});

/**
 * API request and response handling
 */
async function getAnimal(name) {
    try {
        //clear previous results
        clearResults();

        //show loading state
        loader.hidden = false;

        //make API request
        const response = await fetch(
            `${WIKI_API_URL}name=${encodeURIComponent(name)}`,
            {
                method: "GET",
                headers: {"X-Api-Key": apiKey}
            }
        );

        if (!response.ok)
            throw new Error(`HTTP ${response.status}`);

        //get the data and fill the content
        const data = await response.json();
        fillContent(data);
    } catch(error) {
        console.error("Error fetching animal data:", error);
        clearResults();
        showMessage("Ocorreu um erro ao buscar os dados do animal... Verifique sua conexão e/ou chave de API");
    }
}

/**
 * UI results population and management
 */
function showMessage(message) {
    statusMsg.textContent = message;
    statusCont.hidden = false;
}

function hideMessage() {
    statusCont.hidden = true;
}

function clearResults() {
    animals = [];
    resultsCont.innerHTML = "";
    loader.hidden = true;
    hideMessage();
}

function fillContent(data) {
    clearResults();

    animals = data;
    if (animals.length === 0) {
        showMessage("Nenhum animal encontrado...");
        return;
    }

    //load the plain animals data
    for (const animal of animals) {
        const card = createAnimalCard(animal);
        resultsCont.appendChild(card);
    }
}

function createAnimalCard(animal) {
    const card = document.createElement("div");
    card.classList.add("animal-card");

    //basic animal data
    card.innerHTML = `
        <p class="card-name">${animal.name}</p>
        <p class="card-sci-name">${animal.taxonomy.scientific_name ? `${animal.taxonomy.scientific_name}` : ""}</p>
        ${animal.characteristics.habitat ?
            `
                <div class="divider"></div>
                <p class="card-section-title">Habitat</p>
                <p class="card-section-info">${animal.characteristics.habitat}</p>
            `
            : ""}
        ${animal.characteristics.diet ?
            `
                <div class="divider"></div>
                <p class="card-section-title">Diet</p>
                <p class="card-section-info">${animal.characteristics.diet}</p>
            `
            : ""}
        ${animal.characteristics.conservation_status ?
            `
                <div class="divider"></div>
                <p class="card-section-title">Conservation Status</p>
                <p class="card-section-info">${animal.characteristics.conservation_status}</p>
            `
            : ""}
    `;

    //favorite button
    card.appendChild(createFavButton(animal));

    //modal event
    card.addEventListener("click", () => {
        createAndOpenAnimalModal(animal);
    });

    return card;
}

function createFavButton(animal) {
    //div for the favorite button
    const div = document.createElement("div");
    div.classList.add("fav-btn-container");
    div.classList.add("tooltip");

    //base state of the button
    const isFav = favorites.some(fav => fav.name === animal.name);
    const button = document.createElement("button");
    button.classList.add("fav-btn");
    button.classList.add("icon-btn");
    button.innerHTML = `<img src="./img/${isFav ? "star_filled.png" : "star.png"}" alt="Ícone de favorito">`

    if (isFav)
        button.classList.add("favorited");

    div.appendChild(button);

    //create tooltip
    const tooltip = document.createElement("span");
    tooltip.classList.add("tooltip-text");
    tooltip.classList.add("tooltip-left");
    div.appendChild(tooltip);

    const removeStr = "Remover dos favoritos";
    const addStr    = "Adicionar aos favoritos";
    tooltip.textContent = isFav ? removeStr : addStr;

    //favorite toggle event
    button.addEventListener("click", (event) => {
        event.stopPropagation();

        const index = favorites.findIndex(fav => fav.name === animal.name);
        if (index >= 0) {
            //remove from favorites
            favorites.splice(index, 1);
            button.classList.remove("favorited");
            button.innerHTML = `<img src="./img/star.png" alt="Ícone de favorito">`;
            tooltip.textContent = addStr;
        } else {
            //add to favorites
            favorites.push(animal);
            button.classList.add("favorited");
            button.innerHTML = `<img src="./img/star_filled.png" alt="Ícone de favorito">`;
            tooltip.textContent = removeStr;
        }

        //update animals array
        fillContent(animals);

        //save favorites to localStorage and update the favorites section
        //favorites.sort((a, b) => a.name.localeCompare(b.name));
        localStorage.setItem("favorites", JSON.stringify(favorites));
        loadFavorites();
    });

    return div;
}

function createAndOpenAnimalModal(animal) {
    //clear previous content
    animalsModal.innerHTML = "";

    //create the root div for the modal content
    const div = document.createElement("div");
    div.classList.add("animal-modal-container");

    //names
    const nameDiv = document.createElement("div");
    nameDiv.classList.add("modal-animal-name-container");
    div.appendChild(nameDiv);

    const name = document.createElement("p");
    name.classList.add("modal-animal-name");
    name.textContent = animal.name;
    nameDiv.appendChild(name);

    if (animal.taxonomy.scientific_name) {
        const sciName = document.createElement("p");
        sciName.classList.add("modal-animal-sci-name");
        sciName.textContent = `(${animal.taxonomy.scientific_name})`;
        nameDiv.appendChild(sciName);
    }

    //populate the modal with all the animal data
    const dataDiv = document.createElement("div");
    dataDiv.classList.add("modal-data-container");
    div.appendChild(dataDiv);

    //taxonomy
    dataDiv.appendChild(parseDataComponent("Taxonomy", animal.taxonomy));

    //locations
    dataDiv.appendChild(parseArrayComponent("Locations", animal.locations));

    //characteristics
    dataDiv.appendChild(parseDataComponent("Characteristics", animal.characteristics));

    //add favorite button
    div.appendChild(createFavButton(animal));

    //append the final div and open the modal
    animalsModal.appendChild(div);
    openModal(animalsModal);
}

function parseDataComponent(key, object) {
    //base div for the component
    const div = document.createElement("div");
    div.classList.add("modal-section");

    //section title
    const title = document.createElement("p");
    title.classList.add("modal-section-title");
    title.textContent = key;
    div.appendChild(title);

    //elements
    for (const [subKey, value] of Object.entries(object)) {
        //capitalize the first letter and replace underscores with spaces for better display
        let formattedKey = subKey.charAt(0).toUpperCase() + subKey.slice(1);
        formattedKey = formattedKey.replace(/_/g, " ");

        //create the info element
        const info = document.createElement("div");
        info.classList.add("modal-section-info");
        info.innerHTML = `
            <span class="info-key">${formattedKey}</span>
            <span class="info-value">${value}</span>
        `;
        div.appendChild(info);
    }

    return div;
}

function parseArrayComponent(key, object) {
    //base div for the component
    const div = document.createElement("div");
    div.classList.add("modal-section");

    //section title
    const title = document.createElement("p");
    title.classList.add("modal-section-title");
    title.textContent = key;
    div.appendChild(title);

    //elements
    const info = document.createElement("div");
    info.classList.add("modal-section-info");
    info.textContent = object.join(", ");
    div.appendChild(info);

    return div;
}

/**
 * favorites management
 */
function loadFavorites() {
    favList.innerHTML = "";

    if (favorites.length === 0) {
        favList.innerHTML = "<p>Nenhum animal favoritado ainda...</p>";
        return;
    }

    for (const fav of favorites) {
        const card = createFavoritesCard(fav);
        favList.appendChild(card);
    }
}

function createFavoritesCard(animal) {
    //simple card with only name and scientific name
    const card = document.createElement("div");
    card.classList.add("favorite-card");
    card.innerHTML = `
        <p class="fav-card-name">${animal.name}</p>
        <p class="fav-card-sci-name">${animal.taxonomy.scientific_name ? `(${animal.taxonomy.scientific_name})` : ""}</p>
    `;

    //click event to open the animal modal
    card.addEventListener("click", () => {
        createAndOpenAnimalModal(animal);
    });

    return card;
}

loadFavorites();
