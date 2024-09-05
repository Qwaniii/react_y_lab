import React, { useEffect, useState } from 'react';
import "../Auth/auth.css"
import { useForm } from 'react-hook-form';
import api from "../Api"


export default function Auth() {

    const [user, setUser ] = useState("");
    const [isAuth, setIsAuth] = useState(false)

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        mode: "onSubmit",
        defaultValues: {
          email: "", 
          password: "",
        }
      });

    // useEffect(() => {
    //     api.getUsers("1")
    //         .then((data) => {
    //         console.log(data)
    //         })
    // }, [])

    useEffect(() => {
        reset()
      }, [reset])

    function authSend() {
        let random = Math.ceil(Math.random() * 10)
        api.getUsers(random)
            .then((data) => {
                console.log(data)
                setUser(data.name)
                setIsAuth(true)
            })
    }

    function exit() {
        reset()
        setIsAuth(false)
    }

    return ( 
        <>
            <div className='auth-container'>
                {!isAuth ? 
                (<>
                <h3>
                    Авторизация
                </h3>
                <form className='auth-form' action='auth-login' onSubmit={handleSubmit(authSend)}>
                    <div className="auth-login_email">
                        <input id="email" type="text" className='login' placeholder=" " defaultValue = {watch("email")} {...register("email", {
                            required: "Введите email", 
                                pattern: {
                                    value: /^\S+@\S+\.\S+$/,
                                    message: "Введите корректный email"
                                }   
                            })}></input>
                        <label htmlFor="email" className='auth-label_email'>E-mail</label>
                        {errors?.email && <span className='error'>*{errors?.email?.message}</span>}
                    </div>
                    <div className='auth-login_email'>
                        <input id="password" type="password" className='login' placeholder=" " defaultValue = {watch("password")}  {...register("password", {
                            required: "Введите пароль", 
                                minLength: {
                                value: 5, 
                                message: "Введите больше 5 знаков"
                                }
                        })}></input>
                        <label htmlFor="password" className='auth-label_email'>Пароль</label>
                        {errors?.password && <span className='error'>*{errors?.password?.message}</span>}
                    </div>                                
                    <input type="submit" className='auth-enter' value="Войти"></input>
                </form>
                </>
                )
                : 
                (
                <>
                <div className='auth-form'>
                    <h3>
                        Привет, {user}
                    </h3>
                    <input type="submit" className='auth-enter' value="Выйти" onClick={exit}></input>
                    </div>
                </>)
                }

            </div>
        </>
     );
}