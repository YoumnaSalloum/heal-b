//code for tabs 
import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
//code for cards
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useState, useEffect } from 'react';
import axios from "axios";
function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}> 
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
//styles for cards 
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
//styles for tabs 
const useStyless = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    alignItems: 'center',
  },
  app: {
   
    alignItems: 'center',
  },
}));
export default function SimpleTabs() {
  const classes1 = useStyless();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
    
  };
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
  
    setfood(response.data.FoodCategories)
    } )}
   , [])
  return (
    <div >
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" >
        <Avatar alt="Remy Sharp" src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRhYBy7LF91oLpDUDdsIbcpd7aGf4GKzs3jGw&usqp=CAU" />
        </Typography>
        <Button  color="inherit" to="/foodform" component={Link}>create Food Post</Button>
        <Button color="inherit" to="/createpost" component={Link}>create hospital bill Post</Button>
        <Button color="inherit" to="/" component={Link} >HomePage</Button>
        <Button >Logout</Button>
      </Toolbar>
    </AppBar>
    
    <div className={classes1.root}>
      <AppBar className={classes1.app} position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label=" Diabetes" {...a11yProps(0)} />
          <Tab label=" Pressure" {...a11yProps(1)} />
          <Tab label=" Colon " {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      
      <TabPanel value={value} index={0}>
      <Grid
container
spacing={5}
direction="column"
alignItems="center"
justify="center"
style={{ minHeight: '100vh' }}
>
<Grid item xs={3}>
                       {food.map(ele=>(
                         
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
                     <img width='210px' length='200px' src={require(`./../../../../server-side/public/uploads/${ele.photo.slice(15)}`)}/>

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
                       ))}
      </Grid> 
     </Grid>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <Grid
container
spacing={5}
direction="column"
alignItems="center"
justify="center"
style={{ minHeight: '100vh' }}
>
<Grid item xs={3}>
​
                       {food.map(ele=>(
                         
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
                             <img width='210px' length='200px' src={require(`./../../../../server-side/public/uploads/${ele.photo.slice(15)}`)}/>
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
                       ))}
      </Grid> 
</Grid>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <Grid
container
spacing={5}
direction="column"
alignItems="center"
justify="center"
style={{ minHeight: '100vh' }}
>
<Grid item xs={3}>
​
                       {food.map(ele=>(
                         
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
                            <img width='210px' length='200px' src={require(`./../../../../server-side/public/uploads/${ele.photo.slice(15)}`)}/>
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
                       ))}
      </Grid> 
</Grid>
      </TabPanel>
    </div>
    </div>
  );
}