import React from 'react'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

const Form2 = ({ onGetData2 }) => {



    const [resumeFile , setResumeFile] = useState({resume:""});


    const handleSubmit = () => {
        onGetData2(resumeFile);
        console.log('data sent from Form2');
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setResumeFile({ ...resumeFile, resume: base64 });
    }






    return (

        <Form>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select defaultValue="Choose...">
                        <option>Choose...</option>
                        <option>...</option>
                    </Form.Select>
                </Form.Group>
            </Row>

            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>






            <Form.Group className='mb-3' controlId='formGridAddress1' enctype="multipart/form-data">
                <Form.Label>Upload File</Form.Label>
                <input
                    type="file"
                    lable="Resume"
                    name="resumeFile"
                    id='resume-file-upload'
                    accept='.pdf'
                    onChange={(e) => handleFileUpload(e)}
                />
            </Form.Group>




            <Button variant="primary" type="button" onClick={handleSubmit} >
                Submit
            </Button>

        </Form>

    )
}

export default Form2



function convertToBase64(file) {

    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            resolve(fileReader.result)
        };
        fileReader.onerror = (error) => {
            reject(error)

        }
    })

}