const codigoBarra = document.getElementById('codBarraPrimary');
const referencia = document.getElementById('referencia');
const descricao = document.getElementById('descricao');
const pick = document.getElementById('pick');
const rua = document.getElementById('rua');
const estacao = document.getElementById('estacao');

document.getElementById('codBarraPrimary').focus();

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

function retorno() {
    fetch("/json/info.json").then((response) => {
        response.json().then((info) => {
            info.infos.map((peca) => {
                if (codigoBarra.value == peca.codBarras) {
                    referencia.innerHTML = peca.sku;
                    descricao.innerHTML = peca.descricao;
                    pick.innerText = `Endereço de Picking: ${peca.endereco}`;
                    rua.innerText = `Rua: ${peca.rua}`;
                    estacao.innerText = `Estação ${peca.estacao}`;
                    codigoBarra.value = "";
                }
            })
        })
    })
};
function enter() {
    document.getElementById('codBarraPrimary').focus();
};
document.querySelector('*' && 'body').setAttribute("class", 'amd');