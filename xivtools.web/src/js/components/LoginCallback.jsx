import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Discord } from "../utils/auth";
import { loginSuccess } from "../actions/index";


export default function LoginCallback({ location }) {
  localStorage.setItem('user', `${location.search}`);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginSuccess())
    fetch(`http://127.0.0.1:5000/api/v1/callback/${location.search}`, {
      credentials: "include"
    })
      .then(res => res.json())
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
