import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        "Accept": "application/json", 
    }
});


// Busca todos os produtos
export const fetchProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};

// Busca todas as categorias
export const fetchCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
};
