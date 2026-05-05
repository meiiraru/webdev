class Funcionario {
    constructor(nome, sobrenome, anosTrabalhados) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.anosTrabalhados = anosTrabalhados;
    }
}

let f1 = new Funcionario("Maria",    "Silva",    5);
let f2 = new Funcionario("João",     "Santos",   10);
let f3 = new Funcionario("Ana",      "Oliveira", 3);
let f4 = new Funcionario("Carlos",   "Pereira",  8);
let f5 = new Funcionario("Fernanda", "Costa",    1);

let funcionarios = [f1, f2, f3, f4, f5];

Funcionario.prototype.informacoes = function() {
    return `Funcionário "${this.nome} ${this.sobrenome}", Trabalhou por ${this.anosTrabalhados} ${this.anosTrabalhados > 1 ? "anos" : "ano"} na empresa`
}

for (let funcionario of funcionarios)
    console.log(funcionario.informacoes());