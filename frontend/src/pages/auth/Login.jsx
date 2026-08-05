import { useState } from "react";

import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

function Login(){

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

        console.log("Validation passed");
        console.log(formData);
    };
    
    return (

        <form onSubmit={handleSubmit}>

            <h1>Login</h1>

            <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" error={errors.email} />
            <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" error={errors.password} />

            <Button type="submit">Login</Button>

        </form>

    );
}

export default Login;