import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar({ carrinhoCount, recuperarCarrinho }: { carrinhoCount: number, recuperarCarrinho: () => void }) {
  const [carrinho, setCarrinho] = useState<any[]>([]); // Usar o tipo adequado para os produtos do carrinho
  const [showModal, setShowModal] = useState<boolean>(false); // Controlar a exibição do modal

  // Carregar o carrinho do localStorage quando o componente for montado
  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo)); // Atualizar o estado com o carrinho salvo
    }
  }, []); // Executa uma vez, na montagem do componente

  useEffect(() => {
    // Sempre que carrinhoCount mudar (quando um item for adicionado/removido), atualizar o carrinho
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, [carrinhoCount]); // Observa o número de itens no carrinho

  // Função para alterar a quantidade de um item no carrinho
  const alterarQuantidade = (produtoId: number, quantidade: number) => {
    const novaQuantidade = Math.max(1, quantidade); // Garante que a quantidade seja ao menos 1

    const carrinhoAtualizado = carrinho.map((produto) =>
      produto.id === produtoId ? { ...produto, quantity: novaQuantidade } : produto
    );

    setCarrinho(carrinhoAtualizado);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado)); // Atualiza o carrinho no localStorage
  };

  // Função para remover produto do carrinho
  const removerDoCarrinho = (produtoId: number) => {
    const carrinhoAtualizado = carrinho.filter((produto) => produto.id !== produtoId);
    setCarrinho(carrinhoAtualizado);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado)); // Atualiza o carrinho no localStorage
  };

  // Função para calcular o valor total do carrinho
  const calcularValorTotal = () => {
    return carrinho.reduce((total, produto) => total + (produto.value * produto.quantity), 0);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Sorvetes</Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Início
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  Sobre
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              <button
                className="btn btn-outline-dark"
                onClick={() => setShowModal(true)}
              >
                <i className="bi bi-cart" /> Carrinho ({carrinho.length})
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal de Carrinho */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex={-1} aria-labelledby="cartModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="cartModalLabel">Carrinho de Compras</h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                {carrinho.length === 0 ? (
                  <p>O carrinho está vazio!</p>
                ) : (
                  <ul className="list-group">
                    {carrinho.map((produto, index) => (
                      <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{produto.title}</span>
                        <div className="d-flex align-items-center">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => alterarQuantidade(produto.id, produto.quantity - 1)}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            className="form-control mx-2"
                            value={produto.quantity || 1} // Garantir que o valor seja 1 se a quantidade for indefinida
                            min="1"
                            onChange={(e) => alterarQuantidade(produto.id, parseInt(e.target.value) || 1)} // Se o valor for inválido, considera 1
                            style={{ width: "60px" }}
                          />
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => alterarQuantidade(produto.id, produto.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <span className="ms-3">
                          R${(produto.value * produto.quantity).toFixed(2)}
                        </span>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => removerDoCarrinho(produto.id)}
                        >
                          Remover
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="modal-footer">
                <h5>Total: R${calcularValorTotal().toFixed(2)}</h5>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Fechar</button>
                <Link to="/checkout" className="btn btn-primary">Finalizar Compra</Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
