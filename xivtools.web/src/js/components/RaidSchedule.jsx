import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRaidCalendar, deleteCalendarRows, updateRaidSchedule } from "../actions/index";
import PropTypes from 'prop-types';
import clsx from 'clsx';
import EGTrackerInd from "./EGTrackerInd";
import RaidInstructions from "./RaidInstructions";
import { lighten, withStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from "@material-ui/core/Checkbox";
import Toolbar from "@material-ui/core/Toolbar";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Popover from '@material-ui/core/Popover';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';



const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  table: {
    //maxWidth: 350,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {

    width: 90,
  },
  margin: {
    margin: theme.spacing(1),
  }
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
    //  backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    color: theme.palette.common.white,

  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
    : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

function createData(day, start, end, duration, type) {
  return { day, start, end, duration, type };
}

function getDuration(start, end) {
  var a = new Date("1970-01-01 " + start);
  var b = new Date("1970-01-01 " + end);
  return +((b - a) / 60 / 60 / 1000).toFixed(2) + "HR";
}

const headCells = [
  { id: 'day', numeric: false, label: 'Day'},
  { id: 'start', numeric: false, label: 'Start Time'},
  { id: 'end', numeric: false, label: 'End time'},
  { id: 'duration', numeric: false, label: 'duration'},
  { id: 'raid', numeric: false, label: 'Raid'},
]

function EnhancedTableHead(props) {
  const { pw, classes, onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
          <StyledTableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all items' }}
            />
          </StyledTableCell>
        {headCells.map(headCell => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
          //  sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </StyledTableCell >
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
  pw: PropTypes.string,
};



const EnhancedTableToolbar = props => {
  const classes = useToolbarStyles();
  const { pw, numSelected, handleDelete, setViewable, add } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAddItem = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;

  return (
    <Toolbar
      className={clsx(classes.root, {[classes.highlight]: numSelected > 0,})}
    >

      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          Raid Schedule
        </Typography>
      )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton aria-label="delete" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add To Schedule">
            <IconButton aria-label="Add Items Manually" onClick={() => {setViewable(true)}}>
              <AddBoxIcon />
            </IconButton>
          </Tooltip>
        )}

    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  pw: PropTypes.string,
  add: PropTypes.bool,
};


const RaidSchedule = ({ match, location }) => {
  const classes = useStyles();
  const authSelector = useSelector(state => state.auth);
  const raidSelector = useSelector(state => state.raid);
  const user = localStorage.getItem('user');
  const dispatch = useDispatch();
  const loc = location.pathname.split("/")[3];

  const [selected, setSelected] = React.useState([]);
  //const [rows, setRows] = useState([]);

  const handleSelectAllClick = (event) => {
    if(event.target.checked) {
      const newSelecteds = raidSelector.raidCalendar.schedule.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([])
  };

  const handleClick = (event, day) => {
    const selectedIndex = selected.indexOf(day);
    let newSelected = []

    if(selectedIndex === -1) {
      newSelected = newSelected.concat(selected, day);
    } else if(selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if(selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected)
  };

  const handleDelete = event => {
    const user = localStorage.getItem('user');
    const toDelete = {};
    toDelete.rows = raidSelector.raidCalendar.schedule.filter(el => selected.includes(el.id));
    toDelete.data = {user: user, raidid: loc}
    dispatch(deleteCalendarRows(toDelete));
    setSelected([]);
  };

  const saveClicked = () => {
    const data = {};
    data.start = newStartTime.toString().substr(16,5);
    console.log(data.start);
    data.end = newEndTime.toString().substr(16,5);
    data.day = day;
    data.raidid = loc;
    data.user = user;
    data.guildid = raidSelector.raidCalendar.guildid;
    dispatch(updateRaidSchedule(data));
    setViewable(false);
  }

  const isSelected = (day) => selected.indexOf(day) !== -1;

  useEffect(() => {
    dispatch(getRaidCalendar({raidid: match.params.userid, user: user }));
  }, [match.params.userid, raidSelector.update]);

  const [day, setDay] = useState('Monday');
  const [newStartTime, setNewStartTime] = useState(new Date(86400000));
  const [viewable, setViewable] = useState(false);
  const [newEndTime, setNewEndTime] = useState(new Date(86400000));
  const handleChange = event => {
    setDay(event.target.value);
  };

  return (
    <Grid item md={12} lg={6}>
    <Typography component="h1" variant="h3" color="primary" noWrap>
      {raidSelector.raidCalendar.raidname}
    </Typography>
    <EnhancedTableToolbar
      numSelected={selected.length}
      handleDelete={handleDelete}
      setViewable={setViewable}
    />
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <EnhancedTableHead
          classes={classes}
          numSelected={selected.length}
          onSelectAllClick={handleSelectAllClick}
          rowCount={raidSelector.raidCalendar.schedule.length}
        />
        <TableBody>
          {raidSelector.raidCalendar.schedule.map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <StyledTableRow
                hover
                onClick={(event) => handleClick(event, row.id)}
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.id}
                selected={isItemSelected}
              >
                <StyledTableCell padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId}}
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row" id={labelId}>
                  {row.day}
                </StyledTableCell>
                <StyledTableCell align="left">{row.start.slice(0,5)} ST</StyledTableCell>
                <StyledTableCell align="left">{row.end.slice(0,5)} ST</StyledTableCell>
                <StyledTableCell align="left">{getDuration(row.start, row.end)}</StyledTableCell>
                <StyledTableCell align="left">UCOB</StyledTableCell>
              </StyledTableRow>
            );
          })}
          {viewable &&
          <StyledTableRow
            key={"add"}
          >
            <StyledTableCell>
            </StyledTableCell>
            <StyledTableCell component="th" scope="row">
              <FormControl variant="outlined">
                <InputLabel id="day-input-label">Day</InputLabel>
                <Select
                  labelId="day-input-label"
                  id="day-input"
                  value={day}
                  onChange={handleChange}
                >
                  <MenuItem value={"Monday"}>Monday</MenuItem>
                  <MenuItem value={"Tuesday"}>Tuesday</MenuItem>
                  <MenuItem value={"Wednesday"}>Wednesday</MenuItem>
                  <MenuItem value={"Thursday"}>Thursday</MenuItem>
                  <MenuItem value={"Friday"}>Friday</MenuItem>
                  <MenuItem value={"Saturday"}>Saturday</MenuItem>
                  <MenuItem value={"Sunday"}>Sunday</MenuItem>
                </Select>
              </FormControl>
            </StyledTableCell>
            <StyledTableCell align="left">
              <Fragment>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                  ampm={false}
                  inputVariant="outlined"
                  minutesStep={5}
                  className={classes.textField}
                  label="Start time"
                  value={newStartTime}
                  onChange={setNewStartTime}
                />
                </MuiPickersUtilsProvider>
              </Fragment>
            </StyledTableCell>
            <StyledTableCell align="left">
              <Fragment>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <TimePicker
                  ampm={false}
                  inputVariant="outlined"
                  minutesStep={5}
                  className={classes.textField}
                  label="End time"
                  value={newEndTime}
                  onChange={setNewEndTime}
                />
                </MuiPickersUtilsProvider>
              </Fragment>
            </StyledTableCell>
            <StyledTableCell align="left"></StyledTableCell>
            <StyledTableCell align="left">UCOB</StyledTableCell>
          </StyledTableRow>
        }
        </TableBody>
      </Table>
    </TableContainer>
    {viewable &&
    <div>
    <Button
      variant="contained"
      color="primary"
      onClick={saveClicked}
      className={classes.margin}

    >
      Save
    </Button>
    <Button
      variant="outlined"
      color="secondary"
      onClick={() => {setViewable(false)}}
      className={classes.margin}
    >
      Cancel
    </Button>
    </div>
    }
    </Grid>
  );
}

export default RaidSchedule;
