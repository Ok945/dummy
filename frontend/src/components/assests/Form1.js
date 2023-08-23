import React, { useRef, useState, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { LoginContext } from '../ContextProvider/Context';


const Form1 = ({ onGetData }) => {

    const { logindata, setLoginData } = useContext(LoginContext);
    const [inputValues, setInputValues] = useState({
        fname: "",
        lname: "",
    })


    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInputValues(prevInputValues => ({
            ...prevInputValues,
            [name]: value
        }));
    };

    const handleSubmit = () => {

        onGetData(inputValues)
        console.log("datas sent form 1")

    }

    return (
        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridFname">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" name='fname' onChange={setVal} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridLname">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name" name='lname' onChange={setVal} />
                </Form.Group>
            </Row>

            <Button variant="primary" type="button" onClick={handleSubmit}>
                next
            </Button>
        </Form>

    )
}

export default Form1
