const ul = document.querySelector("ul");
const input = document.getElementById("item");

const storageItems = localStorage.getItem("items");
let itemArray = storageItems ? JSON.parse(storageItems) : [];

function addTask(task) {
    const li = document.createElement("li");
    li.textContent = task;
    ul.appendChild(li);
}

for (let item of itemArray)
    addTask(item);

function add() {
    const task = input.value.trim();
    if (task !== "") {
        addTask(task);
        itemArray.push(task);
        localStorage.setItem("items", JSON.stringify(itemArray));
    }

    input.value = "";
    input.focus();
}

function del() {
    localStorage.removeItem("items");
    ul.innerHTML = "";
    itemArray = [];
}

input.addEventListener("keypress", function (event) {
    if (event.key === "Enter")
        add();
});