let contagem = 0;
contador.innerHTML = contagem;

const codigoBarra = document.getElementById('codBarraPrimary');
const codigos = document.getElementById('codBarra');
const diminuir = document.getElementById('diminuir');
const limpar = document.getElementById('limpar');
const qrcoder = document.getElementById('qrCode');
const qrcoder1 = document.getElementById('qrCode1');

//document.getElementById('qrCode').focus();
document.getElementById('codBarra').onchange = function () {
    checked();
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
        //qrcoder.value = "";
        // qrcoder1.value = "";
        codigoBarra.value = "";
        codigos.value = "";
    }
});

// function readQR() {
//     if (qrcoder1.value == qrcoder.value) {
//         console.log('Ok.!');
//     } else {
//         alert('Erro ao Ler QR_CODE.');
//         let x = document.getElementById('audio');
//         x.play();
//     }
// };

function checked() {
    if (codigos.value == codigoBarra.value) {
        // console.log('Ok.!');
        contador.innerHTML = ++contagem;
        codigos.value = codigos.value = "";
    } else {
        //alert('Erro ao Ler CÓDIGOS_DE_BARRAS.');
        let x = document.getElementById('audio');
        x.play();
    }
};


const referencia = document.getElementById('referencia');
const descricao = document.getElementById('descricao');


function retorno() {
    fetch("info.json").then((response) => {
        response.json().then((info) => {
            info.infos.map((peca) => {
                if (codigoBarra.value == peca.codBarras) {
                    referencia.innerHTML = peca.sku;
                    descricao.innerHTML = peca.informacao;
                }
            })
        })
    })
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

        //console.log(produtos);
        codigoBarra.value = "";
        codigos.value = "";
        contador.innerHTML = contagem = 0;
        referencia.innerHTML = contagem = "";
        descricao.innerHTML = contagem = "";
        number.value = "";
        //qrcoder.value = "";
        // qrcoder1.value = "";
    };

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_sku = tr.insertCell();
            let td_qtde = tr.insertCell();
            let td_descricao = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerHTML = this.arrayProdutos[i].id;
            td_sku.innerHTML = this.arrayProdutos[i].referencia;
            td_qtde.innerHTML = this.arrayProdutos[i].contador;
            td_descricao.innerHTML = this.arrayProdutos[i].descricao;

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