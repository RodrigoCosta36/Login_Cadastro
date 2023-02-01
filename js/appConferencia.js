let contagem = 0;
contador.innerHTML = contagem;

const codigoBarra = document.getElementById('codBarraPrimary');
const codigos = document.getElementById('codBarra');
const diminuir = document.getElementById('diminuir');
const limpar = document.getElementById('limpar');
const referencia = document.getElementById('referencia');
const descricao = document.getElementById('descricao');

document.getElementById('number').focus();
document.getElementById('codBarra').onchange = function () {
    checked();
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

diminuir.addEventListener('click', function () {
    if (contagem >= 1) {
        contador.innerHTML = --contagem;
    } else {
        alert("Quantidade não pode ser menor que ZERO.");
    }
});

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

function checked() {
    if (codigos.value == codigoBarra.value) {
        contador.innerHTML = ++contagem;
        codigos.value = codigos.value = "";
    } else {
        let x = document.getElementById('audio');
        x.play();
    }
};

function retorno() {
    fetch("/json/info.json").then((response) => {
        response.json().then((info) => {
            info.infos.map((peca) => {
                if (codigoBarra.value == peca.codBarras) {
                    referencia.innerHTML = peca.sku;
                    descricao.innerHTML = peca.descricao;
                    contador.innerHTML = ++contagem;
                }
            })
        })
    })
    document.getElementById('codBarra').focus();
};
function enter() {
    document.getElementById('codBarraPrimary').focus();
};

class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
    }

    salvar() {
        let produtos = this.lerDados();

        if (this.validaCampos(produtos)) {
            this.adicionar(produtos);
        };

        this.listaTabela();
        codigoBarra.value = "";
        codigos.value = "";
        contador.innerHTML = contagem = 0;
        referencia.innerHTML = contagem = "";
        descricao.innerHTML = contagem = "";
        number.value = "";

        document.getElementById('number').focus();
    };

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        //for (let i = 0; i < this.arrayProdutos.length; i++) {
        for (let i = this.arrayProdutos.length - 1; i >= 0; i--) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_sku = tr.insertCell();
            let td_qtde = tr.insertCell();
            let td_descricao = tr.insertCell();
            let td_conferente = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerHTML = this.arrayProdutos[i].id;
            td_sku.innerHTML = this.arrayProdutos[i].referencia;
            td_qtde.innerHTML = this.arrayProdutos[i].contador;
            td_descricao.innerHTML = this.arrayProdutos[i].descricao;
            td_conferente.innerHTML = `${usuarios}`;

            td_id.classList.add('center');
            td_sku.classList.add('center');
            td_qtde.classList.add('center');
            td_acoes.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = '_icon/editar.png';

            td_acoes.appendChild(imgEdit);

            let imgDelet = document.createElement('img');
            imgDelet.src = '_icon/excluir.png';

            td_acoes.appendChild(imgDelet);
        }


    };

    adicionar(produtos) {
        this.arrayProdutos.push(produtos);
        this.id++;
    };

    lerDados() {
        let produtos = {}

        produtos.id = document.getElementById('number').value;
        produtos.referencia = referencia.innerHTML;
        produtos.contador = contador.innerHTML;
        produtos.descricao = descricao.innerHTML;

        return produtos;
    };

    validaCampos(produtos) {
        let msg = '';

        if (produtos.referencia == '' && produtos.descricao == '') {
            msg += 'Campo não pode ser vazio \n';
        }
        if (msg != '') {
            alert(msg);
            return false
        }
        return true;
    };
};

var produtos = new Produto();

document.getElementById('exportCSV').addEventListener('click', function () {
    var table2excel = new Table2Excel();
    table2excel.export(document.getElementById('export'))
});

document.querySelector('*' && 'body').setAttribute("class", 'amd');

document.getElementById('verde-btn').addEventListener('click', function () {
    document.querySelector('*' && 'body').setAttribute("class", "verde");
});
document.getElementById('azul-btn').addEventListener('click', function () {
    document.querySelector('*' && 'body').setAttribute("class", "azul");
});
document.getElementById('amd-btn').addEventListener('click', function () {
    document.querySelector('*' && 'body').setAttribute("class", "amd");
});