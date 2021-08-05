import React, { useState,useEffect } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import Card from '@material-ui/core/Card';
import InputLabel from '@material-ui/core/InputLabel';
import { Button, Typography } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
export default function LogIn() {
  const history=useHistory();
  const [userData, userDataSet] = useState({username:"",password:""});
  const [error, errorSet] = useState({username:"",password:""});
  useEffect(() => {
    if(localStorage.getItem("login") && localStorage.getItem("token")!==null &&  localStorage.getItem("token")!==""){
      history.push("/home");
    }
  }, []);
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
  const login=()=>{
    axios.post('http://207.180.230.73/FebcRevamp/v1/auth/login', userData).
    then(response => {
      localStorage.setItem("token",response.data.data.token);
      localStorage.setItem("login",true);
      userDataSet({username:"",password:""});
      history.push("/home");

    })
        .catch(error => {
            alert(error);
            userDataSet({username:"",password:""});
        });
  }

  return (
      <Card variant="elevation" className="login">
          <Typography variant="h6">
              LogIn
            </Typography>
    <form autoComplete="on" >    
      <FormControl className="inp">
        <InputLabel>UserName</InputLabel>
        <Input
        type="text"
        name="username"
          id="component-helper"
          value={userData.username}
          onChange={handleChange}
        />
        <FormHelperText id="component-helper-text">{error.name}</FormHelperText>
      </FormControl>
      <br/>
      <FormControl className="inp">
        <InputLabel >Password</InputLabel>
        <Input
        
        type="password"
        name="password"
          id="component-helper"
          value={userData.password}
          onChange={handleChange}
        />
        <FormHelperText id="component-helper-text">{error.password}</FormHelperText>
      </FormControl>
      <br/>
      <Button variant="contained" color="primary" onClick={
        ()=>{
          if(userData.username ==="")
          { errorSet({name:"Enter Name",password:""})}
          else if(userData.password ==="")
          { errorSet({name:"",password:"Enter Password"})}
          else {login()};    
        }
      }>
  Submit</Button>
    </form>
    </Card>
  );
}

