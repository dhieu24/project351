import React from "react";
import axios from 'axios'
import {useForm, Controller} from 'react-hook-form'
import './signup.css'
import {Link, useNavigate, NavLink} from 'react-router-dom'

export default function Login(){
    const {register, formState: {errors}, handleSubmit} = useForm({
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
        mode: onchange
    })

    const navigate = useNavigate();

    const onSubmit = async (values) => {
        console.log(values)
        const {name, username, email, password} = values;
        console.log(name)
        console.log(username)
        console.log(email)
        console.log(password)
        try {
            const res = await axios({
                url: 'http://localhost:8000/api/auth/register',
                method: 'post',
                data: {
                    name,
                    username,
                    email,
                    password
                }
            });
            if(res.data.success){
                console.log(res.data)
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="Login container-fluid" style={{background: '#fafafa'}}>
            <div className="vh-100 justify-content-md-center align-items-center row">
                <div className="col-md-4 col-12">
                    <div className="card-wrapper p-4">
                        <form className="" 
                        onSubmit={handleSubmit(onSubmit)} 
                        autoComplete="off" >
                            <h4>Register</h4>
                            <div className="mb-4">
                                <div className="form-group">
                                    <input name="name" 
                                        placeholder="Enter your Name" 
                                        className="form-control" 
                                        type="text"
                                        {...register('name', {required: true})}>
                                    </input>
                                </div>
                                <div className="form-group">
                                    <input name="username" 
                                        placeholder="Enter your Username" 
                                        className="form-control" 
                                        type="text" 
                                        {...register('username', {required: true})}>
                                    </input>
                                </div>
                                <div className="form-group">
                                    <input 
                                        name="email" 
                                        placeholder="Enter your email"  
                                        className="form-control" 
                                        {...register('email', {required: true})}>
                                    </input>
                                </div>
                                {errors?.username?.type === 'password' && <p>Username should be specified</p>}
                                <div className="form-group">
                                    <input name="password" 
                                        placeholder="Enter your password" 
                                        className="form-control" 
                                        type="password" 
                                        {...register('password', {minLength: 6})}>
                                    </input>
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="card-wrapper mt-4 p-3">
                <div>
                    Have an account? <a href="/login">Login</a>
                </div>
            </div>
        </div>
    );
} 