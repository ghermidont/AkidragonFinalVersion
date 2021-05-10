import React, {useState} from 'react';
import logo from "../assets/images/src/DragonLogo.png";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const appStyle = {
    height: '250px',
    display: 'inline-block',
    paddingTop: '20em',
    paddingBottom: "20em",
    position: 'fixed',
    top: '20%',
    left: '50%',
    transform: "translate(-50%, -50%)"
};

const formStyle = {
    margin: 'auto',
    padding: '10px',
    border: '2px solid #430F6B',
    borderRadius: '5px',
    background: '#f5f5f5',
    width: '220px',
    display: 'block',
    color: '#3085d6'
};

const submitStyle = {
    margin: '10px 0 0 0 ',
    padding: '7px 10px ',
    border: '1px solid #430F6B ',
    borderRadius: '3px ',
    background: '#3085d6',
    width: '100% ',
    fontSize: '15px ',
    color: 'blue '
};

const schema = yup.object().shape({
    email:
        yup
            .string()
            .email()
            .required(),
    password:
        yup
            .string()
            .required('No password provided.')
});

export default function FirstLoginForm ({setLoginPassed}) {
    console.log("firstLoginForm()");

    const[displayErrorMessage, setDisplayErrorMessage] = useState('');
    const { register, handleSubmit, formState:{ errors } } = useForm(
        {
        resolver: yupResolver(schema)
    });

    const email = process.env.REACT_APP_UN;
    const password = process.env.REACT_APP_PS;

    const checkPassword = (data) => {
        if(email === data.email && password === data.password){
            setLoginPassed(true);
            setDisplayErrorMessage('false');
        }else{
            setDisplayErrorMessage('true');
        }
    }

    return (
        <div style={appStyle}>
            <img className="header__img" style={{ display: 'block ',  margin: 'auto'}} src={logo} alt="Akidragon"/>
            <br/>
            <h2 className="title info__title">
                <span>aki</span>dragon<br/>
                site under construction
            </h2>
            <form style={formStyle} onSubmit={handleSubmit(checkPassword)} >
                {displayErrorMessage&&<p style={{backgroundColor: "red", alignSelf: "center"}}>You provided wrong credentials!!</p>}
                <label htmlFor="#username">Username</label>
                <input
                    {...register("email")}
                    id="username"
                    style={{ border: '1px solid #430F6B', marginBottom: '1em'}}
                    type="email"
                />
                    <p>{errors.email?.message}</p>
                <label htmlFor="#password">Password</label>
                <input
                    {...register("password")}
                    id="password"
                    style={{ border: '1px solid #430F6B'}}
                    type="password"
                />
                <p>{errors.password?.message}</p>
                <div>
                    <button style={submitStyle} type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}