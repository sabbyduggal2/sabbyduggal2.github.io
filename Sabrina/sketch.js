// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyCXzoP0hJfje-lYr3dO3I-Rt86iVa7KesQ",
  authDomain: "jkbh-6b321.firebaseapp.com",
  databaseURL: "https://jkbh-6b321.firebaseio.com",
  projectId: "jkbh-6b321",
  storageBucket: "jkbh-6b321.appspot.com",
  messagingSenderId: "517824479475",
  appId: "1:517824479475:web:8a4d5534493f0217"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let database = firebase.database()

let sabrina=document.getElementById("sabrina") 
let scoreboard={ }
let x 
let y
let z
let u
let score
let direction
let direction2 
let s 
let h
let enemy 
let level
let time

function setup() {
  createCanvas(windowWidth, windowHeight);
  x=600
  y=100
  z=15
  u=10
  s=[200,500,600,800,1000,1100,1200,1300,1400,1500]
  h=[300,400,500,700,900,1050,2000,3000,4000]
  score=0
  direction=[1,1,1,1,-1,-1,1,1,1,1,1,-1,1,1,1,1,1,1,-1,1,1,1]
  direction2 = 1
  enemy=1
  level=1
  time=60
  
}

function draw() {
  if (time>0) {
  background(62, 146, 57);
  textSize(30)
  text("Score:" +score,20,35)
  time=time-0.08
  text("Time:" +time.toFixed(0),0,100)
  fill(10, 60, 50)
  if(keyIsDown(LEFT_ARROW)) {
    x = x-8 
  }
  if(keyIsDown(RIGHT_ARROW)) {
    x = x+8
  }
  if(keyIsDown(UP_ARROW)) {
    y = y-8
  }
  if(keyIsDown(DOWN_ARROW)) {
    y = y+8
  }
  if (u>height || u<0) {
    direction2 = direction2 *-1
  }
  circle(x,y,50)
  u=u+1*direction2
  square(z,u,100)
  for (i=0; i<enemy; i=i+1) {
    circle(s[i],h[i],35)
    h[i]=h[i]+4*direction[i]
    if (h[i]>height || h[i]<0) {
        direction[i] = direction[i] *-1
    }
    if (dist(x,y,s[i],h[i])<50+35) {
      score=score-1
    }

  
  }

  if(dist(x,y,z,u)<50+100) {
    score=score+1
  }
  
  if(score>200&& level==1) {
    enemy=enemy + 1
    s.push.apply(s,[200])
    h.push.apply(h,[300])
    level=2
    x=500
  }
  if(score>400&& level==2) {
    enemy=enemy + 3
    s.push.apply(s,[400])
    h.push.apply(h,[300])
    level=3
    x=700
  }
  if(score>600&& level==3) {
    enemy=enemy + 8
    s.push.apply(s,[400])
    h.push.apply(h,[300,500,600,700,800,900,1000,11000])
    level=4
    x=700
  }
  if(score>800&& level==4) {
    enemy=enemy + 10
    s.push.apply(s,[200,500,600])
    h.push.apply(h,[300,400,500])
    level=5
    x=700
  }
  if(score>1000&& level==5) {
    enemy=enemy + 10
    s.push.apply(s,[50,500,600,800,1100,1200,1300,1400])
    h.push.apply(h,[300,400,500],700,900,1050,2000)
    level=6
    x=900
  }
  }
  else {
    sabrina.innerHTML = "Name? <input id = Shadina><button onclick='restart()'>Restart</button> <button onclick='generate_alltime_leaderboard()'>All-time leaderboard</button> "
    noLoop()
  }
}

function restart () {
  let Shadina = document.getElementById("Shadina")
  name = Shadina.value
  database.ref(name).set(score)
  if (name != "") {
    scoreboard[name] = score
  }
  alert(JSON.stringify(scoreboard,null,1))
  time= 60
  score=0
  loop ()
  sabrina.innerHTML = ""
  generate_leaderboard()
}


function generate_leaderboard() {
  scores = Object.values(scoreboard)
  names = Object.keys(scoreboard)
  if (scores.length >= 3) {
    let leaderboard = { }
    for (i=0; i<3; i=i+1) {
      max = Math.max (...scores)
      index = scores.indexOf(max)
      leaderboard[names[index]] = max
      names.splice(index,1)
      scores.splice(index,1)
    }
    alert("Leaderboard:" + JSON.stringify(leaderboard,null,1))
  }
}

function generate_alltime_leaderboard() {
	let alltime_leaderboard = { }
	database.ref().orderByValue().limitToLast(3).on("value", function(snapshot) {
		snapshot.forEach(function (data) {
			alltime_leaderboard[data.key] = data.val()
			
	});
});
if (Object.values(alltime_leaderboard).length > 0) {
	alert("All-time leaderboard: "+JSON.stringify(alltime_leaderboard,null,1))
}
}



  