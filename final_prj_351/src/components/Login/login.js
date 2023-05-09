import React from "react";
import axios from 'axios'
import {useForm, Controller} from 'react-hook-form'
import './login.css'
import {Link, useNavigate, NavLink} from 'react-router-dom'

export default function Login(){
    const {register, formState: {errors}, handleSubmit} = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: onchange
    })

    const navigate = useNavigate();

    const onSubmit = async (values) => {
        console.log(values)
        const {email, password} = values;
        console.log(email)
        console.log(password)
        try {
            const res = await axios({
                url: 'http://localhost:8000/api/auth/login',
                method: 'post',
                data: {
                    email,
                    password
                }
            });
            if(res.data.success){
                const data = res.data
                console.log(data)
                localStorage.setItem('name', data.name);
                localStorage.setItem('username', data.username);
                localStorage.setItem('email', data.email);

                navigate('/home')
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
                            <h4>Login</h4>
                            <div className="mb-4">
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
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className="card-wrapper mt-4 p-3">
                <div>
                    Haven't registered yet? <a href="/signup">Sign up here</a>
                </div>
            </div>
        </div>
    );
} 