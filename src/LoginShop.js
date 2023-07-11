import React, { useEffect } from "react";
import "./LoginShop.css";
import { useNavigate } from "react-router-dom";

const LoginShop = () => {
    const navigate = useNavigate();
    return (
        <div className="page">
            <div className="cover">
                <h1>Login</h1>
                <input type="text" placeholder="username" />
                <input type="password" placeholder="password" />
                <div>
                    <button className="login-btn" onClick={() => { navigate("/dashbodar") }}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginShop;