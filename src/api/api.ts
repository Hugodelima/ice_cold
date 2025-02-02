import axios from "axios";
import bcrypt from "bcryptjs";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  headers: {
    "Accept": "application/json",
  },
});


export const fetchCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao carregar as categorias.");
  }
};

export const fetchProductsByCategory = async (categoryId: string | number) => {
  try {
    const response = await api.get(`/products/filter_by_category/${categoryId}`);
    return response.data;
  } catch (error) {
    throw new Error("Erro ao carregar os produtos por categoria.");
  }
};


export const fetchProducts = async () => {
  try {
    const response = await api.get("/products");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao carregar os produtos.");
  }
};


export const createAddress = async (addressData: {
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  zip_code: string;
}) => {
  try {
    const response = await api.post("/addresses", { address: addressData });
    return response.data; 
  } catch (error) {
    throw new Error("Erro ao criar o endereço.");
  }
};


export const createUser = async (userData: {
  name: string;
  email: string;
  password: string;
  gender: string;
  role: string;
  address_id: number;
}) => {
  try {
    const response = await api.post("/users", { user: userData });
    return response.data; 
  } catch (error) {
    throw new Error("Erro ao criar o usuário.");
  }
};


export const loginUser = async (email: string, password: string) => {
    try {

      const response = await api.get("/users");
      const user = response.data.find((user: { email: string; password_digest: string }) => user.email === email);

      console.log(user);
      
  
      if (!user) {
        throw new Error("Credenciais inválidas.");
      }
  
      const isPasswordValid = bcrypt.compareSync(password, user.password_digest);
      console.log(isPasswordValid);
      
      if (!isPasswordValid) {
        throw new Error("Credenciais inválidas.");
      }
  
      return user; 
    } catch (error) {
      throw new Error("Erro ao realizar login.");
    }
  };

export const createRate = async (rateData: {
  star: number;
  comment: string;
  user_id: number;
  product_id: number;
}) => {
  try {
    const response = await api.post("/rates", { rate: rateData });
    return response.data; 
  } catch (error) {
    throw new Error("Erro ao criar avaliação.");
  }
};


export const createSale = async (saleData: {
  amount: number;
  sale_date: string;
  user_id: number;
  sale_products_attributes: Array<{
    product_id: number;
    quantity: number;
    rated: boolean;
  }>;
}) => {
  try {
    const response = await api.post("/sales", { sale: saleData });
    return response.data; 
  } catch (error) {
    throw new Error("Erro ao criar venda.");
  }
};


export const fetchSales = async () => {
  try {
    const response = await api.get("/sales");
    return response.data; 
  } catch (error) {
    throw new Error("Erro ao carregar as vendas.");
  }
};


export const fetchUser = async (userId: number) => {
  try {
    const response = await api.get(`/users/${userId}`);
    return response.data; 
  } catch (error) {
    throw new Error("Erro ao carregar os dados do usuário.");
  }
};


export const fetchProductDetails = async (productId: number) => {
  try {
    const response = await api.get(`/products/${productId}`);
    return response.data; 
  } catch (error) {
    throw new Error("Erro ao carregar os detalhes do produto.");
  }
};


export const updateUser = async (userId: number, userData: object) => {
  try {
    const response = await api.put(`/users/${userId}`, { user: userData });
    return response.data; 
  } catch (error) {
    throw new Error("Erro ao atualizar os dados do usuário.");
  }
};

export const createRating = async (rateData: {
  star: number;
  comment: string;
  user_id: number;
  product_id: number;
}) => {
  try {
    const response = await api.post("/rates", { rate: rateData });
    return response.data; 
  } catch (error) {
    throw new Error("Erro ao criar avaliação.");
  }
};

