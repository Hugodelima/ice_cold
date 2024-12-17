

function Home() {

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Navbar</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Início</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Menu</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/about">Sobre</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <main>
                <div id="carouselSabores" className="carousel slide mt-5" data-bs-ride="carousel">
                    {/*
                        <div className="carousel-inner">
                            {sabores.map((sabor, index) => (
                                <div key={sabor.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img src={sabor.imagemUrl} className="d-block w-100"  />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5>{sabor.nome}</h5>
                                        <p>{sabor.descricao}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    */}
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselSabores" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Antes</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselSabores" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Depois</span>
                    </button>
                </div>

                <div className="container">
                    <h2>Tradicionais</h2>
                </div>

                <div className="container">
                    <h2>Premium</h2>
                </div>

                <div className="container">
                    <h2>Veganos</h2>
                </div>
            </main>
        </>
        
    )
}

export default Home;
