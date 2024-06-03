let respostaLogin = document.getElementById('respostaLogin')
let logar = document.getElementById('logar')

logar.addEventListener('click', () => {
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value


    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({email, senha})
    })
    .then(resposta => resposta.json())
    .then(pesquisa => {
        respostaLogin.innerHTML = `Acesso autorizado!`
    })
    .catch((err) => {
        respostaLogin.innerHTML = `Erro no servidor!`
        console.error = `Erro no servidor, ${err}`
    })
})