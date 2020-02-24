import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAsync } from "react-async";
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from "react-redux";
import { searchItems } from "../actions/index";
import { makeStyles } from "@material-ui/core/styles";
import { VariableSizeList as List} from 'react-window';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles(theme => ({
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


export default function ItemSearch() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [searchValues, setSearchValues] = useState({search: "", page: 1});
  const itemSelector = useSelector(state => state.items.item);

  const handleSubmitSearch = (event) => {
    event.preventDefault();
    dispatch(searchItems({searchValues}));
  }

  const handleSearch = (event) => {
    setSearchValues({ [event.target.id]: event.target.value, page: 1 });
  }

  const itemCount = itemSelector.length;

  const getItemSize = index => rowSizes[index];

  const getChildSize = child => {
    return  48;
  }

  const Row = ({ index, style }) => (
    <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
        <ListItem id={itemSelector[index].id} button component={Link} to={`/item/${itemSelector[index].id}`}>
            <img src={itemSelector[index].icon} />
          <ListItemText primary={itemSelector[index].name}/>
          <p>iLv. {itemSelector[index].levelitem} - {itemSelector[index].itemuicategory}</p>
        </ListItem>
    </div>
  );

  return(
    <Grid container spacing={2}>
      <Grid item xs={12}>

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
      </Grid>
    </Grid>
  );
}
