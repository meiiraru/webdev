localStorage.setItem("aluno0", "Fulano de Tal");
//localStorage.removeItem("aluno0");
//document.querySelector("h1").innerHTML = localStorage.getItem("aluno0");


const alunos = ["Fulano de Tal", 19, "Ana Jura", 24, "Beltrano da Silva", 29, "Zelda Link", 31];
localStorage.setItem("alunos", JSON.stringify(alunos));
//localStorage.removeItem("alunos");

const alunosStore = JSON.parse(localStorage.getItem("alunos"));

const nome = document.getElementById("nome0");
const idade = document.getElementById("idade0");
const btn = document.getElementById("btn-next");

let index = 0;

function btnNextFunc() {
    nome.innerHTML = alunosStore[index];
    idade.innerHTML = alunosStore[index + 1];
    index += 2;
    if (index >= alunosStore.length)
        index = 0;
}

btn.addEventListener("click", btnNextFunc);
btnNextFunc();