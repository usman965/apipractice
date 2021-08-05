import { Button, Typography,Toolbar,AppBar } from '@material-ui/core'
import { Save ,PersonAdd} from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom';

const Appbar = () => {
    return (
        <AppBar position="static">
          <Toolbar className="toolbar">
            <Typography variant="h6">
              Users
            </Typography>
            <Link to="/home/adduser" style={{textDecoration:"none",backgroundColor:"green"}}><Button startIcon={<PersonAdd/>} style={{color:"white"}}>Add User</Button></Link>
          </Toolbar>
        </AppBar>
    )
}
export default Appbar;