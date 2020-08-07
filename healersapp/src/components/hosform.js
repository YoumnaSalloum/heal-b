import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import $ from "jquery";
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';

//using media upload part
var axios = require("axios");



class BillForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      bill: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleHospitalBillSchema = this.handleHospitalBillSchema.bind(this);
  }
 
  handleHospitalBillSchema() {

    var bill = {
      amount: $("#amount").val(),
      hospitalNumber: $("#hosNum").val(),
      hospitalName: $("#hosName").val(),
      hospitalAddress: $("#hosAdress").val(),
      descAboutHealthPatient: $("#healthDes").val(),
    
    };
    //logout
    const history = useHistory();

    function logoutUser(event) {
      event.preventDefault();

      // history.push("/login");
      //clear
      window.localStorage.clear();
      axios.get('/logout')
        .then((res) => {
          history.push("/");

          console.log("from logout")
          console.log(res.data)
        }).catch((error) => {
          console.log(error)
        });

    }
    // $.post("http://localhost:8000/uploa", { myData: bill })
    //   .done(function () {
    //     alert("Request done!");
    //   })
    //   .fail(function (jqxhr, settings, ex) {
    //     alert("failed, " + ex);
    //   });
  }
  //lubna
  onFormSubmit(e) {
    var bill = {
      amount: $("#amount").val(),
      hospitalNumber: $("#hosNum").val(),
      hospitalName: $("#hosName").val(),
      hospitalAddress: $("#hosAdress").val(),
      descAboutHealthPatient: $("#healthDes").val(),
      patientNumber:$('#patNum').val(),
      id:localStorage.getItem('id')

    };
    console.log(bill);
    e.preventDefault();
    const formData = new FormData();
    formData.append("myImage", this.state.file);
    formData.append("Billdata", JSON.stringify(bill));
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    
    axios
      .post("/upload", formData, bill, config)
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
  
  render() {
    // const classes = useStyles();
    return (
      <div>
      <div >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" >
          <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhYBy7LF91oLpDUDdsIbcpd7aGf4GKzs3jGw&usqp=CAU" />
          </Typography>
          <Button  color="inherit" to="/foodform" component={Link}>create Food Post</Button>
          <Button color="inherit" to="/profile" component={Link} >Profile</Button>
          <Button color="inherit" to="/" component={Link} >HomePage</Button>
              <Button color="inherit" to="/" component={Link} onClick={this.logoutUser}>Logout</Button>
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
      <form onSubmit={this.onFormSubmit}>
      
        <h1>Hospital Bill Form </h1>

        <div>
        Amount <input type="number" id="amount" />
        </div>
        
        Phone number of the hospital
        <TextField id="hosNum" />
        <br />
        phone number of patient
        <TextField id="patNum" />
        <br />
        the name of the hospital
        <TextField id="hosName" />
        <br />
        adress of the hospital
        <TextField id="hosAdress" />
        <br />
        <br />
        describtion about your health
        <TextField id="healthDes" />
        <br />
        <br />
        <input type="file" name="myImage" onChange={this.onChange} />
       
        <div>
        <h4>please send us feed back about your Finance assistant
      and tell us if you got your help
       on this email "youmna61998@gmailcom"</h4>
        <Grid
      container
      spacing={5}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '20vh' }}
      >
      <Grid item xs={3}>
        <Button   variant="contained"
        color="primary"
          onClick={this.onFormSubmit}
          >
         Submit
        </Button>
        </Grid> 
        </Grid>
        </div>
      </form>
      </Grid> 
        </Grid>
        </div>
    );
  }
}
export default BillForm;
