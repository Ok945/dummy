import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import avatar from './profile.png'

import './form.css'


const Form4 = ({onImageChange}) => {

    const [postImage, setPostImage] = useState({ profilephoto: "" })


    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setPostImage({ ...postImage, profilephoto: base64 })
    }
    const handleSubmit = () =>{
        onImageChange(postImage);
        console.log("data sent form 4")
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

            <Form.Group className="mb-3" >
                <Form.Label>upload Photo</Form.Label>
                <img src={postImage.profilephoto || avatar} alt="upload" className='img_box' />
                <input
                    type="file"
                    lable="Image"
                    name="myFile"
                    id='file-upload'
                    accept='.jpeg, .png, .jpg'
                    onChange={(e) => handleFileUpload(e)}
                />

            </Form.Group>
            <Button variant="primary" type="button" onClick={handleSubmit} >
                Submit
            </Button>
        </Form>
    )
}

export default Form4



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