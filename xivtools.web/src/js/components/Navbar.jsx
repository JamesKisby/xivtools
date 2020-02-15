import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutSuccess, getUsersRaids } from "../actions/index";
import { Link } from "react-router-dom";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';


export default function Navbar({ match }) {
  const selector = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('user');
    dispatch(logoutSuccess());
    dispatch(getUsersRaids());
  }

  return (
    <div className="row">
      <AppBar style={{ background: '#232729'}} position="static">
        <Toolbar className="nav">

          {selector.is_authenticated ? (
            <div>
              <p>Welcome {selector.name}</p>
              <Button variant="contained" color="primary" onClick={handleLogout}>
                LOGOUT
              </Button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <Button
                  variant="contained"
                  className="navbar-nav ml-auto"
                  color="primary"
                  startIcon={<AccountCircleIcon />}
                >
                  Login
                </Button>
              </Link>
            </div>
          )}

        </Toolbar>
      </AppBar>
    </div>
  );
}
