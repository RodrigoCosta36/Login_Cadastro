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

    if (login == 'RODRIGO.COSTA' && senha == 'rodrigo') {
        alert('Logado Com Sucesso !!');
        location.href = "https://supernintendo-rodrigo.netlify.app";
    } else {
        alert('Usuário ou Senha Inválido, Preencha os Campos.');
    }
}