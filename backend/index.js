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

app.get('/login', async(req,res)=>{
    const logar = req.body
    console.log(logar)

    try{
        const pesquisa = await Usuario.findOne({where: {email: logar.email}, raw:true})
        console.log(pesquisa)
        
        if(pesquisa === null) {
            console.log(`Usuário nao existe no banco de dados!`)
            res.status(404).json({message: `Usuário inexistente!`})
        } else if(pesquisa.email == logar.email) {
            bcrypt.compare(logar.senha, pesquisa.senha, (err, result)=> {
                if (err) {
                    console.log(`Erro ao verificar a criptografia! ${err}`)
                    res.status(500).json({ message: `Senha ou usuário incorretos, por favor digite novamente!`})
                }else if(result) {
                    console.log(`Senha correta!`)
                    res.status(200).json({message: "Sucesso ao efetuar login!"})
                }else {
                    console.log(`"Senha incorreta!"`)
                    res.status(404).json({message: `Senha ou usuário incorretos, por favor digite novamente!`})
                }   
            })
        }
    }catch(err) {
        console.error(`Erro ao consultar o usuário no banco de dados!, ${err}`)
        res.status(500).json({message: `Erro ao consultar o usuário no banco de dados!`})
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