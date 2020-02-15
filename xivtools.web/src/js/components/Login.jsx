import React, { useCallback } from "react";
import { Card, Button } from "@material-ui/core";


import { Discord } from "../utils/auth";

export default function Login() {
  const handleDiscordLogin = useCallback(async () => {
    const qParams = [
      `redirect_uri=${Discord.REDIRECT_URI}`,
      `scope=${Discord.SCOPE}`,
      `state=discord`
    ].join("&");
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/v1/auth-url/discord?${qParams}`)
        .then(response => response.json());
      //const url = await response.text();

      window.location.assign(response);
    } catch(e) {
      console.error(e);
    }
  }, []);


  return (
      <div>
        <Button variant="contained" color="primary" onClick={handleDiscordLogin}>
          Login with Discord
        </Button>
      </div>
  );
};
