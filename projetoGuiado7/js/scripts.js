//URLs das APIs em uso
const SEARCH_API = "https://openlibrary.org/search.json";
const COVERS_API = "https://covers.openlibrary.org/b/id/";
const WORKS_API  = "https://openlibrary.org";
const PAGE_SIZE = 12;

//estados da aplicação
let currentQuery  = "";
let currentType   = "";
let currentPage  = 1;
let totalResults = 0;

//buscamos no DOM todos os elementos necessários
const searchForm     = document.getElementById("search-form");
const searchInput    = document.getElementById("search-input");
const searchTypeEl   = document.getElementById("search-type");
const searchBtn      = document.getElementById("search-btn");
const statusMessage  = document.getElementById("status-message");
const loader         = document.getElementById("loader");
const resultsSection = document.getElementById("results-section");
const resultsTitle   = document.getElementById("results-title");
const resultsCount   = document.getElementById("results-count");
const resultsGrid    = document.getElementById("results-grid");
const pagination     = document.getElementById("pagination");
const btnPrev        = document.getElementById("btn-prev");
const btnNext        = document.getElementById("btn-next");
const pageIndicator  = document.getElementById("page-indicator");
const modalOverlay   = document.getElementById("modal-overlay");
const modalClose     = document.getElementById("modal-close");
const modalBody      = document.getElementById("modal-body");

//event listeners
searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    currentQuery = searchInput.value.trim();
    currentType = searchTypeEl.value;
    currentPage = 1;
    if (currentQuery !== "")
        fetchBooks();
});

btnPrev.addEventListener("click", () => {
    currentPage--;
    fetchBooks();
});

btnNext.addEventListener("click", () => {
    currentPage++;
    fetchBooks();
});

modalClose.addEventListener("click", closeModal);

modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay)
        closeModal();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape")
        closeModal();
});

async function fetchBooks() {
    //exibe o estado de carregamento
    loader.hidden = false;
    searchBtn.disabled = true;
    searchBtn.textContent = "Pesquisando...";

    statusMessage.hidden = true;
    resultsSection.hidden = true;
    resultsGrid.innerHTML = "";

    //constrói a URL com parametros de busca
    const params = new URLSearchParams({
        [currentType]: currentQuery,
        limit: PAGE_SIZE,
        offset: (currentPage - 1) * PAGE_SIZE,
        fields: "key,title,author_name,first_publish_year,cover_i,edition_count,subject",
    });

    const url = `${SEARCH_API}?${params}`;
    console.log("URL da aquisição: ", url);

    try {
        const response = await fetch(url);
        if (!response.ok)
            throw new Error(`Erro HTTP! Status: ${response.status}`);

        const data = await response.json();
        console.log("Resposta da API: ", data);

        totalResults = data.numFound || 0;

        if (data.docs && data.docs.length > 0) {
            renderResults(data.docs);
        } else {
            showStatus("Nenhum livro encontrado. Tente uma busca diferente.", "info");
        }
    } catch (error) {
        console.error("Erro na requisição: ", error);
        showStatus(`Algo deu errado na requisição: ${error.message}`, "error");
    } finally {
        loader.hidden = true;
        searchBtn.disabled = false;
        searchBtn.textContent = "Pesquisar";
    }
}

function renderResults(books) {
    resultsTitle.textContent = `Resultados para "${currentQuery}"`;
    const totalPages = Math.ceil(totalResults / PAGE_SIZE);
    const plural = totalResults !== 1 ? "s" : "";
    resultsCount.textContent = `${totalResults} livro${plural} encontrado${plural}. Página ${currentPage} de ${totalPages}`;

    //cria um elemento card por livro
    for (let book of books)
        resultsGrid.appendChild(createBookCard(book));
    resultsSection.hidden = false;

    //paginaçao
    if (totalPages > 1) {
        pagination.hidden = false;
        pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
        btnPrev.disabled = currentPage === 1;
        btnNext.disabled = currentPage === totalPages;
    } else {
        pagination.hidden = true;
    }
}

function createBookCard(book) {
    const title = book.title || "Título Desconecido";
    const author = book.author_name ? book.author_name.join(", ") : "Autor Desconecido";
    const year = book.first_publish_year ? `Primeira publicação: ${book.first_publish_year}` : "";

    const coverHTML = book.cover_i
        ? `<img class="book-cover" src="${COVERS_API}${book.cover_i}-M.jpg" alt="capa" loading="lazy">`
        : `<div class="book-cover-placeholder">&#x1F4D6;</div>`;

    const card = document.createElement("article");
    card.className = "book-card";
    card.innerHTML = `
        ${coverHTML}
        <div class="book-info">
            <p class="book-title">${escapeHTML(title)}</p>
            <p class="book-author">${escapeHTML(author)}</p>
            <p class="book-year">${escapeHTML(year)}</p>
        </div>
    `;

    card.addEventListener("click", () => openModal(book));
    return card;
}

async function openModal(book) {
    modalOverlay.hidden = false;

    const title = book.title || "Título Desconecido";
    const authors = book.author_name ? book.author_name.join(", ") : "Autor Desconecido";
    const coverHTML = book.cover_i
        ? `<img class="modal-cover" src="${COVERS_API}${book.cover_i}-L.jpg" alt="capa" loading="lazy">`
        : `<div class="modal-cover-placeholder">&#x1F4D6;</div>`;

    modalBody.innerHTML = `
        <div class="modal-cover-wrap">${coverHTML}</div>
        <h2 id="modal-title">${escapeHTML(title)}</h2>
        <p style="color: var(--muted)">${escapeHTML(authors)}</p>

        <div class="modal-meta">
            ${book.first_publish_year ? `<span class="badge">&#x1F4D6; ${book.first_publish_year}</span>` : ""}
            ${book.edition_count ? `<span class="badge">&#x1F4D6; ${book.edition_count}</span>` : ""}
        </div>

        <p id="modal-description" class="modal-description">Carregando descrição...</p>

        <a href="${WORKS_API}${book.key}" target="_blank" class="modal-ol-link">Ver na Open Library</a>
    `;

    try {
        const response = await fetch(`${WORKS_API}${book.key}.json`);
        if (!response.ok)
            throw new Error(`Não encontrado`);

        const data = await response.json();

        document.getElementById("modal-description").textContent =
            typeof data.description === "string" ? data.description : data.description?.value || "Descrição não disponível";
    } catch {
        document.getElementById("modal-description").textContent = "Descrição não disponível";
    }
}

function closeModal() {
    modalOverlay.hidden = true;
    modalBody.innerHTML = "";
}

function showStatus(message, type = "info") {
    statusMessage.textContent = message;
    statusMessage.className = `status-message ${type}`;
    statusMessage.hidden = false;
}

function escapeHTML(str) {
    const div = document.createElement("div");
    div.appendChild(document.createTextNode(String(str)));
    return div.innerHTML;
}