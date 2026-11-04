import { useEffect, useState } from 'react'
const API_URL = 'http://localhost:3000/produtos'

export default function ListaProdutos() {
  const [itens, setItens] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function carregar() {
      try {
        const resposta = await fetch(API_URL, { signal: controller.signal })
        if (!resposta.ok) {
          throw new Error(`Erro HTTP ${resposta.status}`)
        }
        const dados = await resposta.json()
        setItens(dados)
      } catch (e) {
        if (e.name !== 'AbortError') setErro(e.message)
      } finally {
        if (!controller.signal.aborted) setCarregando(false)
      }
    }

    carregar()
    return () => controller.abort()
  }, [])

  if (carregando) return <p>Carregando...</p>
  if (erro) return <p className="erro">Erro ao carregar: {erro}</p>
  if (itens.length === 0) return <p>Nenhum item encontrado.</p>

  return (
    <ul className="lista">
      {itens.map((item) => (
        <li className="item" key={item._id ?? item.id}>
          <strong>{item.produto ?? item.nome}</strong>
          {item.preco !== undefined && <span> - R$ {item.preco}</span>}
          {item.fornecedor && (
            <small>
              {item.fornecedor.nome} ({item.fornecedor.cidade})
            </small>
          )}
          {Array.isArray(item.tags) && <small>Tags: {item.tags.join(', ')}</small>}
        </li>
      ))}
    </ul>
  )
}
