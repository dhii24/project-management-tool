import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import authService from "../../services/authService";

import { useAuth } from "../../context/AuthContext";

function Login(){

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { login } = useAuth();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const [serverError, setServerError] = useState("");

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {

        const {name, value} = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const validationErrors = {};

        if(!formData.email.trim()){
            validationErrors.email = 'Email is required';
        }

        if(!formData.password.trim()){
            validationErrors.password = "Password is required";
        }

        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try{

            setLoading(true);

            setServerError("");

            const response = await authService.login(formData);

            console.log("Reached here");
            console.log(response);

            login(response.user, response.accessToken);

            alert(response.message);

            navigate("/dashboard");

        } catch (error) {

            setServerError(
                error.response?.data?.message ||
                "Login failed"
            );

        } finally {
            setLoading(false);
        }
    };
    
    return (

        <form onSubmit={handleSubmit}>

            <h1>Login</h1>

            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" error={errors.email} />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" error={errors.password} />

            {serverError && (
                <p className="input-error">
                    {serverError}
                </p>
            )}

            <Button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</Button>

            <p style={{ marginTop: "16px"}}>
                Don't have an account?{" "}
                <Link to="/register">Register</Link>
            </p>

        </form>

    );
}

export default Login;