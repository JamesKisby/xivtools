import React, { useState, useEffect } from "react";
import Unity, { UnityContext } from 'react-unity-webgl';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";


const unityContext = new UnityContext({
  loaderUrl: "https://xivtools.com/training/ucob/heavensfall/Builds.loader.js",
  dataUrl: "https://xivtools.com/training/ucob/heavensfall/Builds.data",
  frameworkUrl: "https://xivtools.com/training/ucob/heavensfall/Builds.framework.js",
  codeUrl: "https://xivtools.com/training/ucob/heavensfall/Builds.wasm",
});

export default function Canvas({ match }) {
  const url = "https://xivtools.com/training/" + match.params.raidname + "/" + match.params.mechanic + "/index.html";

  const [progression, setProgression] = useState(0);
  unityContext.on("progress", progressionVal => {
    setProgression(progressionVal * 100);
  });

  const onFullScreen = () => {
    unityContext.setFullScreen(true);
  }

  return (
    <div>
      {match.params.mechanic !== "heavensfall" ?
        (<iframe src={url} width="500" height="500" ></iframe>)
        :
        (<>
          <Unity
            unityContext={unityContext}
            style={{
              height: "100%",
              width: 950,
              border: "2px solid black",
              background: "grey",
            }}
          />
          <button id="fullScreenButton" onClick={onFullScreen}></button>
        </>)
      }
    </div>
  );
}
