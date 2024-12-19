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

function Home() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [produtosPorCategoria, setProdutosPorCategoria] = useState<{ [key: number]: Produto[] }>({});

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

  return (
    <>
      <Navbar />
      
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
