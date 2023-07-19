/* eslint-disable no-unused-vars */
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

function Signup() {


    const history = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function submit(e) {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8000/signup", {
                email, password
            })
            .then(res=>{
                if(res.data==="exists"){
                    alert("User already exists");
                }
                else if(res.data === "notexists"){
                    
                    history("/home",{state:{id:email}})
                }
            })
            .catch(e =>{
                alert("wrong details")
                console.log(e);
            })
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <div className='login'>
            <h1>Signup</h1>
            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder='Email' />
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder='Password' />

                <input type="submit" onClick={submit} />
            </form>
            <br />

            <p>OR</p>
            <br />
            <Link to="/">Login Page</Link>
        </div>
    )
}

export default Signup
