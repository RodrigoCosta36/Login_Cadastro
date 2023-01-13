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
    var logado = false;

    fetch("usuarios.json").then((response) => {
        response.json().then((usuario) => {
            usuario.users.map((pass) => {

                for (let i = 0; i < usuario.users.length; i++) {
                    if (login == pass.usuario && senha == pass.senha) {
                        logado = true;
                    }
                }
            })
            if (logado == true) {
                location.href = "./conferencia.html";
            } else {
                alert('Campo usuário ou senha incoreto.');
            }
        })
    })
};