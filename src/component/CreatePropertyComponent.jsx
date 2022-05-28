import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from "axios";
import { useNavigate } from 'react-router-dom'


export default function CreatePropertyComponent(props){

      const [name,setName] = useState();
      const [description,setDescription] = useState()
      const [size, setSize] = useState()        

      const onChangeName=(e)=>{
        setName(e.target.value);
      }

      const onChangeDescription=(e)=>{
        setDescription(e.target.value)
      }

      const onChangeSize=(e)=>{
        setSize(e.target.value)
      }

      const onSubmit=(e)=>{
        e.preventDefault()
        const propertyObject = {
          fields:{
          name: name,
          description: description,
          size: size
          },
          typecast:true
        };
        let accessToken="key0tmrhslNPTkTEG"
        const url = "https://api.airtable.com/v0/appLszvxylTgt2eT1/PropertyDetails";
        const config = {headers: { Authorization: `Bearer ${accessToken}` }}
        axios.post(url, propertyObject, config)
          .then(res => {
            console.log(res.data)
            props.reload(true)
          })
          .catch(err => {
             console.log(err)
             props.reload(false)
          });
      }

    return (<div class="form-wrapper" style={{padding:"5%"}}>
      <h4>Add new property</h4>
      <Form onSubmit={onSubmit}>
      <div className="row">
        <div className="col">
        <Form.Group controlId="Name">
          <Form.Label style={{textAlign:"left",display: "block"}}>Name</Form.Label>
          <Form.Control type="text" value={name} onChange={onChangeName}/>
        </Form.Group>
        </div>
        <div className="col">
        <Form.Group controlId="Size" className="col">
          <Form.Label style={{textAlign:"left",display: "block"}}>Size</Form.Label>
          <Form.Control type="number" value={size} onChange={onChangeSize}/>
        </Form.Group>
        </div>
        </div>
        <div class="row">
        <Form.Group controlId="Description">
          <Form.Label style={{textAlign:"left",display: "block"}}>Description</Form.Label>
          <Form.Control type="text" value={description} onChange={onChangeDescription}/>
        </Form.Group>
        </div>
        <Button variant="primary" size="md" block="block" type="submit" className="mt-4">
          Create Property
        </Button>
      </Form>
    </div>
    );
  }
