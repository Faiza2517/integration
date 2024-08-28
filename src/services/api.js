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