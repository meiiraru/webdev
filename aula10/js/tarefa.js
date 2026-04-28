const newNotebook = (model, ram, gpu, screen, price) => {
    return {
        marca: model,
        RAM_GB: ram,
        GPU_GB: gpu,
        Tela: screen,
        Preco: price,
    };
};

const model   = prompt("Digite a marca do notebook");
const ram    = parseInt(prompt("Digite a quantidade de memória RAM em GB"));
const gpu    = parseInt(prompt("Digite a quantidade de memória GPU em GB"));
const screen = parseFloat(prompt("Digite o tamanho da tela em polegadas"));
const price  = parseFloat(prompt("Digite o preço do notebook"));

const userNotebook = newNotebook(model, ram, gpu, screen, price);

console.log(userNotebook);