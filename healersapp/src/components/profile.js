import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect } from 'react';
import axios from "axios";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import $ from 'jquery'
const useStyles = makeStyles((theme) => ({
  root: {
  alignText: "center",
  justifyContent:"center",
  maxWidth: "6000px",
  },
  media: {
  height: 0,
  paddingTop: '56.25%', // 16:9
  },
  expand: {
  transform: 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
  duration: theme.transitions.duration.shortest,
  }),
  },
  expandOpen: {
  transform: 'rotate(180deg)',
  },
  avatar: {
  backgroundColor: red[500],
  },
  }));

 function handleOnclick(event){
  event.preventDefault();
  console.log(event.target.id)
 $.post('http://localhost:8000/delete',{myData:{billId:event.target.id,userid:localStorage.getItem('id')}})
  .done( (result) =>{ console.log(result)
      
      console.log(result)
        //storeMe=result
  })
  .fail( (jqxhr, settings, ex) =>{console.log('lala') })
}

function  Profile (props) {
  const { clases } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
  setExpanded(!expanded);
  };
  
    
    const [post, setpost] = useState([]);
    const [username,setusername] = useState([]);
    useEffect(() => {
      const email = localStorage.getItem("id")
      const myData = {email:email}
    axios
    
    .post("http://localhost:8000/mypost",myData)

    .then(response => {

     setpost(response.data.hospitalBill)
     setusername(response.data.userName)
     } )}
    , [])
    
  

    return(
      
        <div>
        <div >
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" >
            <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhYBy7LF91oLpDUDdsIbcpd7aGf4GKzs3jGw&usqp=CAU" />
            </Typography>
            <Button  color="inherit" to="/foodform" component={Link}>create Food Post</Button>
            <Button color="inherit" to="/createpost" component={Link}>create hospital bill Post</Button>
            <Button color="inherit" to="/" component={Link} >HomePage</Button>
            <Button  color="inherit" to="/" component={Link}>Logout</Button>
          </Toolbar>
        </AppBar>
        </div>
        <div style={{maxWidth:"6000px", margin:"0px auto"}}>
            <div style={{
                margin:"18px 0px",
                borderBottom:"1px solid grey"
            }}>
               <div style={{
               display:"flex",
               justifyContent:"space-around",
              
           }}>
               </div>
                <div>
                <img style={{width:"160px",height:"160px",borderRadius:"80px"}}
                   src="data:image/png;base64,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"
                   />
                </div>
                <div>
          <h4>userName:{username}</h4>
          <h5> posts:{post.length}</h5>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  
                </div>
                </div>
            </div>
          <div style={{
               display: "flex",
               flexWrap: "wrap",
               justifyContent: "space-around",
               
          }}>
                    {post.map((item,index)=>(
                    
                     
                      <Grid
                      container
                      spacing={5}
                      direction="column"
                      alignItems="center"
                      justify="center"
                      style={{ minHeight: '50vh' }}
                      >
                      <Grid item xs={3}>
                      <div>
                      <button id={index} onClick={handleOnclick}>delete</button>
                      <Card>
                      <Card className={classes.root} >
                      <CardHeader
                      avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                      </Avatar>
                      }
                      action={
                      <IconButton aria-label="settings">
                      <MoreVertIcon />
                      </IconButton>
                      }
                      title="Hospital Bill"
                      subheader=""
                      />
                      <img width='210px' length='200px' src={require(`./../../../server-side/public/uploads/${item.photo.slice(17)}`)}/>
                      <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                      Bill amount:{item.amount}
                      </Typography>
                     
                      </CardContent>
                      
                      <CardActions disableSpacing>
                      <IconButton aria-label="share">
                      <ShareIcon />
                      </IconButton>
                      <IconButton
                      className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                      })}
                      onClick={handleExpandClick}
                      aria-expanded={expanded}
                      aria-label="show more"
                      >
                      <ExpandMoreIcon />
                      </IconButton>
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                      <CardContent>
                      <Typography paragraph></Typography>
                      <Typography paragraph>
                      </Typography>
                      <Typography paragraph>
                      The description of patient health situation 
                      {item.amount}
                      </Typography>
                      <Typography paragraph>
                      Hospital Name 
                      {item.hospitalName}
                      </Typography>
                      <Typography>
                      Hospital Address 
                      {item.hospitalAddress}
                      </Typography>
                      <Typography>
                      Hospital phone number
                      {item.hospitalPhoneNumber}
                      </Typography>
                      <Typography>
                      Patient phone number
                      {item.patientPhoneNumber}
                      </Typography>
                      <Typography>
                      postedBy
                      {item.postedby}
                      </Typography>
                      <Typography>
                      <Button color="secondary">    <Link to="/IntersetForm">INTEREST</Link></Button>
                      </Typography>
                      </CardContent>
                      </Collapse>
                      
                      </Card>
                      </Card>
                       </div>
                      </Grid> 
                      </Grid>
                      

                      ))}
           
       
          </div>
        </div>
        </div>
    )
}

export default Profile;