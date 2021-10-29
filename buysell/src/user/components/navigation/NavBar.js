import React, { memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Hidden,
  IconButton,
  withStyles
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import BookIcon from "@material-ui/icons/Book";
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { formatEther } from "@ethersproject/units";

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import logo from "../../../assets/images/logo.png";

const AntTabs = withStyles({
  // root: {
  //   borderBottom: '1px solid #e8e8e8',
  // },
  indicator: {
    backgroundColor: '#e8e8e8',
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    minWidth: 54,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(3),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#40a9ff',
      opacity: 1,
    },
    '&$selected': {
      color: '#1890ff',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#40a9ff',
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[6],
    // backgroundColor: theme.palette.common.white
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-evenly",
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight,
    textTransform: "capitalize !important",
    // color: "#E50916",
    color: theme.palette.common.white,
    // '&:hover': { color: theme.palette.common.white },
  },
  brandText: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 900,
    color: theme.palette.common.white,
    letterSpacing: "0.1em",
  },
  navText: {
    fontFamily: "'Roboto', sans-serif",
    fontWeight: 800,
    fontSize: '15px',
    color: theme.palette.common.main,
    letterSpacing: "0.1em",
  },
  noDecoration: {
    textDecoration: "none !important",
    fontFamily: "'Jost', sans-serif !important",
  },
  iconColor: {
    color: "#E50916",
  }
});

function NavBar(props) {

  const [value, setValue] = React.useState(2);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const {
    classes,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    connectWallet,
    disconnectWallet,
    ethBalance,
    active,
  } = props;
  const menuItems = [
    {
      link: "/buy",
      name: "Buy",
      icon: <BookIcon className="text-white" />,
      subMenus: []
    },
    {
      link: "/sell",
      name: "Sell",
      icon: <BookIcon className="text-white" />
    },
    // {
    //   name: "Register",
    //   onClick: openRegisterDialog,
    //   icon: <HowToRegIcon className="text-white" />
    // },
    // {
    //   name: "Login",
    //   onClick: openLoginDialog,
    //   icon: <LockOpenIcon className="text-white" />
    // },
    // {
    //   name: "Logout",
    //   onClick: openLogoutDialog,
    //   icon: <LockOpenIcon className="text-white" />
    // }
  ];

  const handleConnectWallet = () => {
    // if (!walletConnected) {
    if (!active) {
      connectWallet();
    }
    else {
      disconnectWallet();
    }
  }
  
  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {/* <div>
            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="primary"
            >
              <PlayCircleFilledIcon style={{
                color: "#E50916",
                fontSize: "3.5rem" ,
                marginTop: "-10px",
                position: "absolute",
                marginLeft: "-60px",
              }}/>
            </Typography>
            <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="secondary"
            >

            </Typography>
          </div> */}
          <img src={logo} width={100} height={24} />

          <div>
          <AntTabs
            value={value}
            tabItemContainerStyle={{width: '50px'}}
            textColor="primary"
            className={classes.navText}
            onChange={handleChange}
          >
            {menuItems.map(element => {
              if (element.link) {
                return (
                  <AntTab label={<span className={classes.navText}>{element.name}</span>} component={Link} to={element.link}>
                  </AntTab>
                );
              }
            })
            }
          </AntTabs>
            {/* <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                onClick={handleMobileDrawerOpen}
                aria-label="Open Navigation"
              >
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
            <Hidden smDown>
              {menuItems.map(element => {
                if (element.link) {
                  return (
                    // <Link
                    //   key={element.name}
                    //   to={element.link}
                    //   className={classes.noDecoration}
                    //   onClick={handleMobileDrawerClose}
                    // >
                    //   <Button
                    //     color="secondary"
                    //     size="large"
                    //     classes={{ text: classes.menuButtonText }}
                    //   >
                    //     {element.name}
                    //     <ExpandMoreIcon />
                    //   </Button>
                    // </Link>
                    <>
                    </>
 
                  );
                }
                if(element.name === "Login" || element.name === "Register"){
                  if(!localStorage.getItem("token")){
                    return (
                      <Button
                        color="secondary"
                        size="large"
                        onClick={element.onClick}
                        classes={{ text: classes.menuButtonText }}
                        key={element.name}
                      >
                        {element.name}
                      </Button>
                    );
                  }
                }
                else if(element.name === "Logout"){
                  if(localStorage.getItem("token")){
                    return (
                      <Button
                        color="secondary"
                        size="large"
                        onClick={element.onClick}
                        classes={{ text: classes.menuButtonText }}
                        key={element.name}
                      >
                        {element.name}
                      </Button>
                    );
                  }
                }
                else if(element.name === "Admin"){
                  // console.log(localStorage.getItem("user_name"));
                  if(localStorage.getItem("user_name") === "admin"){
                    return (
                      <Button
                        color="secondary"
                        size="large"
                        onClick={element.onClick}
                        classes={{ text: classes.menuButtonText }}
                        key={element.name}
                      >
                        {element.name}
                      </Button>
                    );                  
                  }
                }
                else{
                    return (
                      <Button
                        color="secondary"
                        size="large"
                        onClick={element.onClick}
                        classes={{ text: classes.menuButtonText }}
                        key={element.name}
                      >
                        {element.name}
                        <ExpandMoreIcon />
                      </Button>
                    );
                  }
              })}
            </Hidden> */}
          </div>
          <div>
            
            {/* <h1 style={{ margin: "0", textAlign: "right" }}>
              {active ? "🟢" : error ? "🔴" : "🟠"}
            </h1> */}
            {active ? 
              (<Typography
                variant="h6"
                className={classes.brandText}
                display="inline"
                color="secondary"
              >
                <span role="img" aria-label="gold">
                  💰
                </span>
                <span>
                  {ethBalance === undefined
                    ? "..."
                    : ethBalance === null
                    ? "Error"
                    : `Ξ${parseFloat(formatEther(ethBalance)).toPrecision(4)}`}
                </span>
              </Typography>)
              : <div />
              }

            {/* <Typography
              variant="h4"
              className={classes.brandText}
              display="inline"
              color="secondary"
            > */}
              <Tab label={
                <span className={classes.navText} onClick={handleConnectWallet}>
                  {active ? "Disconnect" : "Connect"}
                </span>} >
              </Tab>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  connectWallet: PropTypes.func,
  disconnectWallet: PropTypes.func,
  ethBalance: PropTypes.string,
  active: PropTypes.bool,
  error: PropTypes.bool,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string,
  openRegisterDialog: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(NavBar));
