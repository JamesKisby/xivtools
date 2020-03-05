import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ItemSearch from "./ItemSearch";
import Grid from "@material-ui/core/Grid";
import Badge from '@material-ui/core/Badge';
import Divider from '@material-ui/core/Divider';
import Popover from '@material-ui/core/Popover';
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";
import slots from "../../images/equipslots.png"
import bg from "../../images/bg.png"


const useStyles = makeStyles(theme => ({
  root: {
    margin: '0px',
    padding: '0px',
    border: '0px',
    outline: '0px',
    color: 'white',
    background: 'transparent',
    fontSize: '12px',
    fontFamily: 'Arial',
  },
  box: {
    boxShadow: '0px 0px 0px 20x rgba(0,0,0,0.1) inset,0px 1px 4px 0px rgba(0,0,0,0.1)',
    borderRadius: '6px',
    padding: '5px',
    marginBottom: '10px',
    width: '350px',
    height: '515px',
    backgroundColor: '#303030',
  },
  side: {
    width: '290px',
    margin: '0 auto',
  },
  class: {
    margin: '7px 0 2px 0',
    height: '38px',
  },
  charMain: {
    margin: '0 auto 10px',
    width: '290px',
  },
  arms: {
    float: 'left',
    backgroundSize: '473px auto',
    position: 'relative',
    width: '38px',
    height: '38px',
  },
  noArms: {
    filter: 'grayscale(100%)',
    opacity: '0.75',
    float: 'left',
    backgroundSize: '473px auto',
    position: 'relative',
    width: '38px',
    height: '38px',
  },
  border: {
    position: 'absolute',
    background: `url(${bg})`,
    top: '0',
    left: '0',
    display: 'block',
    width: '38px',
    height: '38px',
    backgroundSize: '38px auto',
  },
  icon: {
    position: 'absolute',
    top: '1px !important',
    left: '50% !important',
    display: 'block',
    width: '32px',
    height: '32px',
    marginLeft: '-16px',
  },
  noIcon: {
    filter: 'grayscale(100%)',
    opacity: '0.75',
    position: 'absolute',
    top: '1px !important',
    left: '50% !important',
    display: 'block',
    width: '32px',
    height: '32px',
    marginLeft: '-16px',
  },
  iconBottom: {
    width: '40px',
    height: '40px',
    borderRadius: '5px 20px 5px',
  },
  noIconBottom: {
    filter: 'grayscale(100%)',
    opacity: '0.75',
    width: '40px',
    height: '40px',
    borderRadius: '5px 20px 5px',
  },
  data: {
    marginLeft: '42px',
    fontSize: '12px',
    lineHeight: '1',
  },
  smallIcon: {
    margin: '2px 2px 0 0',
    float: 'left',
    width: '20px',
    height: '20px',
  },
  classJob: {
    float: 'left',
    display: 'block',
    width: '212px',
    height: 'auto',
  },
  sideIcons: {
    float: 'left',
    width: '36px',
  },
  sideIcon: {

    position: 'relative',
    width: '38px',
    height: '38px',
    backgroundSize: '38px auto',
    float: 'left',
    display: 'block',
  },
  mainImage: {
    float: 'left',
    position: 'relative',
    width: '210px',
    margin: '0 4px 0 4px',
  },
  img: {
    borderRadius: '12px',
  },
  currency: {
    margin: '0 6px',
    position: 'relative',
  },
}));

function getIcons(type, job) {
  if(job == null) {
    job = 'pld';
  }
  job = job.toLowerCase();
  if(type === 'icon') {
    return '/assets/' + job + '-icon.png';
  } else if(type === 'bg') {
    return '/assets/' + job + '-bg.png';
  } else if(type ==='stone') {
    return '/assets/' + job + '-stone.png';
  } else {
    return '/assets/' + job + '.png';
  }
}

function createData(id, icon, item, amount, date, rarity) {
  return { id, icon, item, amount, date, rarity};
}

function getSlot(id, icon, rows) {
  let r = {icon:icon ,amount: 0};
  for(let i = 0; i < rows.length; i++) {
    if(rows[i].id === id) {
      r.amount = rows[i].amount;
      return r;
    }
  }
  return r;
}


const Icons = props => {
  const classes = useStyles();
  const { slot, arms } = props;

  return (
    <div className={classes.sideIcon}>
        <img className={slot.amount > 0? classes.icon : classes.noIcon} src={slot.icon} alt="" width="34" height="34"/>
        <div className={classes.border}></div>
        {slot.amount > 0 &&
          <Badge
            color="primary"
            badgeContent={slot.amount}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
        </Badge>
      }
    </div>
  );
}

const LowerIcons = props => {
  const classes = useStyles();
  const { item } = props;
  return (
    <Grid item xs={2}>
      {item.amount > 0 ? (
        <Badge
          color="primary"
          badgeContent={item.amount}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <img className={item.amount > 0? classes.iconBottom : classes.noIconBottom} src={item.icon} alt="" width="34" height="34"/>
        </Badge>
      ) : (
          <img className={item.amount > 0? classes.iconBottom : classes.noIconBottom} src={item.icon} alt="" width="34" height="34"/>
        )
      }
    </Grid>
  );
}


export default function EGTrackerInd({ playerName, job, el, pw, add }) {
  const classes = useStyles();
  const selector = useSelector(state => state.raid.raidData);
  const [rows, setRows] = useState([]);
  const [head, setHead] = useState({icon:null, amount:null});
  const [body, setBody] = useState({icon:null, amount:null});
  const [hands, setHands] = useState({icon:null, amount:null});
  const [legs, setLegs] = useState({icon:null, amount:null});
  const [feet, setFeet] = useState({icon:null, amount:null});
  const [waist, setWaist] = useState({icon:null, amount:null});
  const [ear, setEar] = useState({icon:null, amount:null});
  const [neck, setNeck] = useState({icon:null, amount:null});
  const [bracelet, setBracelet] = useState({icon:null, amount:null});
  const [ring, setRing] = useState({icon:null, amount:null});
  const [weapon, setWeapon] = useState({icon:null, amount:null});
  const [tomestone, setTomestone] = useState({icon:null, amount:null});
  const [twine, setTwine] = useState({icon:null, amount:null});
  const [ester, setEster] = useState({icon:null, amount:null});
  const [glaze, setGlaze] = useState({icon:null, amount:null});
  const [crystal, setCrysal] = useState({icon:null, amount:null});
  const [fulmination, setFulmination] = useState({icon:null, amount:null});
  const [furor, setFuror] = useState({icon:null, amount:null});
  const [iconoclasm, setIconoclasm] = useState({icon:null, amount:null});
  const [refulgence, setRefulgence] = useState({icon:null, amount:null});
  const [anchorEl, setAnchorEl] = useState(null);

  const handleAddItem = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;

  useEffect(() => {
    if(el) {
      setRows(el.map((i) => (
        createData(i.ids, i.icons, i.itemnames, i.itemquantities, i.time, i.rarity)
      )));
    }
  },[selector]);

  useEffect(() => {
    setWeapon(getSlot(29693, '/assets/icons/026000/026557.png', rows));
    setHead(getSlot(29694, '/assets/icons/026000/026558.png', rows));
    setBody(getSlot(29695, '/assets/icons/026000/026559.png', rows));
    setHands(getSlot(29696, '/assets/icons/026000/026560.png', rows));
    setLegs(getSlot(29697, '/assets/icons/026000/026561.png', rows));
    setFeet(getSlot(29698, '/assets/icons/026000/026562.png', rows));
    setWaist(getSlot(29699, '/assets/icons/026000/026563.png', rows));
    setEar(getSlot(29700, '/assets/icons/026000/026564.png', rows));
    setNeck(getSlot(29701, '/assets/icons/026000/026565.png', rows));
    setBracelet(getSlot(29702, '/assets/icons/026000/026566.png', rows));
    setRing(getSlot(29703, '/assets/icons/026000/026567.png', rows));
    setTomestone(getSlot(29036, '/assets/icons/026000/026599.png', rows));
    setTwine(getSlot(29033, '/assets/icons/021000/021676.png', rows));
    setEster(getSlot(29032, '/assets/icons/027000/027627.png', rows));
    setGlaze(getSlot(29034, '/assets/icons/027000/027626.png', rows));
    setCrysal(getSlot(30107, '/assets/icons/020000/020011.png', rows));
    setFulmination(getSlot(29027, '/assets/icons/026000/026445.png', rows));
    setFuror(getSlot(29028, '/assets/icons/026000/026446.png', rows));
    setIconoclasm(getSlot(29029, '/assets/icons/026000/026447.png', rows));
    setRefulgence(getSlot(29030, '/assets/icons/026000/026448.png', rows));
  },[rows]);

  return (
    <Grid item sm={12} md={6} lg={4} xl={3}>
      <Popover
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <div>
          <ItemSearch add={add} job={job} raid={true} playerName={playerName} pw={pw} onClose={handleClose}/>
        </div>
      </Popover>
      <div className={classes.box}>
        <div className={classes.side}>
          <Grid container>
            <Grid item xs={9}>
            <p style={{fontSize: 25}} className={classes.root}>{playerName}</p>
            </Grid>
            <Grid item xs={3}>
              <Tooltip title="Add Items manually">
                <IconButton aria-label="Add Items Manually" onClick={handleAddItem}>
                  <AddBoxIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
          <Divider />
          <div className={classes.class}>
            <div className={weapon.amount > 0? classes.arms : classes.noArms}>
              <img className={classes.icon} src={weapon.icon} alt="" width="34" height="34"/>
              <div className={classes.border}></div>
              {weapon.amount > 0 &&
                <Badge
                  color="primary"
                  badgeContent={weapon.amount}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                    }}
                >
                </Badge>
              }
            </div>
            <div className={classes.data}>
              <p className={classes.root}>LEVEL 80</p>
              <div className={classes.smallIcon}>
                <img src={getIcons('icon',job)} alt="" width="20" height="20" />
              </div>
              <img className={classes.classJob} src={getIcons('',job)} alt="" width="256" height="28" />
            </div>
          </div>
          <div className={classes.charMain}>
            <div className={classes.sideIcons}>
              <Icons slot={head} arms={false}/>
              <Icons slot={body} arms={false}/>
              <Icons slot={hands} arms={false}/>
              <Icons slot={waist} arms={false}/>
              <Icons slot={legs} arms={false}/>
              <Icons slot={feet} arms={false}/>
            </div>
            <div className={classes.mainImage}>
              <img className={classes.img} src={getIcons('bg',job)} alt="" width="212" height="" />
            </div>
            <div className={classes.sideIcons}>
              <div className={classes.sideIcon}>
                <img className={classes.icon} src="/assets/icons/000000/000784.png" alt="" width="34" height="34"/>
                <div className={classes.border}></div>
              </div>
              <Icons slot={ear} arms={false}/>
              <Icons slot={neck} arms={false}/>
              <Icons slot={bracelet} arms={false}/>
              <Icons slot={ring} arms={false}/>
              <div className={classes.sideIcon}>
                <img className={classes.icon} src="/assets/icons/000000/000784.png" alt="" width="34" height="34"/>
                <div className={classes.border}></div>
              </div>
              <div className={classes.sideIcon}>
                <img className={classes.icon} src={getIcons('stone',job)} alt="" width="34" height="34"/>
                <div className={classes.border}></div>
              </div>
            </div>
          </div>
          <Grid container direction="row" justify="center" spacing={2}>
            <LowerIcons item={fulmination} />
            <LowerIcons item={furor} />
            <LowerIcons item={iconoclasm} />
            <LowerIcons item={refulgence} />
          </Grid>
          <Grid container direction="row" justify="center" spacing={2}>
            <LowerIcons item={tomestone} />
            <LowerIcons item={twine} />
            <LowerIcons item={ester} />
            <LowerIcons item={glaze} />
            <LowerIcons item={crystal} />
          </Grid>
        </div>
      </div>
    </Grid>
  );
}
