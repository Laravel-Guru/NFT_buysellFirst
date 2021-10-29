import React, { useEffect } from "react";
import { Grid, Box } from "@material-ui/core";
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { alpha, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
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
  // menuItem: {
  //   paddingTop: 0,
  //   paddingBottom: 0,
  // },
  // list: {
  //   marginLeft: theme.spacing(12),
  // },
  contractID: {
    marginTop: theme.spacing(5),
    backgroundColor: theme.palette.background.form,
    // border: 'solid 1px #51b697',
    width:300,
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
    // marginTop: theme.spacing(1),
    // marginRight: theme.spacing(10),
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
    backgroundColor: '#001D32'
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
    maxWidth: 600,
  },
  button: {
    // marginTop: theme.spacing(4),
    // marginLeft: theme.spacing(4),
    borderRadius: "1em",
    border: 'solid 1px green',
    width: '200px',
    variant: "outlined"
  },
  checkAll: {
    // marginLeft: '5px'
  },
}));


function Buy() {
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
      <Grid container spacing={1} align="center" justify="center" >
        <Grid item xs={12} >

          <FormControl variant="outlined" className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel> */}
            <div>
              <Select
                value={age}
                onChange={handleChange}
                className={classes.dropdown}
                // label="Age"
                inputProps={{ 
                  'aria-label': 'Without label',
                }}
              >
                <MenuItem style={{backgroundColor: '#001D32'}} value={10}>Place your bid</MenuItem>
                <MenuItem style={{backgroundColor: '#001D32'}} value={20}>BUY NFT</MenuItem>
              </Select>
            </div>
            <div>
              <TextField
                id="standard-full-width"
                className={classes.contractID}
                variant="outlined"
                placeholder="CONTRACT ID"
                fullWidth
                margin="normal"
                // InputLabelProps={{                
                //   shrink: true,
                //   classes: {
                //     root: classes.cssLabel,
                //     focused: classes.cssFocused,
                //   },
                // }}
                InputProps={{
                  classes: {
                    root: classes.cssOutlinedInput,
                    focused: classes.cssFocused,
                    notchedOutline: classes.notchedOutline,
                  },
                }}
              />
            </div>
            <div align="left" justify="center">
              <a href="#" style={{ color: '#fff', marginLeft: 10}}>Select All</a>
            </div>
          </FormControl>
            <br/>
            {/* <FormHelperText>Placeholder</FormHelperText> */}

        </Grid>
        <Grid item xs={12} sm={4} md={4}>
          <Card className={classes.root}>
            <FormGroup className={classes.selectGroup}>
              <br/>
              <FormControlLabel
                control={<Checkbox color="primary" checked={gilad} onChange={handleChangeCheck} name="gilad" />}
                label="ETH"
              />
              <FormControlLabel
                control={<Checkbox color="primary" checked={jason} onChange={handleChangeCheck} name="jason" />}
                label="WETH"
              />
              <FormControlLabel
                control={<Checkbox color="primary" checked={antoine} onChange={handleChangeCheck} name="antoine" />}
                label="DAI"
              />
              <FormControlLabel
                control={<Checkbox color="primary" checked={antoine} onChange={handleChangeCheck} name="antoine" />}
                label="USDC"
              />
            </FormGroup>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FormatListBulletedIcon />  
              </IconButton>
              <IconButton aria-label="share">
                <Typography>Accessory</Typography>
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
              <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                <List className={classes.root}>
                  {[0, 1].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;

                    return (
                      <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            color="primary"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`Earring ${value + 1}`} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end" aria-label="comments">
                            <Typography>1989</Typography>
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
            </CardContent>
          </Collapse>
          </Card>
        </Grid>
        <Grid container item xs={12} sm={8} md={8} justify="flex-start">
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

                  <ListItemText style={{marginLeft: 20}} id={labelId} primary={`${value + 1}ETH`} />
                  <ListItemAvatar style={{marginLeft: 20}}>
                    <Avatar
                      alt={`Avatar n°${value + 1}`}
                      src={`/images/logged_in/image5.jpg`}
                      variant="square"
                      style={{marginLeft: 10}}
                    />
                  </ListItemAvatar>

                  </ListItem>
                </>
              );
            })}
          </List>
          {age > 10 && 
            <>
              <Grid container justify="center" alignItems="center">
                <Typography>Subtotal</Typography>
                <Typography style={{marginLeft:300}}>7ETH</Typography>
              </Grid>            
            {/* <ListItem  className={classes.list}>
              <Typography>Subtotal</Typography>
              <Typography style={{marginLeft:300}}>7ETH</Typography>
            </ListItem> */}
              {/* <ListItem  className={classes.list}> */}
                <Button size="large" color="primary" className={classes.button}>
                    BUY
                  </Button>
              {/* </ListItem> */}
            </>
          }
        </Grid>
      </Grid>

      <Grid container justify="center" >
      {age < 11 &&
          <div>
            <div>
              <TextField
                  id="standard-full-width"
                  className={classes.offer}
                  variant="outlined"
                  placeholder="YOUR OFFER"
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
            </div>
            <div style={{marginTop: 20}}>
              <Button size="large" color="primary" className={classes.button}>
                SEND
              </Button>
            </div>
          </div>
          }

      </Grid>
      
    </Box>
  );
}

export default Buy;
