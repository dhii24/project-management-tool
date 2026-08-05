import { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

function Register(){

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        
        const {name, value} = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
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

        console.log("Validation password");
        console.log(formData);
    };

    return (

        <form onSubmit={handleSubmit}>

            <h1>Register</h1>

            <Input label="Name" type="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" error={errors.name} />
            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" error={errors.email} />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" error={errors.password} />
            <Input label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm your password" error={errors.confirmPassword} />

            <Button type="submit">Register</Button>

            <p style={{ marginTop: "16px" }}>
                Already have an account?{" "}
                <Link to="/">Login</Link>
            </p>
        </form>
    );
}

export default Register;