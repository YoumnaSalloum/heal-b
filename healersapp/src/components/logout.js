import React, { Component } from "react";
import axios from "axios";
class Logout extends React.Component {
  componentDidMount() {
    //clear
    window.localStorage.clear();
    axios.get('http://localhost:8000/logout')
    .then((res) => {
        console.log("from logout in")
        console.log(res.data)
    }).catch((error) => {
        console.log(error)
    });  
  }
  render() {
    return <div></div>;
  }
}
export default Logout;