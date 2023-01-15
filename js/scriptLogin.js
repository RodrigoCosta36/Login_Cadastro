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

function entrar() {
    const login = document.getElementById('user').value;
    const senha = document.getElementById('password').value;
    var logado = false;

    fetch("./json/usuarios.json").then((response) => {
        response.json().then((usuario) => {
            usuario.users.map((pass) => {

                for (let i = 0; i < usuario.users.length; i++) {
                    if (login == pass.usuario && senha == pass.senha) {
                        logado = true;
                    }
                }
            })
            if (logado == true) {
                window.location.href = "https://conferenciapa.netlify.app/conferencia.html";
                let token = Math.random().toString(32).substr(2);
                localStorage.setItem('token', token);
            } else {
                alert('Campo usuário ou senha incoreto.');
            }
        })
    })
};