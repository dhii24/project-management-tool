import api from "./api";

const register = async (userData) => {
    
    const response = await api.post(
        "/users/register",
        userData
    );
    
    return response.data;
    
};

const login = async (userData) => {

    const response = await api.post(
        "/users/login",
        userData
    );

    return response.data;

};

export default { register, login };