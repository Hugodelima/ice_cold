import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [carrinhoCount, setCarrinhoCount] = useState<number>(0);
  const [carrinho, setCarrinho] = useState<any[]>([]); // Usar o tipo adequado para os produtos do carrinho
  const [showModal, setShowModal] = useState<boolean>(false); // Controlar a exibição do modal

  // Função para recuperar o carrinho do localStorage
  const recuperarCarrinho = () => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      const carrinho = JSON.parse(carrinhoSalvo);
      setCarrinho(carrinho);
      setCarrinhoCount(carrinho.length); // Atualiza a quantidade de itens
    }
  };

  // Função para adicionar produto ao carrinho
  const adicionarAoCarrinho = (produto: any) => {
    const carrinhoAtualizado = [...carrinho, { ...produto, quantity: 1 }];
    setCarrinho(carrinhoAtualizado);
    setCarrinhoCount(carrinhoAtualizado.length); // Atualiza a quantidade de itens
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado)); // Atualiza o carrinho no localStorage
  };

  // Função para remover produto do carrinho
  const removerDoCarrinho = (produtoId: number) => {
    const carrinhoAtualizado = carrinho.filter((produto) => produto.id !== produtoId);
    setCarrinho(carrinhoAtualizado);
    setCarrinhoCount(carrinhoAtualizado.length); // Atualiza a quantidade de itens
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado)); // Atualiza o carrinho no localStorage
  };

  // Função para alterar a quantidade de um item no carrinho
  const alterarQuantidade = (produtoId: number, quantidade: number) => {
    const novaQuantidade = Math.max(1, quantidade); // Sempre 1 ou maior

    const carrinhoAtualizado = carrinho.map((produto) =>
      produto.id === produtoId ? { ...produto, quantity: novaQuantidade } : produto
    );

    setCarrinho(carrinhoAtualizado);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado)); // Atualiza o carrinho no localStorage
  };

  // Função para abrir o modal
  const abrirModal = () => {
    setShowModal(true);
  };

  // Função para fechar o modal
  const fecharModal = () => {
    setShowModal(false);
  };

  // Função para calcular o valor total do carrinho
  const calcularValorTotal = () => {
    return carrinho.reduce((total, produto) => total + (produto.value * produto.quantity), 0);
  };

  // Recupera o carrinho ao carregar a página
  useEffect(() => {
    recuperarCarrinho();
  }, []);

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
              {/* Adicione mais links aqui */}
            </ul>
            <div className="d-flex">
              <button
                className="btn btn-outline-dark"
                onClick={abrirModal}
              >
                <i className="bi bi-cart" /> Carrinho ({carrinhoCount})
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Modal de Carrinho */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex={-1} style={{ display: showModal ? 'block' : 'none' }} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Carrinho de Compras</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={fecharModal}></button>
            </div>
            <div className="modal-body">
              {carrinho.length === 0 ? (
                <p>O carrinho está vazio.</p>
              ) : (
                <ul className="list-group">
                  {carrinho.map((produto: any) => (
                    <li key={produto.id} className="list-group-item d-flex justify-content-between align-items-center">
                      <span>{produto.title}</span>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-outline-secondary"
                          onClick={() => alterarQuantidade(produto.id, Math.max(1, produto.quantity - 1))}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          className="form-control mx-2"
                          value={produto.quantity || 1} // Garantir que o valor seja 1 se a quantidade for indefinida
                          min="1"
                          onChange={(e) =>
                            alterarQuantidade(produto.id, parseInt(e.target.value) || 1) // Se o valor for inválido, considera 1
                          }
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
              <span className="fs-5">Total: R${calcularValorTotal().toFixed(2)}</span>
              <button type="button" className="btn btn-secondary" onClick={fecharModal}>Fechar</button>
              <Link to="/checkout" className="btn btn-primary">Finalizar Compra</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
