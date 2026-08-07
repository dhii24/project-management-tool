import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

import authService from "../../services/authService";

function Register(){

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

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

        if(!formData.name.trim()){
            validationErrors.name = "Name is required";
        }

        if(!formData.email.trim()){
            validationErrors.email = "Email is required";
        }

        if(!formData.password.trim()){
            validationErrors.password = "Password is required";
        }

        if(!formData.confirmPassword.trim()){
            validationErrors.confirmPassword = "confirmPassword is required";
        }

        if(formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword){
            validationErrors.confirmPassword = "Passwords do not match";
        }

        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try{
            setLoading(true);

            setServerError("");

            const userData = {
                name: formData.name,
                email: formData.email,
                password: formData.password
            };

            const response = await authService.register(userData);

            alert(response.message);

            navigate("/");

        } catch (error) {

            setServerError(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {
            setLoading(false);
        }
    };

    return (

        <form onSubmit={handleSubmit}>

            <h1>Register</h1>

            <Input label="Name" type="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" error={errors.name} />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" error={errors.email} />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" error={errors.password} />
            <Input label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" error={errors.confirmPassword} />

            {serverError && (
                <p className="input-error"> {serverError} </p>
            )}

            <p style={{ marginTop: "16px" }}>
                Already have an account?{" "}
                <Link to="/">Login</Link>
            </p>

            <Button type="submit" disabled={loading}> {loading ? "Registering..." : "Register"} </Button>
            
        </form>
    );
}

export default Register;