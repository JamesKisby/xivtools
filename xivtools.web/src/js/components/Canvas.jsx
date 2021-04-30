import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


export default function Canvas({ match }) {
  const url = "https://xivtools.com/training/" + match.params.raidname + "/" + match.params.mechanic + "/index.html";


  return (
    <div>
      <iframe src={url} width="500" height="500" ></iframe>
    </div>
  );
}
