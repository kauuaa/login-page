let respostaLogin = document.getElementById('respostaLogin')
let logar = document.getElementById('logar')

logar.addEventListener('click', () => {
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const valoresUser = {
        email: email,
        senha: senha
    }

    fetch('http://localhost:3000/login')
    .then(resposta => resposta.json())
    .then(valoresUser => {
        respostaLogin.innerHTML = `Usuário cadastrado com sucesso! <br> Você será redirecionado para a tela inicial!`
    })
    .catch((err) => {
        respostaLogin.innerHTML = `Erro no servidor!`
        console.error = `Erro no servidor, ${err}`
    })
})