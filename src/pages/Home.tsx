import React, { useEffect, useState } from "react";
import { fetchCategories, fetchProducts } from "../api/api";
import Navbar from "../components/Navbar";

interface Categoria {
  id: number;
  title: string;
  description: string;
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

function Home() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        
        const categoriasData = await fetchCategories();
        console.log('Categorias recebidas:', categoriasData);
        
        
        //const produtosData = await fetchProducts();
        //console.log('Produtos recebidos:', produtosData);  
  
        // Atualiza o estado com os dados recebidos
        setCategorias(categoriasData);
        //setProdutos(produtosData);
        //setProdutosFiltrados(produtosData); 
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };
  
    loadData();
  }, []); // Executa apenas uma vez quando o componente é montado
  

  // Função para filtrar os produtos por categoria
  const filterByCategory = (categoryId: number) => {
    const filtered = produtos.filter((produto) => produto.category_id === categoryId);
    setProdutosFiltrados(filtered);
  };

  return (
    <>
      <Navbar />
      
      <main>
        <div id="carouselSabores" className="carousel slide mt-5" data-bs-ride="carousel">
          {/* Adicione a lógica para o carrossel mais tarde */}
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselSabores" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselSabores" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Próximo</span>
          </button>
        </div>

        {/* Exibindo as categorias */}
        <div className="container mt-4">
          <h2>Categorias</h2>
          <div className="row">
            {categorias.map((categoria) => (
              <div key={categoria.id} className="col-md-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{categoria.title}</h5>
                    <p className="card-text">{categoria.description}</p>
                    <button className="btn btn-primary" onClick={() => filterByCategory(categoria.id)}>
                      Ver Produtos
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Exibindo os produtos filtrados */}
        <div className="container mt-4">
          <h2>Produtos</h2>
          <div className="row">
            {produtosFiltrados.map((produto) => (
              <div key={produto.id} className="col-md-4">
                <div className="card">
                  <img src={produto.image_url} className="card-img-top" alt={produto.title} />
                  <div className="card-body">
                    <h5 className="card-title">{produto.title}</h5>
                    <p className="card-text">{produto.description}</p>
                    <p className="card-text"><strong>R${produto.value}</strong></p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
