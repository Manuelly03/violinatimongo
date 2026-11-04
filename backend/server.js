import express from 'express'
import cors from 'cors'

const app = express()
const PORTA = 3000

app.use(cors())
app.use(express.json())

const produtos = [
  {
    _id: '64f1a2b3c4d5e6f7a8b9c0d1',
    produto: 'Café',
    preco: 12.5,
    tags: ['quente', 'manhã'],
    fornecedor: { nome: 'CoopeCafé', cidade: 'Dourados' },
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c0d2',
    produto: 'Pão de queijo',
    preco: 4.0,
    tags: ['salgado'],
    fornecedor: { nome: 'Padaria Central', cidade: 'Dourados' },
  },
  {
    _id: '64f1a2b3c4d5e6f7a8b9c0d3',
    produto: 'Suco de laranja',
    preco: 7.0,
  },
]

app.get('/produtos', (req, res) => res.json(produtos))

app.listen(PORTA, () => {
  console.log(`API rodando em http://localhost:${PORTA}/produtos`)
})
