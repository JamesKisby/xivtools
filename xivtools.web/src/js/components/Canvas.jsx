import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from 'react-unity-webgl';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    marginLeft  : theme.spacing(2),
  },
  typo: {
    color: 'white',
  },
}));

const unityContext = new UnityContext({
  loaderUrl: "https://xivtools.com/training/ucob/heavensfall/Builds.loader.js",
  dataUrl: "https://xivtools.com/training/ucob/heavensfall/Builds.data",
  frameworkUrl: "https://xivtools.com/training/ucob/heavensfall/Builds.framework.js",
  codeUrl: "https://xivtools.com/training/ucob/heavensfall/Builds.wasm",
});

export default function Canvas({ match }) {
  const classes = useStyles();
  const url = "https://xivtools.com/training/" + match.params.raidname + "/" + match.params.mechanic + "/index.html";
console.log(match.params.mechanic);
  const [progression, setProgression] = useState(0);
  unityContext.on("progress", progressionVal => {
    setProgression(progressionVal * 100);
  });

  const onFullScreen = () => {
    unityContext.setFullscreen(true);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {match.params.mechanic !== "heavensfall" ?
          (
            <iframe src={url} width="500" height="500" ></iframe>

          )
          :
          (<>

            <Unity
              unityContext={unityContext}
              style={{

                width: 950,
                border: "2px solid black",
                background: "grey",
              }}
            />

          </>)
        }
      </Grid>
      <Grid item xs={4}>
      <>
      {match.params.mechanic === "heavensfall" && progression >= 100 ?
        (<>
          <Button
            variant="contained"
            color="primary"
            id="fullScreenButton"
            onClick={onFullScreen}
          >
            Full Screen
          </Button>
          </>
        ) : (<></>)
      }
        </>
      </Grid>
      <Grid item xs={8}>
        {match.params.mechanic === "heavensfall" && progression < 100 ?
          (<>
            <Typography component="h1" variant="h6" className={classes.typo} noWrap>
              {`Loading... ${progression}`}
            </Typography>
            </>
          ) : (<></>)
        }
      </Grid>
    </Grid>

  );
}
