let contagem = 0;
contador.innerHTML = contagem;

const codigoBarra = document.getElementById('codBarraPrimary');
const codigos = document.getElementById('codBarra');
const diminuir = document.getElementById('diminuir');
const limpar = document.getElementById('limpar');
const referencia = document.getElementById('referencia');
const descricao = document.getElementById('descricao');

document.getElementById('number').focus();
document.getElementById('codBarraPrimary').onchange = function () {
    retorno();
};

document.getElementById("limparBusca")?.addEventListener("click", () => {
    document.getElementById("buscar").value = "";
    produtos.listaTabela();
});

document.getElementById("limparTabela")?.addEventListener("click", () => {
    if(confirm("Tem certeza que deseja limpar toda a tabela? Esta ação não pode ser desfeita!")) {
        produtos.arrayProdutos = []; // esvazia o array
        produtos.salvarLocal(); // atualiza o localStorage
        produtos.listaTabela(); // atualiza a tabela visual
        alert("Tabela limpa com sucesso!");
    }
});

document.getElementById('codBarraPrimary').focus();
document.getElementById('codBarraPrimary').onchange = function () {
    retorno();
};

let usuarios = localStorage.getItem('usuarios');
let nomeLogado = document.getElementById('nomeUser');

nomeLogado.innerHTML = `Olá, ${usuarios}`

if (localStorage.getItem('token') == null) {
    alert('Login Obrigatório.');
    window.location.href = 'https://conferenciapa.netlify.app/';
}

function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('usuarios');
    window.location.href = 'https://conferenciapa.netlify.app/';
};

limpar.addEventListener('click', function () {
    var r = confirm("Clique em OK para limpar todos os campos!");
    if (r == true) {
        contador.innerHTML = contagem = 0;
        referencia.innerHTML = contagem = "";
        descricao.innerHTML = contagem = "";
        number.value = "";
        codigoBarra.value = "";
        codigos.value = "";
        document.getElementById('number').focus();
    }
});

function retorno() {
    fetch("/json/info.json").then((response) => {
        response.json().then((sb1) => {
            sb1.infos.map((peca) => {
                if (codigoBarra.value == peca.codBarras) {
                    referencia.innerHTML = peca.sku;
                    descricao.innerHTML = peca.descricao;
                    contador.innerHTML = ++contagem;

                    produtos.salvar();
                }
            })
        })
    })
    document.getElementById('codBarraPrimary').focus();
};
function enter() {
    document.getElementById('codBarraPrimary').focus();
};

class Produto {

    constructor() {
        this.id = number.value;
        this.arrayProdutos = [];
    }

    salvar() {
        let produtos = this.lerDados();

        if (this.validaCampos(produtos)) {

            if (this.editando == true) {
                this.arrayProdutos[this.indexEditar] = produtos;
                this.editando = false;
                this.indexEditar = null;
            } else {
                this.arrayProdutos.push(produtos);
            }

            this.salvarLocal();
        };

        this.listaTabela();
        codigoBarra.value = "";
        document.getElementById('codBarraPrimary').focus();
    };

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        let filtro = document.getElementById("buscar")?.value?.toLowerCase() || "";

        let filtrados = this.arrayProdutos.filter(item =>
            item.id.toLowerCase().includes(filtro) ||
            item.referencia.toLowerCase().includes(filtro) ||
            item.descricao.toLowerCase().includes(filtro)
        );

        filtrados.forEach((item, index) => {
            let tr = tbody.insertRow();

            tr.insertCell().innerHTML = item.id;
            tr.insertCell().innerHTML = item.referencia;
            tr.insertCell().innerHTML = 1;
            tr.insertCell().innerHTML = item.descricao;
            tr.insertCell().innerHTML = `${usuarios}`;

            let td_acoes = tr.insertCell();
            td_acoes.innerHTML = `
                <button onclick="produtos.editar(${index})">✏️</button>
                <button onclick="produtos.deletar(${index})">🗑️</button>
            `;
            td_acoes.classList.add('center');
        })
    };

    adicionar(produtos) {
        this.arrayProdutos.push(produtos);
        this.id++;
    };

    editar(indice) {
        this.editando = true;
        this.indexEditar = indice;

        document.getElementById('number').value = this.arrayProdutos[indice].id;
        referencia.innerHTML = this.arrayProdutos[indice].referencia;
        descricao.innerHTML = this.arrayProdutos[indice].descricao;
        contador.innerHTML = this.arrayProdutos[indice].contador;

        document.getElementById('number').focus();
    }

    lerDados() {
        return {
            id: document.getElementById('number').value,
            referencia: referencia.innerHTML,
            descricao: descricao.innerHTML,
            contador: contador.innerHTML
        };
    };

    validaCampos(produtos) {
        if (produtos.referencia == '' && produtos.descricao == '') {
            alert('Campo não pode ser vazio');
            return false;
        }
        return true;
    };

    deletar(indice) {
        if (confirm(`Excluir o item com a Placa: ${this.arrayProdutos[indice].id}?`)) {
            this.arrayProdutos.splice(indice, 1);
            this.salvarLocal();
            this.listaTabela();
        }
    };

    salvarLocal() {
        localStorage.setItem("tabela", JSON.stringify(this.arrayProdutos));
    }
};

var produtos = new Produto();

document.getElementById('exportCSV').addEventListener('click', function () {
    var table2excel = new Table2Excel();
    table2excel.export(document.getElementById('export'))
});

document.querySelector('*' && 'body').setAttribute("class", 'amd');

// Filtro digitando na hora
document.getElementById("buscar")?.addEventListener("keyup", () => {
    produtos.listaTabela();
});