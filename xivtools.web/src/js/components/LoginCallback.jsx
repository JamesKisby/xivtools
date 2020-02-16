import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../utils/auth";
import { loginSuccess, loginComplete } from "../actions/index";


export default function LoginCallback({ location }) {
  localStorage.setItem('user', `${location.search}`);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginComplete(false))
    dispatch(loginSuccess())
    fetch(api + `/callback/${location.search}`)
      .then(res => res.json())
      .then(() => dispatch(loginComplete(true)))
      .catch(console.error);
  }, []);

  if (true) {
    return <Redirect to='/' />
  }

  return (
    <div>
    <p>Login Failed</p>
    </div>
  );
};
