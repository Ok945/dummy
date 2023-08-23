import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';
import { ToastContainer, toast } from 'react-toastify';



import { FaHome, FaUser, FaComment, FaCog, } from 'react-icons/fa';
import axios from 'axios'

import './dashboard.css'
import Form1 from './assests/Form1';
import Form2 from './assests/Form2';
import Form3 from './assests/Form3';
import Form4 from './assests/Form4';



import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';




const Dashboard = () => {

    // Authorization of the user.---------------------------------------------------------------------------------

    const { logindata, setLoginData } = useContext(LoginContext);

    const [data, setData] = useState(false);


    const history = useNavigate();

    const DashboardValid = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/validuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token
            }
        });

        const data = await res.json();

        if (data.status == 401 || !data) {
            history("*");
        } else {
            // console.log("user verify");
            setLoginData(data)
            history("/dash");
        }
    }


    useEffect(() => {
        setTimeout(() => {
            DashboardValid();
            setData(true)
        }, 2000)

    }, [])



    /* *//* *//* *//* */  /*/* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* */

    //   ------------------        Storage of various forms -----------------





    const [activeIndex, setActiveIndex] = useState(0);
    const [activeBox, setActiveBox] = useState(<Form1 />)

    const [inputValues, setInputValues] = useState({
        fname: "",
        lname: "",
        email: "",
        resume:"",
    })


    const setVal = (e) => {
        // console.log(e.target.value);

    };

    const collectDataOfForm = (data) => {

        const { fname, lname } = data;

        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            fname: fname,
            lname: lname,
        }));

        setActiveBox(<Form2 onGetData2={collectDataOfForm2} />);

    }


    const collectDataOfForm2 = (data) => {

        const resume = data;

        setInputValues((prevInputValues) => ({

            ...prevInputValues,
            resume:resume,
        }));

        

    }

    const collectDataOfForm4 = (data) => {
        const { profilephoto } = data;
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            profilephoto: profilephoto,
        }));


    }




    console.log(inputValues)




    //    /* *//* *//* *//* */  /*/* *//* *//* *//* *//*-------------- final submit btn function ------------------ *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* 













    const createPost = async (inputValues) => {

        try {
            const response = await fetch("/dash", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(inputValues),
            });

            const data = await response.json();
            // console.log(data);

            // setTimeout(() => {
            //     window.location.reload();
            // }, 4000);
            toast.success("Registration Successfully done 😃!", {
                position: "top-center"
            });
        } catch (error) {
            console.error("Error creating post:", error);
        }
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = logindata.ValidUserOne.email;
        setInputValues((prevInputValues) => ({
            ...prevInputValues,
            email: email
        }));
        createPost(inputValues);
    };





    /* *//* *//* *//* */  /*/* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* *//* */

    // // ---------------------- Animation of the forms and the side navBar --------------------




    // Sample data for the list items
    const list = [
        { icon: <FaHome />, title: 'info', page: <Form1 /> },
        { icon: <FaUser />, title: 'academic', page: <Form2 /> },
        // { icon: <FaComment />, title: 'intership', page: <Form3 /> },
        // { icon: <FaCog />, title: 'doc', page: <Form4 /> },
    ];

    const dataBoxHandler = () => {
        switch (activeIndex) {
            case 0:
                setActiveBox(<Form1 onGetData={collectDataOfForm} />);
                break;
            case 1:
                setActiveBox(<Form2 onGetData2={collectDataOfForm2} />);
                break;
            case 2:
               setActiveBox(<Form3 />);
             break;
            // case 3:
            // setActiveBox(<Form4 onImageChange={collectDataOfForm4} />);
            // break;
            default:
                setActiveBox(<Form1 />);
        }
    };

    useEffect(() => {
        dataBoxHandler(); // Call the function when item.title changes
    }, [activeIndex]);


    const handleListClick = (index) => {
        setActiveIndex(index);
    };

    console.log(activeIndex);


    return (
        <div className='profile_page'>
            <form onSubmit={handleSubmit}>
                <div className="navigation">
                    <ul>
                        {list.map((item, index) => (
                            <li
                                key={index}
                                className={`list ${index === activeIndex ? 'active' : ''}`}
                                onClick={() => handleListClick(index)}
                            >
                                <b></b>
                                <b></b>
                                <a href="#">
                                    <span className="icon">{item.icon}</span>
                                    <span className='title'>{item.title}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="form_container">
                    <span>{activeBox}</span>
                    {
                        activeIndex === 1 ?
                            <button style={{ position: 'relative', top: '90px' }} type="submit">Final Submit</button> : <></>
                    }
                </div>



            </form>
        </div>


    )
}

export default Dashboard
