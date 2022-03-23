import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAsync } from "react-async";
import AddRaidItem from "./AddRaidItem";
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from "react-redux";
import { searchItems, updateRaidData, getRaidData } from "../actions/index";
import { makeStyles } from "@material-ui/core/styles";
import { VariableSizeList as List} from 'react-window';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Badge from '@material-ui/core/Badge';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Popover from '@material-ui/core/Popover';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";


const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiBadge-root': {
      marginRight: theme.spacing(4),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  button: {
    margin: theme.spacing(2),
    display: 'flex',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 200,
  },
  buttonGroup: {
    margin: theme.spacing(2),
  },
  form: {
    '& .MuiTextField-root': {
      margin: theme.spacing(2),
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 300,
      display: 'flex',
    },
  },
  image: {
    marginRight: '10px',
  },
}));


export default function ItemSearch(props) {
  const { raid, pw, playerName, add, job } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const [name, setName] = useState("");
  const [searchValues, setSearchValues] = useState("");
  const [search, setSearch] = useState("");
  const [addName, setAddName] = useState(add);
  const [count, setCount] = useState(1);
  const [result, setResult] = useState([]);
  const [newJob, setNewJob] = useState(job === null ? "PLD" : job);
  const [selectedDate, handleDateChange] = useState(new Date("2020-01-01T00:00:00.000Z"));
  const itemSelector = useSelector(state => state.items.item);
  const updateSelector = useSelector(state => state.raid.update);

  const handleJobChange = (event) => {
    setNewJob(event.target.value);
  }

  const handleSubmitAdd = (event) => {
    event.preventDefault();
    const newItem = result[item];
    newItem.amount = count;
    newItem.trackerpw = pw;
    newItem.playername = name;
    newItem.date = selectedDate;
    newItem.manual = true;
    newItem.classjob = newJob;
    dispatch(updateRaidData(newItem));
    if (props.onClose) props.onClose();
  }

  const handleSubmitAddName = (event) => {
    event.preventDefault();
    setAddName(false);
  }

  useEffect(() => {
    if(item) {
      const loc = location.pathname.split("/")[3];
      const user = localStorage.getItem('user');
      console.log("useeffect", loc, user);
      dispatch(getRaidData({raidid: loc, user: user }));
    }
  },[updateSelector, item])

  useEffect(() => {
    setResult(itemSelector);
  },[itemSelector])

  const handleSearch = (event) => {
    if(name === "") {
      console.log("name === nul setting", playerName);
      setName(playerName);
    }
    setSearchValues(event.target.value);
    if(event.target.value.length === 3) {
      if(search !== event.target.value){
        dispatch(searchItems(event.target.value));
        setSearch(event.target.value);
      }

    }
    if(event.target.value.length >= 3) {
      if(searchValues.length < event.target.value.length){
        if(itemSelector.length > 98) {
          dispatch(searchItems(event.target.value));
        }else {
          let re = new RegExp('^' + event.target.value, 'i');
          setResult(itemSelector.filter((str) =>{
            return re.test(str.name);
          }));
        }
      }
      if(searchValues.length >= event.target.value.length){
        //filter itemselector by value. if === then dispatch
        let re = new RegExp('^' + event.target.value, 'i');
        setResult(itemSelector.filter((str) =>{
          return re.test(str.name);
        }));
        if(result.length === itemSelector.length) {
          dispatch(searchItems(event.target.value));
        }
      }
    }
  }

  const handleAddName = (event) => {
    setName(event.target.value);
  }

  const handleAdd = (event) => {
    setCount(event.target.value);
  }

  const addItem = (event, index) => {
    setItem(index);
  }

  const itemCount = result.length;

  const getItemSize = index => rowSizes[index];

  const getChildSize = child => {
    return  75;
  }



  const Row = ({ index, style }) => (
    <>
    {raid ? (
      <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
          <ListItem id={result[index].id} button onClick={event => addItem(event, index)}>
              <img src={result[index].icon} />
            <ListItemText primary={result[index].name}/>
            <p>iLv. {result[index].levelitem} - {result[index].itemuicategory}</p>
          </ListItem>
      </div>
    ) : (
      <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
          <ListItem id={result[index].id} button onClick={props.onClose} component={Link} to={`/item/${result[index].id}`}>
              <img src={result[index].icon} />
            <ListItemText primary={result[index].name}/>
            <p>iLv. {result[index].levelitem} - {result[index].itemuicategory}</p>
          </ListItem>
      </div>
    )}
    </>
  );

  return(
    <Grid container spacing={0} direction="column">
          {item !== null ? (
            <>
            <Grid item xs={12}>
            <ListItem className={classes.root} id={result[item].id}>
              <Badge
                color="secondary"
                badgeContent={count}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <img className={classes.image} src={result[item].icon} />
              </Badge>
              <ListItemText primary={result[item].name}/>
              <p>iLv. {result[item].levelitem} - {result[item].itemuicategory}</p>
            </ListItem>
            </Grid>
            <Grid item xs={12}>
              <form className={classes.form} onSubmit={handleSubmitAdd}>
                <div>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DateTimePicker
                    autoOk
                    inputVariant="outlined"
                    label="Set Date and Time"
                    value={selectedDate}
                    onChange={handleDateChange}
                  />
                </MuiPickersUtilsProvider>
                </div>
                <div>
                <TextField
                  id="add"
                  label="Amount"
                  type="add"
                  variant="outlined"
                  onChange={handleAdd}
                  value={count}
                />
                </div>
                <div>
                <ButtonGroup className={classes.buttonGroup}>
                  <Button
                    aria-label="reduce"
                    onClick={() => {setCount(Math.max(count -1, 1));}}
                  >
                    <RemoveIcon fontSize="small" />
                  </Button>
                  <Button
                    aria-label="increase"
                    onClick={() => {setCount(count + 1);}}
                  >
                    <AddIcon fontSize="small" />
                  </Button>
                </ButtonGroup>
                </div>
                <InputLabel>Select Job</InputLabel>
                <Select
                  value={newJob}
                  onChange={handleJobChange}
                >
                  <MenuItem value={"PLD"}>PLD</MenuItem>
                  <MenuItem value={"WAR"}>WAR</MenuItem>
                  <MenuItem value={"DRK"}>DRK</MenuItem>
                  <MenuItem value={"GNB"}>GNB</MenuItem>
                  <MenuItem value={"WHM"}>WHM</MenuItem>
                  <MenuItem value={"SCH"}>SCH</MenuItem>
                  <MenuItem value={"AST"}>AST</MenuItem>
                  <MenuItem value={"MNK"}>MNK</MenuItem>
                  <MenuItem value={"DRG"}>DRG</MenuItem>
                  <MenuItem value={"NIN"}>NIN</MenuItem>
                  <MenuItem value={"SAM"}>SAM</MenuItem>
                  <MenuItem value={"BRD"}>BRD</MenuItem>
                  <MenuItem value={"MCH"}>MCH</MenuItem>
                  <MenuItem value={"DNC"}>DNC</MenuItem>
                  <MenuItem value={"BLM"}>BLM</MenuItem>
                  <MenuItem value={"SMN"}>SMN</MenuItem>
                  <MenuItem value={"RDM"}>RDM</MenuItem>
                </Select>
                <div>
                <Button className={classes.button}type="submit" variant="contained" color="primary">
                  Add Item
                </Button>
                </div>
              </form>
            </Grid>
            </>
          ) : (
            <>
            {addName ? (
              <>
              <Grid item xs={12}>
                <Typography component="h1" variant="h6">
                  Enter Player Name:
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <form className={classes.form} onSubmit={handleSubmitAddName}>
                  <TextField
                    id="name"
                    label="name"
                    type="name"
                    variant="outlined"
                    onChange={handleAddName}
                    value={name}/>
                  <Button className={classes.button}type="submit" variant="contained" color="primary">
                    Submit
                  </Button>
                </form>
              </Grid>
              </>
            ) : (
              <>
              <Grid item xs={12}>
                <Typography component="h1" variant="h6">
                  Search Items:
                </Typography>
              </Grid>
              <Grid item xs={12}>
              <form className={classes.form}>
                <TextField
                  id="search"
                  label="Search field"
                  type="search"
                  variant="outlined"
                  onChange={handleSearch}
                  value={searchValues}
                  autoFocus/>
              </form>
              </Grid>
              <Grid item xs={12}>
              <List
                height={300}
                itemCount={itemCount}
                width={400}
                key={itemCount}
                itemSize={index => getChildSize(result[index])}
              >
                {Row}
              </List>
              </Grid>
              </>
            )}
            </>
          )}
    </Grid>
  );
}
