import React, { useState, forwardRef, useImperativeHandle } from 'react'
import '../dashboard.css'

const DotRectangle = forwardRef(({ setActiveForm, index }, ref) => {

    // const setActiveForm = props;
    // const [isActive, setIsActive] = useState(false);
    const [isGrowing, setIsGrowing] = useState(false);
    const [isShow, setIsShow] = useState(index === 3 ? true : false);
    const [isActive, setIsActive] = useState(index === 0 ? true : false);

    const handleMenuToggle = () => {

        setIsActive(true);
        // setIsActive((prevState) => !prevState);
    }

    const handleShow = () => {
        setIsActive((prevState) => !prevState);
        switch (index) {
            case 0:
                setActiveForm('Form1')
                break;
            case 1:
                setActiveForm("Form2");
                break;
            case 2:
                setActiveForm("Form3");
                break;
            case 3:
                setActiveForm("Form4");
                break;
            default:
                // setActiveForm("Form1");
                break;
        }
        // handleClick();
    };


    // const [isGrowing, setIsGrowing] = useState(false);

    const handleClick = () => {
        setIsGrowing(true);
        // setIsGrowing((prevState) => !prevState);

    };


    useImperativeHandle(ref, () => ({
        handleClick: handleClick,
        handleMenuToggle: handleMenuToggle

    }));


    return (
        <div className="box">

            <span className={`dot ${isActive ? 'active' : ''} `} onClick={handleShow}></span>
            <div className={`rect ${isShow ? 'off' : ''}`}>
                <span className="rectangle"></span>
                <span className={`cpy ${isGrowing ? 'grow' : ''}`}></span>
            </div>
        </div>



    )
});

export default DotRectangle
