import axiosinstance from "./axiosinstance";
import {setToken} from "./Auth";

//Register a new user

export const registerUser= async (userData) =>{
    try{
        const response = await axiosinstance.post("register", userData);
        if(response.data.token){
            setToken(response.data.token);
        }
        return response.data;
    }catch(error){
        console.error("Registration Error:", error);
        throw error;
    }
};
//login user
export const LoginUser= async (userData) =>{
    try{
        const response = await axiosinstance.post("login", userData);
        if(response.data.token){
            setToken(response.data.token);
        }
        return response.data;
    }catch(error){
        console.error("Login Error:", error);
        throw error;
    }
};
// Fetch the current user's data
export const fetchUserData = async () => {
    try {
        const response = await axiosinstance.get("user");
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};
// user update data
export const updateUserData = async (userData) => {
    try {
        const response = await axiosinstance.post('/user/update', userData);
        return response.data;
    } catch (error) {
        console.error("Error updating user data:", error);
        throw error;
    }
};

//fetch the product list
export const getProductList = async () => {
    try {
        const response = await axiosinstance.get("products");
        return response.data;

    } catch (error) {
        console.error("Error fetching product list:", error);
        throw error;
    }
};
//fetch the single product
export const getProductDetail = async (id) => {
    try {
        const response = await axiosinstance.get(`products/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Log detailed error information
            console.error("Error response:", error.response.data);
            throw new Error(`Error: ${error.response.data.message || "Invalid request"}`);
        } else {
            console.error("Error fetching product detail:", error.message);
            throw new Error("Failed to fetch product details.");
        }
    }
};

//fetch the oder list
export const getOrderList = async () => {
    try {
        const response = await axiosinstance.get("orders");
        return response.data;
    } catch (error) {
        console.error("Error fetching order list:", error);
        throw error;
    }
};

//add the order
export const addOrder = async (orderData) => {
    try {
        const response = await axiosinstance.post("orders", orderData);
        return response.data;
    } catch (error) {
        console.error("Error adding order:", error.response ? error.response.data : error.message);
        throw error;
    }
};
// fetch the order details
export const getOrderDetail = async (id) => {
    try {
        const response = await axiosinstance.get(`orders/${id}`);
        return response.data;
    } catch (error) {
        if (error.response) {
            // Log detailed error information
            console.error("Error response:", error.response.data);
            throw new Error(`Error: ${error.response.data.message || "Invalid request"}`);
        } else {
            console.error("Error fetching orders detail:", error.message);
            throw new Error("Failed to fetch orders details.");
        }
    }
};
