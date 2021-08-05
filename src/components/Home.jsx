import axios from 'axios';
import React from 'react'
import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Appbar from './Appbar';
import { useDispatch, useSelector } from 'react-redux';
import { addContacts, deleteContact, deleteContacts } from '../redux/features/contacts';
import { Link, useHistory } from 'react-router-dom';
import { Button,TablePagination } from '@material-ui/core'

const Home = () => {
const [page,setPage]=useState(0);
const [rowsPerPage,setRowsPerPage]=useState(5);
const handleChangePage = (event, newPage) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event ,val) => {
  setRowsPerPage(parseInt(event.target.value, val));
  setPage(0);
};



  const [list, setList] = useState([]);
  const [allIds, setAllIds] = useState([]);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const getData = async () => {
    axios.get("http://207.180.230.73/FebcRevamp/v1/notification_template")
      .then(resp => {
        const data = resp.data.data;
        const ids = []
        setUsers(data);
        data.map((item) => {
          ids.push(item.id);

        });
        setAllIds(ids)

      }).catch(error => {
        alert("error");

      });
  }
  const deleteUser = (i) => {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    axios.delete(
      `http://207.180.230.73/FebcRevamp/v1/notification_template/${i}`,
      config
    )
      .then(resp => {
        window.location.reload();
      }).catch(console.log);

  }

  const deleteBulkUsers = () => {

    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    axios.delete(
      `http://207.180.230.73/FebcRevamp/v1/notification_template/bulk?list=${list}`,
      config
    )
      .then(resp => {
        window.location.reload();
      }).catch(console.log);

  }


  const handleCheck = (e) => {
    const { name, checked } = e.target;
    if (name == "allcheck") {
      if (checked) {
        setList(allIds);
      }
      else {
        setList([]);
      }
    }
    else if (list.includes(parseInt(name))) {
      const tempList = list.filter((item) => item != parseInt(name))
      setList(tempList)
    }
    else {
      setList(prev => [...prev, parseInt(name)]);
    }
  }
  useEffect(() => {
    if (localStorage.getItem("token") === null || localStorage.getItem("token") === "") {
      history.push("/")
    }
    else { getData(); }

  }, [])
  return (
    <>
      <Appbar />
      <div style={{ width: "80%", margin: "auto", paddingTop: "20px" }}>
        {list.length > 0 ? (<Button startIcon={<DeleteIcon /> } variant="contained" onClick={deleteBulkUsers} style={{ marginBottom: "10px", backgroundColor: "red", color: "white" }}>Delete</Button>) : null}

        <TableContainer component={Paper}>
          <Table size="medium" >
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    onChange={handleCheck}
                    name={"allcheck"}
                  />
                </TableCell>
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Subject</TableCell>
                <TableCell align="left">Content</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.slice(page*rowsPerPage,page*rowsPerPage+rowsPerPage)
              .map((row, ind) => (
                <TableRow key={ind}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      name={row.id}
                      onChange={handleCheck}
                      checked={list.includes(row.id)}
                    />
                  </TableCell>
                  <TableCell align="left">
                    {row.name}
                  </TableCell>

                  <TableCell align="left">{row.description}</TableCell>
                  <TableCell align="left">{row.subject}</TableCell>
                  <TableCell align="left">{row.content}</TableCell>
                  <TableCell align="left"><DeleteIcon style={{ cursor: "pointer" }} onClick={() => { deleteUser(row.id) }} /><Link to={`/home/updateuser/${row.id}`} style={{ textDecoration: "none" }}> <Edit /></Link></TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
      component="div"
      count={users.length}
      page={page}
      rowsPerPageOptions={[5, 10, 15, 20]}
      onPageChange={handleChangePage}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
        </TableContainer>
      </div>
    </>
  )
}
export default Home;