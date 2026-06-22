import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Slidebar() {
    const [loggedin, setLoggedin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const email = localStorage.getItem('workerEmail');
        if (email) {
            setLoggedin(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('workerEmail');
        setLoggedin(false);
        navigate('/login');
    };

    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <h2>🏗️ IHR BuildTrack</h2>
            </div>

            <nav className="sidebar-nav">
                <Link to="/" className="nav-item">
                    <span className="nav-icon">🏠</span>
                    <span className="nav-text">Dashboard</span>
                </Link>
                <Link to="/materials" className="nav-item">
                    <span className="nav-icon">🧱</span>
                    <span className="nav-text">Materials</span>
                </Link>
                <Link to="/expenses" className="nav-item">
                    <span className="nav-icon">💰</span>
                    <span className="nav-text">Expenses</span>
                </Link>
                <Link to="/timeline" className="nav-item">
                    <span className="nav-icon">📅</span>
                    <span className="nav-text">Timeline</span>
                </Link>
                <Link to="/workers" className="nav-item">
                    <span className="nav-icon">👷</span>
                    <span className="nav-text">Workers</span>
                </Link>
            </nav>

            <div className="sidebar-footer">
                {loggedin ? (
                    <button onClick={handleLogout} className="nav-item logout-btn">
                        <span className="nav-icon">🚪</span>
                        <span className="nav-text">Logout</span>
                    </button>
                ) : (
                    <Link to="/login" className="nav-item">
                        <span className="nav-icon">🔐</span>
                        <span className="nav-text">Login</span>
                    </Link>
                )}
            </div>
        </div>
    );
}

export default Slidebar;