import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';




const Form3 = ({ onBtnClick }) => {
    return (

        
        <Button variant="primary" type="button" onClick={onBtnClick}>
            Next
        </Button>

    )
}

export default Form3
