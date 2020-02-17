import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import act1 from "../../images/howtoact1.png";
import act2 from "../../images/howtoact.png";

export default function RaidInstructions(userid) {
  console.log("PARAMS", userid);
  return (
    <>
    <Grid item xs={12}>
      <Typography component="h1" variant="h3" color="inherit" noWrap>
        Instructions
      </Typography>
    </Grid>
    <Grid item xs={12}>
      <Typography component="h1" variant="h3" color="inherit" noWrap>
        Add the Kapture plugin to ACT and configure:
      </Typography>
      <p><a href="https://github.com/kalilistic/Kapture/releases" target="_blank">Download the latest release of kapture here.</a></p>
      <ul>
        <li>
        <p>Download the latest release of Kapture.dll from above. Save it to your ACT plugin directory.</p>
        </li>
        <li>
          <p>Open ACT. On the plugins tab, browse to Kapture.dll and then click Add/Enable plugin.</p>
        </li>
        <img src={act1} alt="act instructions 1" />
        <li>
          <p>With the plugin enabled, click on the Kapture tab.</p>
        </li>
        <li>
          <p>Make sure HTTP Enabled checkbox is checked. In the "Endpoint" field, copy and paste the following URL:</p>
        </li>
        <li>
          <p><a href="https://xivtools.com/api/v1/raid/tracker">https://xivtools.com/api/v1/raid/tracker</a></p>
        </li>
        <img src={act2} alt="act instructions 2" />
        <li>
          <p>In the Custom JSON field, copy and paste your unique Raid Team ID: (WARNING: Currently anyone with access to your ID can upload to your raid so be careful with who you share it with. A private setting is on the TODO list..)</p>
        </li>
        <li>
          <p>YOUR RAID ID: {userid.userid}</p>
        </li>
        <li>
          <p>Make sure the filters for Self, Party (if you want to track them) and Item are checked.</p>
        </li>
        <li>
          <p>Click on Advanced Filters/ Here you can add/remove zones or items you want to track/ignore.</p>
        </li>
        <li>
          <p>Thats it! When you or someone in your party gets a drop from any zone in your included zones, it will be automatically uploaded to yoru tracker. Happy Hunting!</p>
        </li>
      </ul>
    </Grid>
    </>
  );
}
