function Input({ label, type = "text", name, value, onChange, placeholder, required = false, error}){
    
    return(

        <div className="input-group">

            {label && (
                <label htmlFor={name}> {label} </label>
            )}

            <input id={name} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required}  />

            {error && (
                <p className="input-error"> {error} </p>
            )}

        </div>
    );
}

export default Input;