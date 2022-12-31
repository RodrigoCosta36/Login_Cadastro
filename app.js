let usuarios = []
let senhas = []

usuarios.push("Rafael", "Rodrigo", "Daia", "Kauan");

senhas.push("123456");
senhas.push("1234567");
senhas.push("12345678");
senhas.push("123456789");

function showHide() {
    const password = document.getElementById('password');
    const icon = document.getElementById('icon');


    if (password.type === 'password') {
        password.setAttribute('type', 'text');
        icon.classList.add('hide')
    } else {
        password.setAttribute('type', 'password');
        icon.classList.remove('hide')
    }
}

function entar() {
    const login = document.getElementById('user').value;
    const senha = document.getElementById('password').value;
    var logado = 0;

    for (let i = 0; i < usuarios.length; i++) {
        if (login == usuarios[i] && senha == senhas[i]) {
            logado = 1;
        }
    }
    if (logado == 1) {
        alert("Logado");
        location.href = "https://supernintendo-rodrigo.netlify.app";
    } else {
        console.log('Invalido !!');
    }
}