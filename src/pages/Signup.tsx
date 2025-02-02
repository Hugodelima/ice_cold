import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAddress, createUser } from "../api/api"; 

interface AddressData {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  zip_code: string;
}

interface UserData {
  name: string;
  email: string;
  password: string;
  gender: string;
  role: string;
  address_id: number;
}

const Signup = () => {
  const [addressData, setAddressData] = useState<AddressData>({
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    zip_code: "",
  });

  const [userData, setUserData] = useState<UserData>({
    name: "",
    email: "",
    password: "",
    gender: "Male",  
    role: "",
    address_id: 0, 
  });

  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const history = useNavigate();


  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressData((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const createAddressAndUser = async () => {
    try {
      const addressResponse = await createAddress(addressData);


      const newUser = { ...userData, address_id: addressResponse.id };
      const userResponse = await createUser(newUser);


      setSuccessMessage("Cadastro realizado com sucesso! Agora você pode fazer login.");


      setTimeout(() => {
        history("/login");
      }, 2000); 
    } catch (error) {
      setError("Erro ao criar o cadastro. Tente novamente.");
    }
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); 
    setSuccessMessage(""); 

    createAddressAndUser();
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <h2 className="text-center mb-4">Cadastro</h2>
          <form onSubmit={handleSubmit}>
            {/* Endereço */}
            <h4>Endereço</h4>
            <div className="mb-3">
              <label htmlFor="street" className="form-label">
                Rua
              </label>
              <input
                type="text"
                className="form-control"
                id="street"
                name="street"
                value={addressData.street}
                onChange={handleChangeAddress}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="number" className="form-label">
                Número
              </label>
              <input
                type="text"
                className="form-control"
                id="number"
                name="number"
                value={addressData.number}
                onChange={handleChangeAddress}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="neighborhood" className="form-label">
                Bairro
              </label>
              <input
                type="text"
                className="form-control"
                id="neighborhood"
                name="neighborhood"
                value={addressData.neighborhood}
                onChange={handleChangeAddress}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                Cidade
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={addressData.city}
                onChange={handleChangeAddress}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="zip_code" className="form-label">
                CEP
              </label>
              <input
                type="text"
                className="form-control"
                id="zip_code"
                name="zip_code"
                value={addressData.zip_code}
                onChange={handleChangeAddress}
                required
              />
            </div>

            {/* Usuário */}
            <h4>Usuário</h4>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChangeUser}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChangeUser}
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
                value={userData.password}
                onChange={handleChangeUser}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="gender" className="form-label">
                Gênero
              </label>
              <select
                id="gender"
                name="gender"
                className="form-control"
                value={userData.gender}
                onChange={handleChangeUser}
                required
              >
                <option value="Male">Masculino</option>
                <option value="Female">Feminino</option>
                <option value="Other">Outro</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="role" className="form-label">
                Cargo
              </label>
              <input
                type="text"
                className="form-control"
                id="role"
                name="role"
                value={userData.role}
                onChange={handleChangeUser}
                required
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <button type="submit" className="btn btn-primary w-100">
              Criar Conta
            </button>
          </form>
          <div className="mt-3 text-center">
            <p>
              Já tem uma conta? <a href="/login">Faça login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
