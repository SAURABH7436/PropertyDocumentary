import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
import CreatePropertyComponent from './CreatePropertyComponent';
import Button from 'react-bootstrap/Button';
import ViewCard from './ViewCard';
import {
  MDBContainer,
  MDBBtn,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter
} from 'mdbreact';

class ViewComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
          properties: [],
          modal:false
        };
      }

      reload = (flag) => {
        this.fetchData(flag);
        this.toggle();
      }

      reloadAfterDelete=(flag)=>{
        console.log("flag........",flag)
        this.fetchData(flag);
      }

      toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }

      fetchData(flag){
        fetch('https://api.airtable.com/v0/appLszvxylTgt2eT1/PropertyDetails?api_key=key0tmrhslNPTkTEG')
        .then((resp) => resp.json())
        .then(data => {
          console.log("datadata........",data);
          let count = 0;
          while(flag && count<5 && localStorage?.getItem("properties")===data.records){
            this.fetchData();
            count+=1
            setTimeout(2000);
          }
          this.setState({ properties: data.records });
          localStorage.setItem("properties",data.records);
          count=0;
        }).catch(err => {
          // Error
          console.log("error........",err)
        });
      }

    componentDidMount() {
        this.fetchData(false);
      }

    render() {
      return (
        <>
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <div className="card-deck">
                <div className="card">
                    <div className='card-title' style={{background:"#DCDCDC"}}>
                    <h4 style={{ float:"left", margin:'1%', paddingLeft:"1%"}}>
                        Property List
                    </h4>
                        <Button variant='primary' size='small' onClick={this.toggle} style={{ float:"right", margin:"1%"}} >Add</Button>
                    </div>
                  <div className="card-body">
                      <Table striped bordered hover size="sm">
                      <thead>
                            <tr>
                            <th style={{width:"2%"}}>Name</th>
                            <th style={{width:"5%"}}>Description</th>
                            <th style={{width:"2%"}}>Size</th>
                            <th style={{width:"1%"}}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                          {this.state.properties.map((value,key) => <ViewCard properties={value.fields} keys={value.id} reloadAfterDelete={this.reloadAfterDelete}/> )}
                        </tbody>
                      </Table>
                  </div>
                </div>
              </div>
             </div>
           </div>
        </div>
        <div className='container'>
        <MDBModal isOpen={this.state.modal} toggle={this.toggle}>
                    <CreatePropertyComponent reload={this.reload}/>
                </MDBModal>
        </div>
        </>
      );
    }
}
 
export default ViewComponent;