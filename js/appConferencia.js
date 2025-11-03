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
document.getElementById('nomeUser').innerHTML = `Olá, ${usuarios}`;

// Verifica login
if (localStorage.getItem('token') == null) {
    alert('Login Obrigatório.');
    window.location.href = 'https://conferenciapa.netlify.app/';
}

// Logout
function sair() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioLogado');
    localStorage.removeItem('usuarios');
    window.location.href = 'https://conferenciapa.netlify.app/';
}

// Botão diminuir
diminuir.addEventListener('click', function () {
    if (contagem >= 1) {
        contador.innerHTML = --contagem;
    } else {
        alert("Quantidade não pode ser menor que ZERO.");
    }
});

// Botão adicionar +1
adiciona.addEventListener('click', function () {
    contador.innerHTML = ++contagem;
});

// Limpar campos
limpar.addEventListener('click', function () {
    if (confirm("Clique em OK para limpar todos os campos!")) {
        contador.innerHTML = contagem = 0;
        referencia.innerHTML = "";
        descricao.innerHTML = "";
        number.value = "";
        codigoBarra.value = "";
        codigos.value = "";
        document.getElementById('number').focus();
    }
});

// Verifica segunda leitura
function checked() {
    if (codigos.value == codigoBarra.value) {
        contador.innerHTML = ++contagem;
        codigos.value = "";
    } else {
        document.getElementById('audio').play();
        codigos.value = "";
    }
}

// API JSON
function retorno() {
    fetch("/json/sb1.json")
        .then(res => res.json())
        .then((sb1) => {
            sb1.infos.map((peca) => {
                if (codigoBarra.value == peca.codBarras) {
                    referencia.innerHTML = peca.sku;
                    descricao.innerHTML = peca.descricao;
                    contador.innerHTML = ++contagem;
                }
            });
        });

    document.getElementById('codBarraPrimary').focus();
}

// Classe Produto
class Produto {

    constructor() {
        this.arrayProdutos = JSON.parse(localStorage.getItem("tabela")) || [];
        this.listaTabela();
    }

    salvar() {
        let produtos = this.lerDados();

        if (this.validaCampos(produtos)) {
            this.arrayProdutos.push(produtos);
            this.salvarLocal();
        }

        this.listaTabela();

        codigoBarra.value = "";
        codigos.value = "";
        contador.innerHTML = contagem = 0;
        referencia.innerHTML = "";
        descricao.innerHTML = "";
        number.value = "";
        document.getElementById('number').focus();
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        // FILTRO AO VIVO
        let filtro = document.getElementById("buscar")?.value?.toLowerCase() || "";

        let filtrados = this.arrayProdutos.filter(item =>
            item.id.toLowerCase().includes(filtro) ||
            item.referencia.toLowerCase().includes(filtro) ||
            item.descricao.toLowerCase().includes(filtro)
        );

        filtrados.reverse().forEach((item) => {
            let tr = tbody.insertRow();

            tr.insertCell().innerHTML = item.id;
            tr.insertCell().innerHTML = item.referencia;
            tr.insertCell().innerHTML = item.contador;
            tr.insertCell().innerHTML = item.descricao;
            tr.insertCell().innerHTML = `${usuarios}`;

            let td_acoes = tr.insertCell();
            td_acoes.classList.add('center');

            td_acoes.innerHTML = `
                <button onclick="produtos.editar('${item.id}')">✏️</button>
                <button onclick="produtos.deletar('${item.id}')">🗑️</button>
            `;
        });
    }

    editar(id) {
        let produto = this.arrayProdutos.find(x => x.id == id);
        document.getElementById('number').value = produto.id;
        referencia.innerHTML = produto.referencia;
        descricao.innerHTML = produto.descricao;
        contador.innerHTML = produto.contador;
    }

    lerDados() {
        return {
            id: document.getElementById('number').value,
            referencia: referencia.innerHTML,
            contador: contador.innerHTML,
            descricao: descricao.innerHTML
        }
    }

    validaCampos(produtos) {
        if (produtos.referencia == '' && produtos.descricao == '') {
            alert('Campo não pode ser vazio');
            return false;
        }
        return true;
    }

    deletar(id) {
        if (confirm(`Excluir o Baú Nº ${id} ?`)) {
            this.arrayProdutos = this.arrayProdutos.filter(x => x.id != id);
            this.salvarLocal();
            this.listaTabela();
        }
    }

    salvarLocal() {
        localStorage.setItem("tabela", JSON.stringify(this.arrayProdutos));
    }
}

var produtos = new Produto();

// EXPORTAR CSV
document.getElementById('exportCSV').addEventListener('click', function () {
    var table2excel = new Table2Excel();
    table2excel.export(document.getElementById('export'));
});

// LIMPAR BUSCA
document.getElementById("limparBusca")?.addEventListener("click", () => {
    document.getElementById("buscar").value = "";
    produtos.listaTabela();
});

// LIMPAR TABELA
document.getElementById("limparTabela")?.addEventListener("click", () => {
    if (confirm("Tem certeza que deseja limpar toda a tabela?")) {
        produtos.arrayProdutos = [];
        produtos.salvarLocal();
        produtos.listaTabela();
        alert("Tabela limpa com sucesso!");
    }
});

// FILTRAR AO DIGITAR
document.getElementById("buscar")?.addEventListener("keyup", () => {
    produtos.listaTabela();
});

document.querySelector('*' && 'body').setAttribute("class", 'amd');
