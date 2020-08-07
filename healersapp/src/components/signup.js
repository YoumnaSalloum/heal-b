import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {Link} from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import $ from 'jquery'
var axios = require("axios");
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
class Signup extends Component {
  constructor(props){
    super(props)
    this.state = {
      fields: {},
      errors: {}
  }
    this.classes = useStyles.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this)
   
  }
  handleSignUp(event){
    if(this.handleValidation()){
      var user = {userName:$('#firstName').val(),phoneNumber:$('#phoneNumber').val(),email:$('#email').val(),password:$('#password').val()}
      $.post('/signUp',
      { myData: user })
      .done(function () { alert(user.userName); })
      .fail(function (jqxhr, settings, ex) { alert('failed, ' + ex); });
      alert("Form submitted");
   }else{
      alert("Form has errors.")
   }
 
    //  var user = {userName:$('#firstName').val(),phoneNumber:$('#phoneNumber').val(),email:$('#email').val(),password:$('#password').val()}
    //  $.post('http://localhost:8000/signUp',
    //  { myData: user })
    //  .done(function () { alert(user.userName); })
    //  .fail(function (jqxhr, settings, ex) { alert('failed, ' + ex); });
     }
//validation 
handleValidation(){
  let fields = this.state.fields;
  let errors = {};
  let formIsValid = true;
//phone number 
if (typeof fields["phone"] !== "undefined") {
         
  var pattern = new RegExp(/^[0-9\b]+$/);
  if (!pattern.test(fields["phone"])) {
    formIsValid = false;
    errors["phone"] = "Please enter only number.";
  }else if(fields["phone"].length != 10){
    formIsValid = false;
    errors["phone"] = "Please enter valid phone number.";
  }
}
//
  //Name
  if(!fields["name"]){
     formIsValid = false;
     errors["name"] = "Cannot be empty";
  }
  if(typeof fields["name"] !== "undefined"){
     if(!fields["name"].match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["name"] = "Only letters";
     }        
  }
  //Email
  if(!fields["email"]){
     formIsValid = false;
     errors["email"] = "Cannot be empty";
  }
  if(typeof fields["email"] !== "undefined"){
     let lastAtPos = fields["email"].lastIndexOf('@');
     let lastDotPos = fields["email"].lastIndexOf('.');
     if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') == -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
 }  
 this.setState({errors: errors});
 return formIsValid;
}
contactSubmit(e){
  e.preventDefault();
  if(this.handleValidation()){
     alert("Form submitted");
  }else{
     alert("Form has errors.")
  }
}
handleChange(field, e){         
  let fields = this.state.fields;
  fields[field] = e.target.value;        
  this.setState({fields});
}
//
  render() {
    return (
      <div >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
          <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhYBy7LF91oLpDUDdsIbcpd7aGf4GKzs3jGw&usqp=CAU" />
          </Typography>
            
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={this.classes.paper}>
      <Avatar className={this.classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" >
        Sign up
      </Typography>
      <br />
      <form name="contactform" className="contactform" onSubmit= {this.contactSubmit.bind(this)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
            ref="name" 
            onChange={this.handleChange.bind(this, "name")} value={this.state.fields["name"]}
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="userName"
              autoFocus
            />
            
            <span style={{color: "red"}}>{this.state.errors["name"]}</span>
            <br/>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
            ref='phone'
            onChange={this.handleChange.bind(this, "phone")} value={this.state.fields["phone"]}
              variant="outlined"
              required
              fullWidth
              id="phoneNumber"
              label="phoneNumber"
              name="lastName"
              autoComplete="lname"
            />
            <span style={{color: "red"}}>{this.state.errors["phone"]}</span>
            <br/>
          </Grid>
          <Grid item xs={12}>
            <TextField
            ref="name" 
            onChange={this.handleChange.bind(this, "email")} value={this.state.fields["email"]}
             type="email"
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              validators={['required', 'isEmail']}
              errorMessages={['this field is required', 'email is not valid']}
            />
            
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={this.classes.submit}
          id='signUp'
          component={Link}
          to="/login"
          onClick={this.handleSignUp}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
          <Link to="/Login" >Already have an account? Sign in</Link>
          </Grid>
        </Grid>
      </form>
    </div>
  </Container>
  </div> );
  }
}
export default Signup;