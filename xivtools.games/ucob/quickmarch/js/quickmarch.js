var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width;
var ch = canvas.height;
var playerX = cw/2;
var playerY = ch/2;
var player = 1;
var speed = 1;
var offSpeed = 1;
var deg = 0;
var npc = [];
var twisters = [];
var tethers = [{x:null,y:null},{x:null,y:null},{x:null,y:null}];
var angles = [230,130,255,105,285,75,310,50];
var scene = 1;
npc.push({x: null, y: null, status: 1, role: 1, control: false, tether: false,aoe:null,tempest:false});
npc.push({x: null, y: null, status: 1, role: 1, control: false, tether: false,aoe:null,tempest:false});
npc.push({x: null, y: null, status: 1, role: 2, control: false, tether: true,aoe:null,tempest:false});
npc.push({x: null, y: null, status: 1, role: 2, control: false, tether: true,aoe:null,tempest:false});
npc.push({x: null, y: null, status: 0, role: 3, control: false, tether: false,aoe:null,tempest:false});
npc.push({x: null, y: null, status: 1, role: 3, control: false, tether: false,aoe:null,tempest:false});
npc.push({x: null, y: null, status: 1, role: 3, control: false, tether: false,aoe:null,tempest:false});
npc.push({x: null, y: null, status: 1, role: 3, control: false, tether: false,aoe:null,tempest:false});
npc[Math.floor(Math.random()*4)+4].tempest = true;
npc[Math.floor(Math.random()*2)+2].tempest = true;
var arenaR = 200;
var opacity = 1;
var bounce= 0;
var lgth = 10;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var dpsTether = Math.floor(Math.random()*4) + 4;
npc[dpsTether].tether = true;
var img = new Image;
var earthshaker = new Image;
var megaflare = new Image;
var twister = new Image;
var nael = new Image;
var tempest = new Image;
var tank = new Image;
var heal = new Image;
var dps = new Image;
img.src = "img/ring.svg";
earthshaker.src = "img/earthshaker.png";
megaflare.src = "img/flare.png";
twister.src = "img/twister.png";
nael.src = "img/nael.gif";
tempest.src = "img/tempest.png";
tank.src = "img/tank.png";
heal.src = "img/heal.png";
dps.src = "img/dps.png";
var explosion = [];
for(var i = 0; i < 26; i++) {
  explosion[i] = new Image;
  explosion[i].src = "img/"+ i + ".gif";
}



function drawArena() {
  ctx.beginPath();
  ctx.arc(cw/2, ch/2, arenaR, 0, Math.PI*2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawNpc() {
  var diff = 0.8;
  for(var i = 0; i < npc.length; i++) {
    //if(i == player) continue;
    var n = npc[i];
    if(npc[i].status == 0) {
      n.x = playerX;
      n.y = playerY;
      continue;
    }
    ctx.beginPath();
    if(n.x == null) {
      n.x = cw/2 + Math.floor((Math.random()-0.5) * 50);
      n.y = ch/2 + Math.floor((Math.random()-0.5) * 50);
    }
    if(n.x2 != null && (n.x != n.x2 || n.y != n.y2)) {
      var d = moveNpc(n.x,n.y,n.x2,n.y2,diff);
      n.x = d.x;
      n.y = d.y;
      if(Math.abs(n.x - n.x2) < diff && Math.abs(n.y - n.y2) < diff) {
        n.x2 = n.x;
        n.y2 = n.y;
      }
    }
    ctx.arc(n.x, n.y, 5, 0, Math.PI*2);
    if(n.role == 1){
      ctx.fillStyle = "blue";
    } else if(n.role == 2) {
      ctx.fillStyle = "green";
    } else if(n.role == 3){
      ctx.fillStyle = "red";
    }
    ctx.fill();
    ctx.closePath();
    if(n.role == 1){
      ctx.save();
      ctx.translate(n.x,n.y);
      ctx.drawImage(tank,-10,-10,20,20);
      ctx.restore();
    }else if(n.role == 2) {
      ctx.save();
      ctx.translate(n.x,n.y);
      ctx.drawImage(heal,-10,-10,20,20);
      ctx.restore();
    }else if(n.role == 3) {
      ctx.save();
      ctx.translate(n.x,n.y);
      ctx.drawImage(dps,-10,-10,20,20);
      ctx.restore();
    }
  }



}

function moveNpc(x1,y1,x2,y2,pcnt) {
  var a = {x:x2-x1,y:y2-y1};
  if(a.x > 0) {
    x1 += pcnt;
  } else if(a.x < 0){
    x1 -= pcnt;
  }
  if(a.y > 0) {
    y1 += pcnt;
  } else if(a.y < 0){
    y1 -= pcnt;
  }
  return {x: x1, y: y1};
}

function drawPlayer() {
    ctx.beginPath();
    ctx.arc(playerX, playerY, 5, 0, Math.PI*2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function initNpc(ngl, dist) {
  for(var i = 0; i < npc.length; i++) {
    var n = npc[i];
    //if(i == player) continue;
    var angle = ngl[i];
    var d = Math.random()*5 + dist;
    n.x2 = cw/2 + (arenaR - d) * Math.sin(angle * Math.PI/180);
    n.y2 = ch/2 + (arenaR - d) * Math.cos(angle * Math.PI/180);
  }
}


function movePlayer() {
  let dx = playerX - cw/2;
  let dy = playerY - ch/2;
  let border = Math.sqrt(dx * dx + dy * dy);

  if(rightPressed) {
    if (border + speed < arenaR || dx < 0) {
      playerX += speed;
    } else if(dy > 0) {
      playerY -= offSpeed;
    } else if(dy < 0) {
      playerY += offSpeed;
    }
  }
  if(leftPressed) {
    if (border + speed < arenaR || dx > 0) {
      playerX -= speed;
    } else if(dy > 0) {
      playerY -= offSpeed;
    } else if(dy < 0) {
      playerY += offSpeed;
    }
  }
  if(downPressed) {
    if (border + speed < arenaR || dy < 0) {
      playerY += speed;
    } else if(dx > 0) {
      playerX -= offSpeed;
    } else if(dx < 0) {
      playerX += offSpeed;
    }
  }
  if(upPressed) {
    if (border + speed < arenaR || dy > 0) {
      playerY -= speed;
    } else if(dx > 0) {
      playerX -= offSpeed;
    } else if(dx < 0) {
      playerX += offSpeed;
    }
  }
}

function clearCircle() {
  ctx.beginPath();
  ctx.arc(cw/2,ch/2,50,2*Math.PI,false);
  ctx.fillStyle="#0095DD";
  ctx.closePath();
  ctx.fill();
}

function drawSlice(timer) {
  //if(scene == 5) scene++;
  if(tethers[0].x == null) {
    opacity = 1;
    var c = 0;
    for(var i = 0; i < 8; i++) {
      var n = npc[i];

      if(n.tether == true) {
        var dx = n.x - cw/2;
        var dy = n.y - ch/2;
        var ngl = Math.atan2(dy,dx);
        var nngl = Math.atan2(-dy,-dx);
        var cx = cw/2+50*Math.cos(nngl);
        var cy = ch/2+50*Math.sin(nngl);
        ctx.beginPath();
        ctx.fillStyle= 'rgba(255,255,200, ' + opacity + ')';
        ctx.moveTo(cx,cy);
        ctx.arc(cw/2,ch/2,arenaR,ngl-(Math.PI/5),ngl+(Math.PI/5),false);
        ctx.closePath();
        ctx.fill();
        tethers[c].x = n.x;
        tethers[c].y = n.y;
        c++;
      }

    }
  } else if(timer < 25500 && opacity > 0){
    for(var i = 0; i < 3; i++) {
      var n = tethers[i];
      var dx = n.x - cw/2;
      var dy = n.y - ch/2;
      var ngl = Math.atan2(dy,dx);
      var nngl = Math.atan2(-dy,-dx);
      var cx = cw/2+50*Math.cos(nngl);
      var cy = ch/2+50*Math.sin(nngl);
      ctx.beginPath();
      ctx.fillStyle= 'rgba(255,255,200, ' + opacity + ')';
      ctx.moveTo(cx,cy);
      ctx.arc(cw/2,ch/2,arenaR,ngl-(Math.PI/5),ngl+(Math.PI/5),false);
      ctx.closePath();
      ctx.fill();
    }
    if(opacity > 0) opacity -= 0.01;

  }


}

function drawTwisters(timer) {
    if(twisters.length == 0) {
      var rnd;
      for(var i = 0; i < 5; i++) {
        while(true){
          rnd = Math.floor(Math.random()*8);
          if(npc[rnd].twister == null) {
            twisters[i] = {x:npc[rnd].x,y:npc[rnd].y};
            break;
          }
        }
      }
    }else if(timer > 14500 && timer <= 21000){
      for(var i = 0; i < twisters.length; i++) {
        ctx.save();
        ctx.translate(twisters[i].x,twisters[i].y);
        ctx.rotate(deg);
        deg = (deg + Math.PI/20)%(2*Math.PI);
        ctx.drawImage(twister,-20,-20,40,40);
        ctx.restore();
      }

    }
}

function drawFlare(timer) {
  if(scene == 5 || scene == 6 || scene == 7 && timer < 20000) {
    for(var i = 0; i < 8; i++) {
      if(npc[i].tether == false && npc[i].role == 3) {
        ctx.save();
        ctx.translate(npc[i].x,npc[i].y-bounce);
        bounce += 0.1;
        ctx.drawImage(megaflare,-20,-20,40,40);
        ctx.restore();
      }
    }
    if(bounce > 10 || bounce < -10) bounce = -bounce;
  }
}

function drawShakerPuddles(timer) {
  if(scene == 8) {
    for(var i = 0; i < 8; i++) {
      if(npc[i].tether) {
        npc[i].tether = {x:npc[i].x,y:npc[i].y};
      }
    }
    scene++;
  }else if(timer >24000 && timer < 34000) {
    for(var i = 0; i < 8; i++) {
      var n = npc[i];
      if(n.tether) {
        if(timer < 25000) {
          if(i < 5) {
            var angle = angles[i];
          }else {
            var angle = 180;
          }
          n.x2 = cw/2 + (arenaR - 30) * Math.sin(angle * Math.PI/180);
          n.y2 = ch/2 + (arenaR - 30) * Math.cos(angle * Math.PI/180);
        }
        ctx.beginPath();
        ctx.arc(n.tether.x,n.tether.y,15,2*Math.PI,false);
        ctx.fillStyle="orange";
        ctx.closePath();
        ctx.fill();
      }
    }
  }
}

function drawShakers(timer) {
    if(scene == 6) {
      for(var i = 0; i < 8; i++) {
        if(npc[i].tether && npc[i].role == 3) {
          npc[i].x2 =cw/2;
          npc[i].y2 = ch/2 - 100;
        }
      }
      npc[0].x2 = cw/2 - 80;
      npc[0].y2 = ch/2;
      npc[1].x2 = cw/2 + 80;
      npc[1].y2 = ch/2;
      npc[2].x2 = cw/2 - 180;
      npc[2].y2 = ch/2;
      npc[3].x2 = cw/2 + 180;
      npc[3].y2 = ch/2 ;

      scene++;
    }
    for(var i = 0; i < 8; i++) {
      if(npc[i].tether == true) {
        ctx.save();
        ctx.translate(npc[i].x,npc[i].y-bounce);
        bounce += 0.1;
        ctx.drawImage(earthshaker,-20,-20,40,40);
        ctx.restore();
      }
    }
    if(bounce > 10 || bounce < -10) bounce = -bounce;

}

function drawRing() {
  if(scene == 1 || scene > 3){
    var dx = playerX - cw/2;
    var dy = playerY - ch/2;
    var ngl = Math.atan2(dy,dx);

    ctx.save();
    ctx.translate(cw/2,ch/2);
    ctx.rotate(ngl);
    ctx.drawImage(img,-50,-50,100,100);
    ctx.restore();
  }else if(scene == 3) {
    ctx.beginPath();
    ctx.arc(cw/2,ch/2,50,2*Math.PI,false);
    ctx.fillStyle="#0095DD";
    ctx.closePath();
    ctx.fill();
  }
}

function drawClock(time) {
  ctx.font = "16px Arial";
  ctx.fillStyle = "#0095DD";
  ctx.fillText("Time: " + time.toFixed(2), 8, 20);
}

function drawExplosion(timer) {
  if(timer > 18200 && timer < 18900) {
    for(var i = 0; i < 8; i++) {
      var n = npc[i];
      if(n.aoe != null) {
        ctx.save();
        ctx.translate(n.aoe.x,n.aoe.y);
        if(!!explosion[Math.round(Date.now())%explosion.length]) {
          ctx.drawImage(explosion[Math.round(Date.now())%explosion.length], -25,-25,50,50);
        }
        ctx.restore();
      }
    }
  }
  if(timer > 20200 && scene == 7) {
    for(var i = 0; i < 8; i++) {
      var n = npc[i];
      if(n.tether == false && n.role == 3) {
        n.megat = {x:n.x,y:n.y};
      }
    }
    scene++;
  }
  if(timer > 20200 && timer < 21000 && scene == 8) {
    for(var i = 0; i < 8; i++) {
      var n = npc[i];
      if(n.megat) {
        ctx.save();
        ctx.translate(n.megat.x,n.megat.y);
        if(!!explosion[Math.round(Date.now())%explosion.length]) {
          ctx.drawImage(explosion[Math.round(Date.now())%explosion.length], -25,-25,50,50);
        }
        ctx.restore();
      }
    }
  }
}

function drawTempest(timer) {
  if(timer > 18200 && timer < 26000) {
    findTempest(npc[0], timer, -80);
    findTempest(npc[1], timer, 80);
    var gradient = ctx.createLinearGradient(0,25,25,0);
    gradient.addColorStop("0","green");
    gradient.addColorStop("0.5","blue");
    gradient.addColorStop("1","green");
    for(var i = 0; i < 8; i++) {
      if(npc[i].tempest) {
        var dx = npc[i].x - cw/2;
        var dy = npc[i].y - ch/2;
        var ngl = Math.atan2(dy,dx);
        ctx.beginPath();
        ctx.moveTo(cw/2,ch/2);
        ctx.lineTo(npc[i].x, npc[i].y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function sqr(x) { return x*x}
function dist2(v,w) {return sqr(v.x - w.x) + sqr(v.y - w.y)}
function distToTempest(p, v, w) {
  var l2 = dist2(v, w);
  if(l2 == 0) return dist2(p, v);
  var t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
  t = Math.max(0, Math.min(1, t));
  var d = dist2(p, {x: v.x + t * (w.x - v.x), y: v.y + t * (w.y - v.y)});
  return { x: v.x + t * (w.x - v.x),y: v.y + t * (w.y - v.y) ,dist: d};
}

function findTempest(mt, timer, dist) {
  if(timer > 20300) {
    var c = {x:cw/2,y:ch/2};
    if(!mt.tempest) {
      var min = Number.MAX_VALUE;
      var mind = null;
      var n;
      for(var i = 2; i < 8; i++) {
        if(npc[i].tempest) {
          var dx = npc[i].x - c.x;
          var dy = npc[i].y - c.y;
          var angle = Math.atan2(dy, dx);
          var v = { x: c.x + 20 * Math.cos(angle) , y: c.y + 20 * Math.sin(angle)};
          var d = distToTempest(mt, v, npc[i]);
          if(d.dist < min) {
            min = d.dist;
            mind = d;
            n = npc[i];
          }
        }
      }
      mt.x2 = mind.x;
      mt.y2 = mind.y;

      if(mind.dist < 5) {
        mt.tempest = true;
        n.tempest = false;
        mt.x2 = cw/2 + dist;
        mt.y2 = ch/2;

      }
    }
  }
}

function drawTempestBoom(timer) {
  if(scene == 9) {
    for(var i = 0; i < 8; i++) {
      if(npc[i].tempest) {
        npc[i].tempest = {x:npc[i].x,y:npc[i].y};
      }
    }
    scene++;
    opacity = 1;
  }else if(timer > 26000 && opacity > 0 && timer < 27500){
    for(var i = 0; i < 8; i++) {
      if(npc[i].tempest){
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(npc[i].tempest.x,npc[i].tempest.y);
        ctx.drawImage(tempest,-80,-80,160,160);
        ctx.restore();
      }
    }
    if(opacity > 0) opacity -= 0.01;

  }
}

function drawNael(timer) {
  if(scene == 5) {
    for(var i = 0; i < 8; i++) {
      if(npc[i].tether == false && npc[i].role == 3) {
        var rnd = Math.floor(Math.random()*5);
        npc[i].x2 =cw/2 + rnd;
        npc[i].y2 = ch/2 + 80 + rnd;
      }
    }
    var rnd;
    for(var i = 0; i < 4; i++) {
      while(true){
        rnd = Math.floor(Math.random()*8);
        if(npc[rnd].nael == null) {
          npc[rnd].nael = {x:npc[rnd].x,y:npc[rnd].y};
          break;
        }
      }
    }
    scene++;
    opacity = 1;
  }else if(timer > 17000 && opacity > 0 && timer < 18000){

    for(var i = 0; i < 8; i++) {
      if(npc[i].nael){
        ctx.save();
        ctx.globalAlpha = opacity;
        ctx.translate(npc[i].nael.x,npc[i].nael.y);
        ctx.drawImage(nael,-80,-40,160,80);
        ctx.restore();
      }
    }
    if(opacity > 0) opacity -= 0.01;

  }

}

function drawAoe(timer) {
  if(scene == 4) {
    for(var i = 0; i < 4; i++) {
      var rnd;
      while(true){
        rnd = Math.floor(Math.random()*8);
        if(npc[rnd].aoe == null) {
          break;
        }
      }
      npc[rnd].aoe = {x:npc[rnd].x,y:npc[rnd].y};
      var angle = angles[rnd];
      var d = Math.random()*5 + 100;
      npc[rnd].x2 = cw/2 + (arenaR - d) * Math.sin(angle * Math.PI/180);
      npc[rnd].y2 = ch/2 + (arenaR - d) * Math.cos(angle * Math.PI/180);
      ctx.beginPath();
      ctx.arc(npc[rnd].x,npc[rnd].y,25,2*Math.PI,false);
      ctx.fillStyle="orange";
      ctx.closePath();
      ctx.fill();
    }
    scene++;
  }else if(timer < 18200) {
    for(var i = 0; i < 8; i++) {
      var n = npc[i];
      if(n.aoe != null) {
        ctx.beginPath();
        ctx.arc(n.aoe.x,n.aoe.y,25,2*Math.PI,false);
        ctx.fillStyle="orange";
        ctx.closePath();
        ctx.fill();
      }
    }
  }

}


function drawDive(lgth) {
  if(lgth > ch) {
    opacity -= 0.05;
    if(opacity == 0) return;
  }
  var target;
  if(scene == 2){
    var rnd = Math.floor(Math.random()*8);
    target = npc[rnd];
    npc[rnd].target = {x:npc[rnd].x, y:npc[rnd].y};
    scene++;
  }
  if(scene == 4){
    for(i = 0; i < 8; i++){
      if(npc[i].target != null) {
        target = npc[i];
        break;
      }
    }

    cx =  cw/2;
    cy = ch/2 - arenaR;
    dx = target.target.x - cw/2;
    dy = target.target.y - (ch/2 - arenaR);
    var ngl = Math.atan2(dy,dx);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.fillStyle= 'rgba(255,255,200, ' + opacity + ')';

    ctx.rotate(ngl);
    ctx.fillRect(0, -(arenaR/20*18)/2, lgth, arenaR/20*18);
    ctx.restore();
  }


}

function draw(timer) {
  ctx.clearRect(0, 0, cw, ch);
  //console.log(scene);

  drawClock(timer/1000);
  drawArena();
  drawExplosion(timer);
  drawTempest(timer);
  if(scene == 2 || scene == 4) {
    drawDive(lgth+=25);
  }
  if(timer > 16000){
    drawAoe(timer);
    drawFlare(timer);
    drawNael(timer);

  }

  if(timer > 24000){
    drawSlice(timer);
    drawShakerPuddles(timer);
  }
  if(timer > 26000){
    drawTempestBoom(timer);
  }
  drawRing();
  //clearCircle();
  drawNpc();

  if(timer > 18000 && timer < 24000){
    drawShakers(timer);
  }

  if(timer > 7000 && scene == 1) {
    initNpc(angles,30);
    scene++;
  }
  if(timer > 14000 && scene == 3) {
    initNpc(angles,60);
    scene++;
  }
  if(timer > 14000) {
    drawTwisters(timer);
  }

  drawPlayer();
  movePlayer();
  if(timer >= 35000) {
    alert("GAME OVER");
    document.location.reload();
  }
  requestAnimationFrame(draw);
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = true;
  }
  else if(e.key == "left" || e.key == "ArrowLeft") {
    leftPressed = true;
  }
  else if(e.key == "up" || e.key == "ArrowUp") {
    upPressed = true;
  }
  else if(e.key == "down" || e.key == "ArrowDown") {
    downPressed = true;
  }
}

function keyUpHandler(e) {
  if(e.key == "Right" || e.key == "ArrowRight") {
    rightPressed = false;
  }
  else if(e.key == "left" || e.key == "ArrowLeft") {
    leftPressed = false;
  }
  else if(e.key == "up" || e.key == "ArrowUp") {
    upPressed = false;
  }
  else if(e.key == "down" || e.key == "ArrowDown") {
    downPressed = false;
  }
}


draw();
