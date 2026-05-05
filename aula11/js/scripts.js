class Cachorro {
    constructor(nome, peso, cor) {
        this.nome = nome;
        this.peso = peso;
        this.cor = cor;
    }
}

let meuCao = new Cachorro("Sven", 28, "Branco e Marrom");
let outroCao = new Cachorro("Rex", 2);

console.log(`Meu cão se chama ${meuCao.nome}, pesa ${meuCao.peso}kg e é de cor ${meuCao.cor}`);
console.log(`O outro cão se chama ${outroCao.nome}, pesa ${outroCao.peso}kg e é de cor ${outroCao.cor}`);

class Aluno {
    #nome;
    #idade;
    #curso;
    constructor(nome, idade = 18, curso = "Informática") {
        this.#nome = nome;
        this.#idade = idade;
        this.#curso = curso;
    }

    apresentacao() {
        console.log(`Me chamo ${this.#nome}, tenho ${this.#idade} anos de idade e curso ${this.#curso}`);
    }

    materiaFavorita(materia) {
        return `${materia} é minha disciplina favorita no curso de ${this.#curso}`;
    }

    get nome() { return this.#nome; }
    set nome(novoNome) { this.#nome = novoNome; }

    get idade() { return this.#idade; }
    set idade(novaIdade) { this.#idade = novaIdade; }

    get curso() { return this.#curso; }
    set curso(novoCurso) { this.#curso = novoCurso; }
}

let aluno1 = new Aluno("Fulano de Tal", 22, "Análise e Desenvolvimento de Sistemas");
let aluno2 = new Aluno("Anônimo");

console.log(aluno1);
console.log(aluno2);

aluno1.apresentacao();
aluno2.apresentacao();

console.log(aluno1.materiaFavorita("Complexidade de Algoritmos"));
console.log(aluno2.materiaFavorita("Lógica de Programação"));

aluno2.nome = "Francisco";
aluno2.idade = 19;
aluno2.curso = "Jogos Digitais";
console.log(aluno2);

class Veiculo {
    constructor(cor, velocidadeAtual, velocidadeMaxima) {
        this.cor = cor;
        this.velocidadeAtual = velocidadeAtual;
        this.velocidadeMaxima = velocidadeMaxima;
    }

    acelera(aumentoNaVelocidade) {
        this.velocidadeAtual = Math.min(this.velocidadeAtual + aumentoNaVelocidade, this.velocidadeMaxima);
    }

    move() {
        console.log(`O veículo está se movendo a ${this.velocidadeAtual}km/h`);
    }
}

class Moto extends Veiculo {
    constructor(cor, velocidadeAtual, velocidadeMaxima, tipoCombustivel) {
        super(cor, velocidadeAtual, velocidadeMaxima);
        this.tipoCombustivel = tipoCombustivel;
    }

    empinar() {
        console.log("Moto empinando...");
    }
}

let moto1 = new Moto("Vermelha", 0, 200, "Gasolina");
moto1.acelera(100);
moto1.move();
moto1.empinar();
moto1.acelera(150);
moto1.move();

class Pessoa {
    constructor(nome, sobrenome) {
        this.nome = nome;
        this.sobrenome = sobrenome;
    }

    dizOi() {
        console.log(`Oi, me chamo ${this.nome} ${this.sobrenome}`);
    }
}

let pessoa1 = new Pessoa("Joana", "D'Arc");

Pessoa.prototype.dizTchau = function() {
    console.log(`Tchau...`);
}
Pessoa.prototype.corFavorita;
pessoa1.corFavorita = "Cinza";

pessoa1.dizTchau();
console.log(pessoa1);
