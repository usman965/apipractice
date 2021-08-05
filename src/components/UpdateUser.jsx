import React, { useState,useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, makeStyles, Typography } from '@material-ui/core';
import Axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
export default function UpdateUser() {
    const {id}=useParams();
  const history=useHistory();
  const [userData, userDataSet] = useState({name:"",description:"",content:"",subject:"", "is_active": true,
  "unique_name": ""});
  const [error, errorSet] = useState({name:"",description:"",subject:"",content:"",unique_name:""});
  useEffect(() => {
    if(!(localStorage.getItem("login") || localStorage.getItem("token")!==null ||  localStorage.getItem("token")!=="")){
      history.push("/");
    }
    else{getUser()}
  }, []);

const updateUser=()=>{

    const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    Axios.put( 
      `http://207.180.230.73/FebcRevamp/v1/notification_template/${id}`,
      userData,
      config
    ).then(resp=>{
        history.goBack();
    }).catch(console.log);

}

  const handleChange = (event) => {
    const {name,value}=event.target;
    if (value.length>0){
      errorSet((prev)=>{
        return({prev,[name]:""})
      });
    } 
    userDataSet((prev)=>{
      return({...prev,[name]:value});
    });
  };
  const getUser=()=>{
    Axios.get( 
        `http://207.180.230.73/FebcRevamp/v1/notification_template/${id}`
      ).then(resp=>{
          const {name,description,unique_name,subject,content} = resp.data.data
          userDataSet({name:name,description:description,unique_name:unique_name,subject:subject,content:content});
      }).catch(console.log);

  }
  
  return (
      <Card variant="elevation" className="login">
          
            <Typography variant="h6">
              Update User
            </Typography>
    <form autoComplete="on" >    
      <FormControl className="inp">
        <InputLabel>UserName</InputLabel>
        <Input
        type="text"
        name="name"
          id="component-helper"
          value={userData.name}
          onChange={handleChange}
        />
        <FormHelperText id="component-helper-text">{error.name}</FormHelperText>
      </FormControl>
      <br/>
      <FormControl className="inp">
        <InputLabel >Unique Name</InputLabel>
        <Input
        
        type="text"
        name="unique_name"
          id="component-helper"
          value={userData.unique_name}
          onChange={handleChange}
        />
        <FormHelperText id="component-helper-text">{error.unique_name}</FormHelperText>
      </FormControl>
    <br/>
      <FormControl className="inp">
        <InputLabel >Description</InputLabel>
        <Input
        
        type="text"
        name="description"
          id="component-helper"
          value={userData.description}
          onChange={handleChange}
        />
        <FormHelperText id="component-helper-text">{error.description}</FormHelperText>
      </FormControl>
      <br/>
      <FormControl className="inp">
        <InputLabel >Subject</InputLabel>
        <Input
        
        type="text"
        name="subject"
          id="component-helper"
          value={userData.subject}
          onChange={handleChange}
        />
        <FormHelperText id="component-helper-text">{error.subject}</FormHelperText>
      </FormControl>
      <br/>
      <FormControl className="inp">
        <InputLabel >Content</InputLabel>
        <Input
        type="text"
        name="content"
          id="component-helper"
          value={userData.content}
          onChange={handleChange}
        />
        <FormHelperText id="component-helper-text">{error.content}</FormHelperText>
      </FormControl>
     <br/>
      <Button variant="contained" color="primary" onClick={
        ()=>{
          if(userData.name ==="")
          { errorSet({name:"Enter Name",description:"",subject:"",content:"Enter Name",unique_name:""})}
          else if(userData.description ==="")
            { errorSet({name:"",description:"Enter Description",subject:"",content:"",unique_name:""})}
          else if(userData.subject ==="")
            { errorSet({name:"",description:"",subject:"Enter Subject",content:"",unique_name:""})}
          else if(userData.content==="")
            { errorSet({name:"",description:"",subject:"",content:"Enter Content",unique_name:""})}
            else if(userData.unique_name==="")
            { errorSet({name:"",description:"",subject:"",content:"Enter Content",unique_name:""})}
          else {updateUser();}
        }
      }>
  Update User</Button>
    </form>
    </Card>
  );
}

