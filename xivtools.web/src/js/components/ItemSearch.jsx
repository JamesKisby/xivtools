import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAsync } from "react-async";
import AddRaidItem from "./AddRaidItem";
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from "react-redux";
import { searchItems, updateRaidData, getRaidData } from "../actions/index";
import { makeStyles } from "@material-ui/core/styles";
import { VariableSizeList as List} from 'react-window';
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
    display: 'flex',
    flexDirection: 'column',
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
    paddingTop: '5px',
  },
  form: {
    padding: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));


export default function ItemSearch(props) {
  const { raid, pw, playerName } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [item, setItem] = useState(null);
  const [searchValues, setSearchValues] = useState({search: "", page: 1});
  const [count, setCount] = useState(1);
  const [selectedDate, handleDateChange] = useState(new Date("2020-01-01T00:00:00.000Z"));
  const itemSelector = useSelector(state => state.items.item);
  const updateSelector = useSelector(state => state.raid.update);

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    setItem(null);
    dispatch(searchItems({searchValues}));
  }

  const handleSubmitAdd = (event) => {
    event.preventDefault();
    const newItem = itemSelector[item];
    newItem.amount = count;
    newItem.trackerpw = pw;
    newItem.playername = playerName;
    newItem.date = selectedDate;
    newItem.manual = true;
    dispatch(updateRaidData(newItem));
    if (props.onClose) props.onClose();
  }

  useEffect(() => {
    if(item) {
      const loc = location.pathname.split("/")[3];
      const user = localStorage.getItem('user');
      console.log("useeffect", loc, user);
      dispatch(getRaidData({raidid: loc, user: user }));
    }
  },[updateSelector, item])

  const handleSearch = (event) => {
    setSearchValues({ [event.target.id]: event.target.value, page: 1 });
  }

  const handleAdd = (event) => {
    setCount(event.target.value);
  }

  const addItem = (event, index) => {
    setItem(index);
  }

  const itemCount = itemSelector.length;

  const getItemSize = index => rowSizes[index];

  const getChildSize = child => {
    return  48;
  }



  const Row = ({ index, style }) => (
    <>
    {raid ? (
      <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
          <ListItem id={itemSelector[index].id} button onClick={event => addItem(event, index)}>
              <img src={itemSelector[index].icon} />
            <ListItemText primary={itemSelector[index].name}/>
            <p>iLv. {itemSelector[index].levelitem} - {itemSelector[index].itemuicategory}</p>
          </ListItem>
      </div>
    ) : (
      <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
          <ListItem id={itemSelector[index].id} button component={Link} to={`/item/${itemSelector[index].id}`}>
              <img src={itemSelector[index].icon} />
            <ListItemText primary={itemSelector[index].name}/>
            <p>iLv. {itemSelector[index].levelitem} - {itemSelector[index].itemuicategory}</p>
          </ListItem>
      </div>
    )}
    </>
  );

  return(
    <Grid container spacing={2}>
      <Grid item xs={12}>
          {item !== null ? (
            <>
            <ListItem id={itemSelector[item].id}>
              <Badge
                color="secondary"
                badgeContent={count}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <img src={itemSelector[item].icon} />
              </Badge>
              <ListItemText primary={itemSelector[item].name}/>
              <p>iLv. {itemSelector[item].levelitem} - {itemSelector[item].itemuicategory}</p>
            </ListItem>

            <div className={classes.root}>
              <ButtonGroup>
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
              <form className={classes.form} onSubmit={handleSubmitAdd}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <DateTimePicker
                  autoOk
                  inputVariant="outlined"
                  label="Set Date and Time"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </MuiPickersUtilsProvider>
                <TextField
                  id="add"
                  label="add field"
                  type="add"
                  variant="outlined"
                  onChange={handleAdd}
                  value={count}/>
                <Button className={classes.button}type="submit" variant="contained" color="primary">
                  Add Item
                </Button>
              </form>
            </div>
            </>
          ) : (
            <>
            <form className={classes.form} onSubmit={handleSubmitSearch}>
              <TextField
                id="search"
                label="Search field"
                type="search"
                variant="outlined"
                onChange={handleSearch}
                value={searchValues.search}/>
              <Button className={classes.button}type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
            <List
              height={300}
              itemCount={itemCount}
              width={400}
              key={itemCount}
              itemSize={index => getChildSize(itemSelector[index])}
            >
              {Row}
            </List>
            </>
          )}
      </Grid>
    </Grid>
  );
}
