let myText = document.getElementById("meuTexto");
console.log(myText.innerText);

let listOfPs = document.getElementsByTagName("p");
for (let p of listOfPs)
    console.log(p.innerText);

function printDivs() {
    let divs = document.getElementsByTagName("div");
    for (let div of divs)
        console.log(div.innerHTML);
};
printDivs();

function coloredDivs() {
    let colors = ["red", "darkgreen", "gold", "blue"];
    let bgColor = ["lightcoral", "lightgreen", "lightyellow", "lightblue"];

    let divs = document.getElementsByClassName("hp");
    for (let i = 0; i < divs.length; i++) {
        let div = divs[i];
        let texts = div.getElementsByTagName("p");
        for (let text of texts) {
            text.style.color = colors[i];
            text.style.backgroundColor = bgColor[i];
            text.style.fontSize = "20px";
        }
    }
};
coloredDivs();

function aparecer() {
    let hiddenElements = document.getElementsByClassName("oculto");
    for (let element of hiddenElements)
        element.style.display = "block";
}

let revelioBtn = document.querySelector("#revelio");
revelioBtn.addEventListener("dblclick", () => {
    revelioBtn.classList.add("btnVermelho");
});

let p = document.createElement("p");
let p2 = document.createElement("p");
p.innerText = "Hello...";
p2.innerText = "...World";
document.body.insertBefore(p, document.body.firstChild);
document.body.appendChild(p2);

let a = document.querySelector("a");
a.setAttribute("href", "https://unisinos.br");
a.setAttribute("target", "_blank");