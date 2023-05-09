import React from "react";
import {useForm, Controller} from 'react-hook-form'
import {Link, useNavigate, NavLink} from 'react-router-dom'
import './user.css'
import NavbarStock from "../Navbar/navbarstock";

export default function User(){
    return (
        <div>
            <NavbarStock/>
            <h1 className="name">{localStorage.getItem('name')}</h1>
            <div className="user-info">
                <p className="user-username"><strong>Username:</strong>{localStorage.getItem('username')}</p>
                <p className="user-email"><strong>Email:</strong>{localStorage.getItem('email')}</p>
            </div>
        </div>
    );

}