function Button({ children, onClick, type = "button" }){

    return (
        <button type={type} onClick={onclick}> {children} </button>
    );
    
}

export default Button;