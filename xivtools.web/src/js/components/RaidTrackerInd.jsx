import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";


const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  table: {

  },
  icon: {
    height: '40px',
    width: '40px',
  },
}));

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#252628',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

export default function RaidTracker({ name, el }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h4" color="inherit">
          {name}
        </Typography>
        <Table className={classes.table}>
          <TableHead>
            <StyledTableRow>
              <StyledTableCell> </StyledTableCell>
              <StyledTableCell>Item</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {el.map((i, ind) => (
              <StyledTableRow key={ind}>
                <StyledTableCell component="th" scope="row">
                  <img className={classes.icon} src={i.icons} />
                </StyledTableCell>
                <StyledTableCell>{i.itemnames}</StyledTableCell>
                <StyledTableCell>{i.itemquantities}</StyledTableCell>
                <StyledTableCell>{i.time}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Grid>
  );
}
