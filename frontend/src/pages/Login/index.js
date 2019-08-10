import React from "react";

import './index.css';
import logo from '../../assets/logo.svg';

export default function Login(){
    return(
        <div className="login-container">
            <form>
                <img src={logo} alt="Tindev"/>
                <input type="text" placeholder="Digite seu usuário no GitHub"/>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}