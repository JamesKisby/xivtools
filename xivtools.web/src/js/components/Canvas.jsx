import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


export default function Canvas({ match }) {
  const url = "https://xivtools.com/resources/" + match.params.raidname + "/" + match.params.mechanic + "/index.html";

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "/src/js/training/" + match.params.raidname + "/" + match.params.mechanic + ".js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, [match.params.mechanic]);


  return (
    <div>
      <iframe src={url} width="480" height="480" ></iframe>
    </div>
  );
}
