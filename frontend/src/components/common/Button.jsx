function Button({ children, onClick, type = "button", disabled = false }){

    return (
        <button type={type} onClick={onclick} disabled={disabled}> {children} </button>
    );
    
}

export default Button;