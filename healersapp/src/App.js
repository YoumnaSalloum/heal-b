//make sure that all components have the same name of routs
import React from 'react';
//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './components/navbar.js';
import FoodForm from './components/foodForm.js'
// import HospitalBill from "./components/hospitalbill.js";

import BillForm from "./components/hosform.js";
import IntersetForm from "./components/intresetform.js";
import Login from "./components/login.js";
import Signup from "./components/signup.js";
 import SimpleTabs from "./components/foodCategories/tabs.js";
import Profile from "./components/profile.js"
import Profilee from "./components/profileF.js"

//test

import HospitalBill from './components/hospitalbill'

function App(){
  return (
    
     <Router>
     <br/> 
     <div>
     
     <Route path="/" exact component= {NavBar} />
     <Route path="/foodCategories" component= {SimpleTabs} />
     <Route path="/hospitalbill" component= {HospitalBill} />
     <Route path="/createpost"  component= {BillForm} />
     <Route path="/IntersetForm"  component= {IntersetForm} />
     <Route path="/Login"  component= {Login} />
     <Route path="/Signup" component= {Signup} />
     <Route path="/profile" component={Profile} />
     <Route path="/profile" component={Profilee} />
     <Route path="/foodForm" component={FoodForm} />
     

     </div>
     </Router>
     
  )
}

export default App;