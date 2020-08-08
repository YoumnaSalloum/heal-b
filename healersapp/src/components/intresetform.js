import React, { Component } from 'react';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom'
import $ from 'jquery'
import axios from "axios";

console.log($)
 // const useStyles = makeStyles((theme) => ({
//     margin: {
//       margin: theme.spacing(1),
//     },
//   }));
  class IntersetForm extends Component {
    constructor(props) {
      super(props);
      this.state = {
          text: "",
          date: ""
      }
      // this.onSubmit = this.onSubmit.bind(this);
      // this.onChangeText = this.onChangeText.bind(this);
      this.handle = this.handle.bind(this)

    }


    handle(event){
    
  var user = {id:localStorage.getItem('id'),payment:$('#pay').val(),selected:$('#select').val()}
      axios.post('http://localhost:8000/send', user)
          .then((res) => {
              console.log(res.data)

          }).catch((error) => {
              console.log(error)
          });

 

    
  }
  onChangeText(e) {
    this.setState({ text: e.target.value })
}
    render(){
    return (
      <div>
      <div >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
          <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhYBy7LF91oLpDUDdsIbcpd7aGf4GKzs3jGw&usqp=CAU" />
          </Typography>
          <Button color="inherit" to="/createpost" component={Link}>create hospital bill Post</Button>
          <Button  color="inherit" to="/foodform" component={Link}>create Food Post</Button>
          <Button color="inherit" to="/profile" component={Link} >Profile</Button>
          <Button color="inherit" to="/" component={Link} >HomePage</Button>
         
        </Toolbar>
      </AppBar>
      </div>
      <Grid
      container
      spacing={9}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '70vh' }}
      >
      <Grid item xs={9}>
        <div>
      <div >
        <FormControl >
          <h1>How much you can pay?</h1>
          <br />
          <Input  type='number'   
          id='pay'   
          />
        </FormControl>
        <div>
        <h1>How do you want to pay?</h1>
        <select id='select'>
        <option value="to the hospital directly">to the hospital directly</option>
        <option value="to the patient directly">to the patient directly</option>
        <option value="to the patient directly">I have someone in the hospital and i can decrease the bill amount </option>
      </select></div>
      
     <br />
      <Button variant="contained" color="primary"  onClick={this.handle}>
      Submit
    </Button>
    <h2>please send us feed back about patient health situation
       on this email "youmna61998@gmailcom"</h2>
      </div>
      </div>
      </Grid> 
        </Grid>
        </div>
    );
    }
  }

  export default IntersetForm;
//import React from 'react'
//const axios = require("axios");
