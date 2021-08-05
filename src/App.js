import React from 'react'
import { Route, Switch } from 'react-router-dom';
import AddUser from './components/AddUser';
import Home from './components/Home';
import LogIn from './components/Login';
import UpdateUser from './components/UpdateUser';
import './style/login.css'

export const App = () => {
  return (
    <>
    <Switch>
      <Route exact path="/" component={LogIn}/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/home/adduser" component={AddUser}/>
      <Route exact path="/home/updateuser/:id" component={UpdateUser}/>
      </Switch>
      </>
  )
}
export default App;
