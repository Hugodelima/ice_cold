import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
        "Accept": "application/json", 
    }
});


export const fetchProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};

export const fetchProductsByCategory = async (categoryId: string | number) => {
    const response = await api.get(`/products/filter_by_category/${categoryId}`);
    return response.data;
};

export const fetchCategories = async () => {
    const response = await api.get("/categories");
    return response.data;
};