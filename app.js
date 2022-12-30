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
    var login = document.getElementById('user').value;
    var senha = document.getElementById('password').value;

    if (login == 'root' && senha == 'root') {
        alert('Logado Com Sucesso !!');
    } else {
        alert('Usuário ou Senha Inválido, Preencha os Campos.');
    }
}