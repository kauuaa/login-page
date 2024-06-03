const express = require('express')
const app = express()
const cors = require('cors')
const bcrypt = require('bcrypt')
const conn = require('./db/conn')
const Usuario = require('./model/Usuario')

const PORT = 3000
const hostname = 'localhost'

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.post('/login', async (req, res) => {
    const logar = req.body
    console.log(`> email = ${logar.email}`)
    
    const pesquisa = await Usuario.findOne({ where: { email: logar.email }, raw: true })

    if(pesquisa == null){
        console.log(`> pesquisa = null`)
        res.status(500).json({Message: "pesquisa = null"})
    }
    else{
        const senhabanco = pesquisa.senha
        const senhauser = logar.senha

        bcrypt.compare( senhauser , senhabanco, (err, result) => {
            if (err) {
                console.log(`X erro ao validar criptografia`)
                res.status(500).json({Message: `Acesso negado.`})
            }
            else if(result){
                res.status(200).json({Message:`Acesso autorizado, bem vindo ${pesquisa.nome}.`})
            } 
            else{
                console.log(`X erro ao validar criptografia`)
                res.status(500).json({Message: `Acesso negado.`})
            }
        })
    }
})

app.post('/cadastrar', (req, res) => {
    const cadastrar = req.body
    console.log(cadastrar)

    bcrypt.hash(cadastrar.senha, 10, async (err, hash) => {
        if (err) {
            console.log(`Erro ao gerar o hash!`)
            res.status(500).json({ message: `Erro ao criptografar a senha!`})
        }
        try {
            const gravar = await Usuario.create(
            {nome: cadastrar.nome, email: cadastrar.email, senha: hash })    
            console.log(gravar)    
            res.status(200).json(gravar)
    
        } catch (err) {
            console.error(`Erro ao gravar os dados!, ${err}`)
            res.status(500).json({ message:` Erro ao gravar os dados!` })
        }
    })
})

app.get('/', (req, res) => {
    res.status(200).json({ message: "Aplicação está rodando!" })
})

conn.sync().then(() => {
    app.listen(PORT, hostname, () => {
        console.log(`Servidor rodando em ${hostname}:${PORT}`)
    })
}).catch((err) => {
    console.error("Erro de conexão com o banco de dados!", err)
})