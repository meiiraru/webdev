//let nome = prompt("Qual seu nome?"); // Se clicar OK, o valor digitado é retornado. Senão, retorna null
//alert(`Boa noite, ${nome}!`);

const nomes = ["Fulano", "Beltrano", "Ciclano"]; // Array com valores conhecidos
const valores = new Array(10); // Crio um array de 10 posições de valores undefined
//alert(nomes[2]); // imprime Ciclano
//alert(valores[9]); // imprime undefined

console.log(`Tamanho do array nomes ${nomes.length}`);
nomes.push("Dio"); // Insere Dio na última posição
nomes.pop(); // Remove o último elemento do array
/**
 * 1° parâmetro: 1 - Indica onde inicia a inserção do elemento
 * 2° parâmetro: 0 - Indica que NÃO quero deletar nenhum elemento a partir dali
 * 3° parâmetro em diante - São os valores que desejo inserir
 */
nomes.splice(1, 0, "A", "B");
console.log(nomes);

const nomes_e_valores = nomes.concat(valores);
console.log(nomes_e_valores);

// Retorna o valor procurado se for encontrado, ou undefined caso contrário
const beltrano = nomes.find( function(nome) { return nome == "Beltrano" } );
const beltrano2 = nomes.find( nome => nome == "Beltrano" ); // Sintaxe alternativa (arrow functions)
console.log(beltrano);

let posBeltrano = nomes.indexOf("Beltrano"); // Retorna o índice em que Beltrano foi encontrado, ou -1 caso contrário

let numeros = [12, 9, 1, 15, 88, 13, 29, 14];
console.log(numeros.sort()); // Ordena o array
console.log(numeros.reverse()); // Inverte os valores

let cachorro = {
    nome: "Sven",
    peso: 28,
    cor: "Branco",
    raca: "Bulldog Inglês",
    idade: 7,
    morde: false
};
console.log(cachorro["cor"]);   // Imprimindo um valor do objeto - Forma 1
console.log(cachorro.cor);      // Imprimindo um valor do objeto - Forma 2 (mais comum)

cachorro["cor"] = "Branco e Marrom";    // Alterando valor de um atributo - Forma 1
cachorro.peso = 29;                     // Alterando valor de um atributo - Forma 2 (mais comum)

// Função simples - Sem atributo e sem retorno
function minhaFunc() {
    console.log("Minha função simples");
}
minhaFunc();

// Função simples atribuída à uma variável
// Boa prática, pois garante que a função não será reescrita, nem invocada antes de ser declarada.
const minhaFunc2 = function() {
    console.log("Sou uma função dentro de uma variável");
}
minhaFunc2();

// Função com parâmetro
const funcArgumento = function(valor1, valor2=8) {
    console.log(`O argumento recebido é ${valor1} e ${valor2}`);
}
funcArgumento("oi", 50);
funcArgumento(5);
funcArgumento(false);

// Função com retorno
const somaValores = function(val1, val2) {
    return val1 + val2;
}
let soma = somaValores(15, 20);
console.log(`O resultado da soma é ${soma}`);

// ARROW FUNCTIONS
const printX = function(X) { // Forma normal
    console.log(X);
}

const printY = (Y) => console.log(Y); // Forma arrow function

// somaValores reescrita como arrow function
const somaValores2 = (val1, val2) => val1 + val2;
console.log(somaValores2(10, 11));

const numQuadrado = [12, 13, 14, 15, 16];
numQuadrado.forEach( n => {
        if (n % 2 !== 0)
            console.log(n*n); // Imprime o quadrado dos números ímpares
    }
);

// OPERADOR SPREAD
let letras = ["A", "B", "C", "D", "E"];
let alfanumerico = [1, 2, 3, 4, 5, ...letras, 6, 7, 8, 9, 10];
console.log(alfanumerico);

// OPERADOR REST
const somaInfinita = (...params) => {
    let total = 0;
    for (let i = 0; i < params.length; i++)
        total += params[i];
    
    return total;
};
console.log(somaInfinita(10, 12));
console.log(somaInfinita(11, 2, 4, 6, 100, 99));
console.log(somaInfinita(11, 2, 4, 6, 100, 99, 32, 1, 8, -156, -13));