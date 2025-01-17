import React, { useEffect, useState } from "react";
import { fetchCategories, fetchProductsByCategory } from "../api/api";
import Navbar from "../components/Navbar";

interface Categoria {
  id: number;
  title: string;
}

interface Produto {
  id: number;
  title: string;
  description: string;
  brand: string;
  value: number;
  size: string;
  quantity: number;
  image_url: string;
  category_id: number;
}

interface Avaliacao {
  rating: number;
  comment: string;
  created_at: string;
}

function Home() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [produtosPorCategoria, setProdutosPorCategoria] = useState<{ [key: number]: Produto[] }>({});
  const [detalhesProduto, setDetalhesProduto] = useState<{ [key: number]: boolean }>({});
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriasData = await fetchCategories();
        console.log("Categorias recebidas:", categoriasData);
        
        const produtosData: { [key: number]: Produto[] } = {};
        for (const categoria of categoriasData) {
          const produtos = await fetchProductsByCategory(categoria.id);
          produtosData[categoria.id] = produtos.slice(0, 6); // Limitar a 6 produtos
        }
        
        setCategorias(categoriasData);
        setProdutosPorCategoria(produtosData);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    loadData();
  }, []); 

  // Função para alternar a visibilidade dos detalhes do produto
  const toggleDetalhesProduto = (produtoId: number) => {
    setDetalhesProduto((prevState) => ({
      ...prevState,
      [produtoId]: !prevState[produtoId],
    }));
  };

  // Função para adicionar produto ao carrinho e salvar no localStorage
  const adicionarAoCarrinho = (produto: Produto) => {
    const carrinhoAtualizado = [...carrinho, {...produto, quantity: 1}];
    setCarrinho(carrinhoAtualizado);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado)); // Salvar no localStorage
  };

  // Função para recuperar carrinho do localStorage
  const recuperarCarrinho = () => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  };

  // Dados simulados de avaliações (substitua pela requisição real em breve)
  const obterAvaliacoes = (produtoId: number): Avaliacao[] => {
    return [
      { rating: 5, comment: "Excelente produto! Adoro o sabor!", created_at: "2025-01-15" },
      { rating: 4, comment: "Muito bom, mas poderia ser um pouco mais doce.", created_at: "2025-01-14" },
      { rating: 3, comment: "Sabor bom, porém a embalagem estava danificada.", created_at: "2025-01-13" }
    ];
  };

  return (
    <>
      <Navbar carrinhoCount={carrinho.length} />
      
      <main className="container mt-5">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="mb-5">
            <h2 className="text-start text-primary mb-4">{categoria.title}</h2>

            <div className="row">
              {produtosPorCategoria[categoria.id]?.map((produto) => (
                <div key={produto.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card h-100 shadow-sm">
                    <img src={produto.image_url} className="card-img-top" alt={produto.title} />
                    <div className="card-body">
                      <h5 className="card-title">{produto.title}</h5>
                      <p className="card-text">{produto.description}</p>
                      <p className="card-text">
                        <strong>R${Number(produto.value || 0).toFixed(2)}</strong>
                      </p>
                      <p className="card-text">
                        <strong>Tamanho:</strong> {produto.size}
                      </p>
                      <button 
                        className="btn btn-primary" 
                        onClick={() => toggleDetalhesProduto(produto.id)}
                      >
                        {detalhesProduto[produto.id] ? 'Ver Menos' : 'Ver Mais Detalhes'}
                      </button>
                      <button 
                        className="btn btn-success ms-2"
                        onClick={() => adicionarAoCarrinho(produto)}
                      >
                        Adicionar ao Carrinho
                      </button>

                      {detalhesProduto[produto.id] && (
                        <div className="mt-3">
                          <h6>Detalhes do Produto:</h6>
                          <p>{produto.description}</p>
                          <div>
                            <h6>Avaliações:</h6>
                            <ul>
                              {obterAvaliacoes(produto.id).map((avaliacao, index) => (
                                <li key={index}>
                                  <strong>{avaliacao.rating} Estrelas:</strong> {avaliacao.comment} <br />
                                  <small>{new Date(avaliacao.created_at).toLocaleDateString()}</small>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </>
  );
}

export default Home;
