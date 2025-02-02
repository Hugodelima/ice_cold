import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/api"; 

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [loginData, setLoginData] = useState<LoginData>({ email: "", password: "" });
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const user = await loginUser(loginData.email, loginData.password);

      if (user) {
        localStorage.setItem("user_id", user.id); 
        navigate("/"); 
      }
    } catch (error) {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-primary w-100">
              Entrar
            </button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Não tem uma conta? <a href="/signup">Cadastre-se</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
