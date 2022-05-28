import React from "react";
import Button from 'react-bootstrap/Button';
import axios from "axios";

export default function CreatePropertyComponent (props){

    const handleDeletion=(event)=>{
        let accessToken="key0tmrhslNPTkTEG"
        const url = `https://api.airtable.com/v0/appLszvxylTgt2eT1/PropertyDetails/${event.target.id}`;
        const config = {headers: { Authorization: `Bearer ${accessToken}` }}
         axios.delete(url, config)
          .then(res => {
              console.log(res.data)
              props.reloadAfterDelete(true)
            })
            .catch(err=>console.log(err));
    } 

        return(
            <tr>
                <td>{props.properties.name}</td>
                <td>{props.properties.description}</td>
                <td>{props.properties.size}</td>
                <td><Button id={props.keys} variant='danger' size='sm' onClick={handleDeletion} style={{ float:"center", margin:"1%"}} >Delete</Button></td>
            </tr>
        );
    }