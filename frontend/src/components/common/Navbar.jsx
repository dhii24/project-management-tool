import { Link, useNavigate } from "react-router-dom"

import { useAuth } from "../../context/AuthContext";

function Navbar(){

    const { user, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    }


    return (

        <nav className="navbar">
            
            <div className="navbar-logo">
                <Link to="/dashboard">Project Manager</Link>
            </div>

            <div className="navbar-right">
                <Link to="/dashboard">Dashboard</Link>

                {user && (
                    <span className="navbar-user">
                        Welcome, {user.name}
                    </span>
                )}

                <button type="button" onClick={handleLogout}>Logout</button>
            </div>

        </nav>
    );
    
}

export default Navbar;