import React, { useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom"
// import { ToastContainer, toast } from 'react-toastify'
import "./mix.css"





const Login = () => {








    const [passShow, setPassShow] = useState(false);


    const [inpval, setInpval] = useState({
        email: "",
        password: ""

    })


    const setVal = (e) => {
        // console.log(e.target.value);

        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }

        })

    };

    const history = useNavigate();



    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = inpval;

        if (email === "") {
            alert("Please enter Your Email");
        } else if (!email.includes("@")) {
            alert("Enter Valid Email")
        } else if (password.length < 6) {
            alert("Password must be of min 6 char")
        } else {
            // console.log("login successful");


            const data = await fetch("/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email, password
                })
            });

            const res = await data.json();

            if (res.status === 201) {
                history("/dash")
                setInpval({ ...inpval, email: "", password: "" });
            }

            if(res.status === 422){
                alert("Password is invalid")
            }
        }


    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Welcome</h1>
                        <p>Lorem ipsum, Delectus labore at non atque optio ipsum.</p>
                    </div>

                    <form >
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>

                            <div className="two">

                                <input type={!passShow ? "password" : "text"} onChange={setVal} value={inpval.password} name="password" id="password" placeholder='Enter Your Password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={loginUser}>Login</button>
                        <p>Don't have an Account? <NavLink to='/register'>Sign Up</NavLink> </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login
