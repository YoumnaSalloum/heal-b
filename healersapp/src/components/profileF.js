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
  

function  Profilee (props) {
  const { clases } = props;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
  setExpanded(!expanded);
  };

    const [food, setfood] = useState([]);
    
    useEffect(() => {
      const email = localStorage.getItem("id")
      const myData = {email:email}
    axios
    
    .post("http://localhost:8000/mypost",myData)

    .then(response => {
      console.log(response.data.FoodCategories)
      setfood(response.data.FoodCategories)
      } )}
     , [])
        
    
    return(
          <div style={{
               display: "flex",
               flexWrap: "wrap",
               justifyContent: "space-around",
               
          }}>

                       {food.map(ele=>(
                              <Grid
                              container
                              spacing={5}
                              direction="column"
                              alignItems="center"
                              justify="center"
                              style={{ minHeight: '50vh' }}
                              >
                              <Grid item xs={3}>
                 
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
                      title="Food Prescriptions"
                      subheader=""
                      />
                  <img width='210px' length='200px' src={require(`./../../../server-side/public/uploads/${ele.photo.slice(15)}`)}/>
                      <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                      Type Of Disease = {ele.Category}
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
                      descriptionOfPrescription =
                      {ele.descriptionOfPrescription }
                      </Typography>
                      <Typography paragraph>
                      UserPhoneNumber = 
                      {ele.UserPhoneNumber}
                      </Typography>
    
                      </CardContent>
                      </Collapse>
                      
                      </Card>
                      </Card>
                      </Grid>
                      </Grid>
                       ))}
                       
                     
               </div>
    )
}
  

  export default Profilee