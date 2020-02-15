import React, { useCallback } from "react";
import { Card, Button } from "@material-ui/core";
import { Discord, api } from "../utils/auth";

export default function Login() {
  const handleDiscordLogin = useCallback(async () => {
    const qParams = [
      `redirect_uri=${Discord.REDIRECT_URI}`,
      `scope=${Discord.SCOPE}`,
      `state=discord`
    ].join("&");
    try {
      const response = await fetch(api + `/auth-url/discord?${qParams}`)
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
