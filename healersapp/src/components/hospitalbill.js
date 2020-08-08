import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import ShareButton from "./shareButton";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import IntersetForm from "./intresetform";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";
import $ from "jquery";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
//test
//       {/**./../../../server-side/public/uploads/${bill.photo.slice(7)} */}
//import Pic from '../../../server-side/public/uploads/IMAGE-1595262248867.jpg'
//import Pic from './../../../server-side/public/uploads/IMAGE-1596008224798.png'
//var Pic = require('./../../../server-side/public/uploads/IMAGE-1596008224798.png')
//testing
const useStyles = makeStyles((theme) => ({
  root: {
    alignText: "center",
    justifyContent: "center",
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
// email: "lubnahaj45@gmail.com"
// hospitalBill: []
// password: "$2b$10$GwKIKP74g.Rz1MYfL206j.Dfq2G2L/G.YqP96MNvaVF5XyhdueYwW"
// phoneNumber: 89897687
// userName: "lubna"
function MakePost(props) {
  const { clases } = props;
  //  console.log('./../../../server-side/public/uploads/'+props.userData.hospitalBill[0].photo.slice(17))
  //const plzWork = '../../../server-side'
  const classes = useStyles();
  //let hosBillLength = props.userData.hospitalBill.length;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div>
    <div>
      {props.userData.hospitalBill.length > 0 ? (
        <div id="post">
          {props.userData.hospitalBill.map((bill, index) => (
            <Grid
              container
              spacing={5}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "100vh" }}
            >
              <Grid item xs={3}>
                <Card>
                  <Card className={classes.root}>
                    <CardHeader
                      avatar={
                        <Avatar
                          aria-label="recipe"
                          className={classes.avatar}
                        ></Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">
                          <MoreVertIcon />
                        </IconButton>
                      }
                      title="Hospital Bill"
                      subheader=""
                    />
                    {/* <CardMedia
                      className={classes.media}
                      // img or video:

                      image={
                        "../../../server-side/" +
                        "public/uploads/IMAGE-1595849935567.jfif"
                      }
                      title="Paella dish"
                    /> */}
                    <img
                      width="210px"
                      length="200px"
                      src={require(`./../../../public/uploads/${bill.photo.slice(
                        17
                      )}`)}
                    />
                    {/* <img src={'../../../server-side/'+bill.photo} /> */}
                    {/* <img src={require('./../../../server-side/public/uploads/IMAGE-1595262248867.jpg')}/> */}
                    <CardContent>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        Bill amount:{bill.amount}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <ShareButton />

                      <IconButton aria-label="share"></IconButton>
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
                        <Typography paragraph></Typography>
                        <Typography paragraph>
                          The description of patient health situation:
                          {bill.descAboutHealthPatient}
                        </Typography>
                        <Typography paragraph>
                          Hospital Name :{bill.hospitalName}
                        </Typography>
                        <Typography>
                          Hospital Address :{bill.hospitalAddress}
                        </Typography>
                        <Typography>
                          Hospital phone number :{bill.hospitalPhoneNumber}
                        </Typography>
                        <Typography>
                          <Button color="secondary">
                            {" "}
                            <Link to="/IntersetForm">INTEREST</Link>
                          </Button>
                        </Typography>
                      </CardContent>
                    </Collapse>
                  </Card>
                </Card>
              </Grid>
            </Grid>
          ))}
        </div>
       
      ) : (
        ""
      )}
      </div>
    </div>
  );
}
class HospitalBill extends React.Component {
  // var storeMe;
  constructor(props) {
    super(props);
    this.state = {
      storeMe: [],
    };
  }
  //youmna
  async componentDidMount() {
    const that = this;
    await $.get("http://localhost:8000/mayis")
      .done((result) => {
        console.log(result);
        that.setState({ storeMe: result });
        console.log(that.state.storeMe);
        //storeMe=result
      })
      .fail((jqxhr, settings, ex) => {
        console.log("lala");
      });
  }
  render() {
    const bill = this.state.storeMe;
    console.log(bill);
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6">About Us</Typography>
            <Button color="inherit" to="/foodform" component={Link}>
              create Food Post
            </Button>
            <Button color="inherit" to="/createpost" component={Link}>
              create hospital bill Post
            </Button>
            <Button color="inherit" to="/profile" component={Link}>
              Profile
            </Button>
            <Button color="inherit" to="/" component={Link}>
              HomePage
            </Button>
            <Button color="inherit" to="/" component={Link}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        {bill.map((user, index) => (
          <MakePost key={index} userData={user} />
        ))}
      </div>
    );
  }
}
export default HospitalBill;
