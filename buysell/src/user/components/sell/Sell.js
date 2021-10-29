import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Box, isWidthUp, withWidth, withStyles } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from '@material-ui/core/Chip';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import { blue } from "@material-ui/core/colors";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { alpha, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CommentIcon from '@material-ui/icons/Comment';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  dropdown: {
    marginTop: theme.spacing(2),
    // paddingTop: 0,
    // paddingBottom: 0,
    backgroundColor: theme.palette.background.form,
    width:300,
  },  
  // selectEmpty: {
  //   marginTop: theme.spacing(2),
  //   width:300,
  //   marginLeft: theme.spacing(6)
  // },  
  list: {
    marginLeft: theme.spacing(70),
  },  
  contractID: {
    marginTop: theme.spacing(5),
    width:500
  },
  cssFocused: {},  
  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    }
  },

  notchedOutline: {
    borderWidth: '1px',
    borderColor: '#51b697 !important'
  },
  
  listitem: {
    margin: "10px 20px 10px 20px",
  },

  listTextTitle: {
    fontSize: '25px',
  },

  listTextValue: {
    fontSize: '20px',
  },
  
  offer: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.background.form,
    width:200
  },  
  top: {
    marginTop: theme.spacing(10),
  },  
  selectGroup: {
    marginLeft: 22
  },
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
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
  listRoot: {
    maxWidth: 500
  },
  button: {
    // marginTop: theme.spacing(4),
    // marginLeft: theme.spacing(4),
    borderRadius: "1em",
    border: 'solid 1px green',
    width: '200px',
    variant: "outlined"
  },
}));


function Sell() {
  const classes = useStyles();
  const [age, setAge] = React.useState(10);
  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChangeCheck = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { gilad, jason, antoine } = state;
  const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };


  return (
    <Box
      justifyContent="center"
      className={classes.top}
    >
      <br />
      <Grid container spacing={1} align = "center" justify = "center" alignItems = "center" >
        <Grid item xs={12} >
          <FormControl variant="outlined" className={classes.formControl}>
            <Select
              value={age}
              onChange={handleChange}
              // displayEmpty
              className={classes.dropdown}
              inputProps={{ 'aria-label': 'Without label' }}
            >
              <MenuItem style={{backgroundColor: '#001D32'}} value={10}>ACCEPT OFFERS</MenuItem>
              <MenuItem style={{backgroundColor: '#001D32'}} value={20}>LIST NFT</MenuItem>
            </Select>

            <br />

            <div align="left" justify = "center">
              <a href="#" style={{ color: '#fff', marginLeft: 10}}>Select All</a>
            </div>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <List dense className={classes.listRoot}>
            {[0, 1, 2, 3].map((value) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <>
                <ListItem key={value} button>
                  <Checkbox
                      color="primary"
                      edge="end"
                      onChange={handleToggle(value)}
                      checked={checked.indexOf(value) !== -1}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  <ListItemText className={classes.listitem} id={labelId} >
                    <div className={classes.listTextTitle}>{`Coocoo Yankeedork ${value + 1}`}</div>
                    <div className={classes.listTextValue}>#1998282</div>
                  </ListItemText>

                  {/* <ListItemText style={{margin: 30}} id={labelId} primary={`Line item ${value + 1}`} />
                  <ListItemText style={{margin: 30}} id={labelId} primary={`Line item ${value + 1}`} /> */}
                  <ListItemSecondaryAction>              
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${value + 1}`}
                        src={`/images/logged_in/image5.jpg`}
                        variant="square"
                      />
                    </ListItemAvatar>
                  </ListItemSecondaryAction>
                </ListItem>
                </>
              );
            })}
          </List>
          { age > 15 && 
            <>
              <TextField
                id="standard-full-width"
                className={classes.offer}
                variant="outlined"
                placeholder="SELL PRICE"
                fullWidth
                margin="normal"
                // InputLabelProps={{
                //   shrink: true,
                // }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
              <Grid container justify="center" alignItems="center">
                <Typography>Subtotal</Typography>
                <Typography style={{marginLeft:300}}>7ETH</Typography>
              </Grid>
              {/* <ListItem  className={classes.list}>
              </ListItem> */}
              <Button size="large" color="primary" className={classes.button}>
                SEND
              </Button>
            </>
          } 
          { age < 11 &&
            <div>
              <br />
              <Button size="large" color="primary" className={classes.button}>
                ACCEPT
              </Button>
            </div>
          }
        </Grid>
      </Grid>
    </Box>
  );
}

export default Sell;
