import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import "./mix.css"

const Login = () => {


    const [passShow, setPassShow] = useState(false);
    const [cpassShow, setCpassShow] = useState(false);

    const [inpval, setInpval] = useState({
        fname: "",
        email: "",
        password: "",
        cpassword: ""

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


    const addUserData = async(e) => {
        e.preventDefault();
        const { fname, email, password, cpassword } = inpval;

        if (fname === "") {
            alert("Please enter Your Name")
        } else if (email === "") {
            alert("Please enter Your Email");
        } else if (!email.includes("@")) {
            alert("Enter Valid Email")
        } else if (password.length < 6) {
            alert("Password must be of min 6 char")
        } else if (password !== cpassword) {
            alert("Passwoed and Confirm Password Should be same ")
        } else {
            // alert("Sign up successful")


            const data = await fetch("/register",{
            
                method:"POST",
                headers:{
                "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    fname, email, password, cpassword
                })
            
            });

            const res = await data.json();
            // console.log(res);
            if (res.status === 201) {
                alert("User registration done!")
                setInpval({ ...inpval,fname:"", email: "", password: "" ,cpassword: "" });
            }
            if(res.status === 422){
                alert("User already exists")
            }
        }


    }

    return (
        <>
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>Sign up</h1>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Offi  Dolor totam <br />assumenda nobis doloribus quasi facilis eum.</p>
                    </div>

                    <form >

                        <div className="form_input">
                            <label htmlFor="text">Name</label>
                            <input type="text" onChange={setVal} value={inpval.fname} name="fname" id="name" placeholder='Enter Your Name' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="email">Email</label>
                            <input type="email" onChange={setVal} value={inpval.email} name="email" id="email" placeholder='Enter Your Email Address' />
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Password</label>

                            <div className="two">

                                <input type={!passShow ? "password" : "text"} value={inpval.password} onChange={setVal} name="password" id="password" placeholder='Enter Your Password' />
                                <div className="showpass" onClick={() => setPassShow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>
                        <div className="form_input">
                            <label htmlFor="password">Confirm Password</label>

                            <div className="two">

                                <input type={!cpassShow ? "password" : "text"} onChange={setVal} value={inpval.cpassword} name="cpassword" id="cpassword" placeholder='Cofirm Password' />
                                <div className="showpass" onClick={() => setCpassShow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>


                        <button className='btn' onClick={addUserData}>Sign Up</button>
                        <p>Already have an Account? <NavLink to="/">Login Up</NavLink>  </p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login
