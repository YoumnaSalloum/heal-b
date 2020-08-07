import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Avatar from '@material-ui/core/Avatar';
import { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import $ from 'jquery'
import { useHistory } from "react-router-dom";

var axios = require("axios");

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));
export default class FoodForm  extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      file: null,
      post: null,
    };
    this.classes = useStyles.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.handleFoodCategoriesSchema = this.handleFoodCategoriesSchema.bind(this)
  }
  // handleFoodCategoriesSchema(){
  //    var post = {
  //   descriptionOfPrescription:$('#descriptionOfPrescription').val(),
  //    UserPhoneNumber:$('#UserPhoneNumber').val(),
  //    Category:$('#Category').val(),
  //    photo:$('#photo').val()}
  //    }
  //logout


  //       logoutUser(event) {
  //         const history = useHistory();
  // event.preventDefault();

  // // history.push("/login");
  // //clear
  // window.localStorage.clear();
  // axios.get('http://localhost:8000/logout')
  //   .then((res) => {
  //     history.push("/");

  //     console.log("from logout")
  //     console.log(res.data)
  //   }).catch((error) => {
  //     console.log(error)
  //   });

// }
     onFormSubmit(e) {
     var post = {
      category: $("#category").val(),
      userNumber: $("#userNumber").val(),
      descOfPresc: $("#descOfPresc").val(),
     photo:$('#photo').val(),
      id:localStorage.getItem('id')
    };
    console.log(post);
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    formData.append("Postdata", JSON.stringify(post));
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://localhost:8000/load", formData, post, config)
      .then((response) => {
        //alert("The file is successfully uploaded");
        console.log(response);
      })
      .catch((error) => {
        alert("error");
      });
      

  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }
  
  
render (){
  return (
    <div>
    <div >
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" >
        <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhYBy7LF91oLpDUDdsIbcpd7aGf4GKzs3jGw&usqp=CAU" />
        </Typography>
        <Button color="inherit" to="/createpost" component={Link}>create hospital bill Post</Button>
        <Button color="inherit" to="/profile" component={Link} >Profile</Button>
        <Button color="inherit" to="/" component={Link} >HomePage</Button>
            {/* <Button color="inherit" to="/" component={Link} onClick={this.logoutUser}>Logout</Button> */}
      </Toolbar>
    </AppBar>
    </div>
    <Grid
    container
    spacing={5}
    direction="column"
    alignItems="center"
    justify="center"
    style={{ minHeight: '100vh' }}
    >
    <Grid item xs={3}>
      <div >
    <form className={this.classes.root} noValidate autoComplete="off" onSubmit={this.onFormSubmit}>
    <h1>Food Prescription Form </h1>
    <TextField id="category" label="Type of disease" /><br />
      <TextField id="userNumber" label="Phone number" /><br />
      <TextField id="descOfPresc" label="description of prescription" /><br />
      <br />
    upload an image
    <input type="file" id="photo" name="img" accept="image/*" placeholder='upload an image' onChange={this.onChange}/><br />
      <Button variant="contained" color="primary" component={Link} to="/foodCategories" onClick={this.onFormSubmit}>
      Submit
    </Button>
    </form>
    </div>
    </Grid> 
        </Grid>
        </div>
  );
}
}