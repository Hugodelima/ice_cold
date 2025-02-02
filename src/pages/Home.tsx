import React, { useEffect, useState } from "react";
import { fetchCategories, fetchProductsByCategory, createRating, fetchProductDetails } from "../api/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "../App.css";

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
  const [categorias, setCategorias] = useState([]);
  const [produtosPorCategoria, setProdutosPorCategoria] = useState({});
  const [ratings, setRatings] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Produto | null>(null);
  const [userRating, setUserRating] = useState({ star: 0, comment: "" });
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user_id");
    if (!token) {
      navigate("/login");
    }
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const categoriasData = await fetchCategories();
      setCategorias(categoriasData.slice(0, 3));
      const produtosData: any = {};
      for (const categoria of categoriasData.slice(0, 3)) {
        const produtos = await fetchProductsByCategory(categoria.id);
        produtosData[categoria.id] = produtos;
      }
      setProdutosPorCategoria(produtosData);

      const ratingsData = await Promise.all(
        Object.values(produtosData).flat().map((produto: Produto) =>
          fetchProductDetails(produto.id)
            .then((productDetails) => ({
              productId: produto.id,
              ratings: productDetails.ratings || []
            }))
        )
      );

      const ratingsMap: any = {};
      ratingsData.forEach(({ productId, ratings }) => {
        ratingsMap[productId] = ratings;
      });

      setRatings(ratingsMap);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  };

  const handleRating = async () => {
    if (!userRating.star || !userRating.comment) return;

    const userId = localStorage.getItem("user_id");
    await createRating({
      star: userRating.star,
      comment: userRating.comment,
      user_id: userId,
      product_id: selectedProduct?.id as number,
    });

    setRatings((prevRatings) => ({
      ...prevRatings,
      [selectedProduct?.id as number]: [
        ...(prevRatings[selectedProduct?.id as number] || []),
        { star: userRating.star, comment: userRating.comment }
      ]
    }));

    setShowModal(false);
  };

  const handleShowModal = (product: Produto) => {
    setSelectedProduct(product);
    setUserRating({ star: 0, comment: "" });
    setShowModal(true);
  };

  const adicionarAoCarrinho = (produto: Produto) => {
    const carrinhoAtualizado = [...carrinho, { ...produto, quantity: 1 }];
    setCarrinho(carrinhoAtualizado);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado));
  };

  const recuperarCarrinho = () => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  };

  return (
    <>
      <Navbar carrinhoCount={carrinho.length} recuperarCarrinho={recuperarCarrinho} />
      <main className="container mt-5">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="mb-5">
            <h2 className="text-start text-primary mb-4">{categoria.title}</h2>
            <div className="row">
              {produtosPorCategoria[categoria.id]?.map((produto: Produto) => (
                <div key={produto.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card h-100 shadow-sm">
                    <img src={produto.image_url} className="card-img-top" alt={produto.title} />
                    <div className="card-body">
                      <h5 className="card-title">{produto.title}</h5>
                      <p className="card-text">{produto.description}</p>
                      <button
                        className="btn btn-info"
                        onClick={() => handleShowModal(produto)}
                      >
                        Avaliar
                      </button>

                      <button
                        className="btn btn-success ms-2"
                        onClick={() => adicionarAoCarrinho(produto)}
                      >
                        Adicionar ao Carrinho
                      </button>
                      <div>
                        {ratings[produto.id]?.length > 0 ? (
                          ratings[produto.id].map((rating: any, index: number) => (
                            <p key={index}>
                              Avaliação: {rating.star} estrelas - {rating.comment}
                            </p>
                          ))
                        ) : (
                          <p>Este produto ainda não foi avaliado.</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>

      {showModal && (
        <div className="modal" style={modalStyles}>
          <div className="modal-content" style={modalContentStyles}>
            <span
              className="close"
              onClick={() => setShowModal(false)}
              style={closeButtonStyles}
            >
              &times;
            </span>
            <h3>Avaliar Produto</h3>
            <div>
              <label>Avaliação (de 1 a 5 estrelas)</label>
              <input
                type="number"
                min="1"
                max="5"
                value={userRating.star}
                onChange={(e) => setUserRating({ ...userRating, star: parseInt(e.target.value) })}
                style={inputStyles}
              />
            </div>
            <div>
              <label>Comentário</label>
              <textarea
                value={userRating.comment}
                onChange={(e) => setUserRating({ ...userRating, comment: e.target.value })}
                style={textareaStyles}
              />
            </div>
            <button onClick={handleRating} style={buttonStyles}>Enviar Avaliação</button>
          </div>
        </div>
      )}
    </>
  );
}

const modalStyles = {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyles = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "5px",
  width: "400px",
  textAlign: "center",
};

const closeButtonStyles = {
  position: "absolute",
  top: "10px",
  right: "10px",
  fontSize: "20px",
  cursor: "pointer",
};

const inputStyles = {
  width: "100%",
  padding: "8px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const textareaStyles = {
  width: "100%",
  padding: "8px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "5px",
  minHeight: "100px",
};

const buttonStyles = {
  padding: "10px 20px",
  backgroundColor: "#28a745",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Home;
