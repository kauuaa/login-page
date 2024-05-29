let respostaCadastro = document.getElementById('respostaCadastro')
let cadastrar = document.getElementById('cadastrar')

cadastrar.addEventListener('click', () => {
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const senha = document.getElementById('senha').value

    const valoresUser = {
        nome: nome,
        email: email,
        senha: senha
    }

    fetch('http://localhost:3000/cadastrar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(valoresUser)
    })
    .then(resposta => resposta.json())  
    .then(valoresUser => {
        respostaCadastro.innerHTML = `Usuário cadastrado com sucesso!`
    })
    .catch((err) => {
        respostaCadastro.innerHTML = `Erro no servidor!`
        console.err(`Erro no servidor, ${err}`)
    })  
})