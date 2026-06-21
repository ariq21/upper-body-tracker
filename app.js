const workouts = {

"Upper A":[
"Bench Press",
"Incline Dumbbell Press",
"Chest Press Machine",
"DB Shoulder Press",
"Lateral Raise",
"Rope Pushdown",
"Overhead Tricep Extension"
],

"Upper B":[
"Lat Pulldown",
"Assisted Pull Up",
"Chest Supported Row",
"One Arm Cable Row",
"Face Pull",
"EZ Curl",
"Incline Curl"
],

"Legs":[
"Squat",
"Romanian Deadlift",
"Leg Press",
"Leg Curl",
"Calf Raise"
],

"Upper C":[
"Incline Barbell Press",
"Incline Dumbbell Press",
"Cable Fly",
"Machine Shoulder Press",
"Lateral Raise",
"Rear Delt Fly",
"Skull Crusher"
],

"Upper D":[
"Wide Grip Lat Pulldown",
"Close Grip Pulldown",
"Straight Arm Pulldown",
"Machine Row",
"Preacher Curl",
"Hammer Curl",
"Close Grip Smith Press",
"Rope Pushdown"
]

};

function loadWorkout(){

const workout =
document.getElementById("workoutSelect").value;

const container =
document.getElementById("exerciseContainer");

container.innerHTML="";

workouts[workout].forEach(ex=>{

container.innerHTML += `
<div class="exercise">
<h3>${ex}</h3>

KG:
<input type="number" id="${ex}-kg">

Reps:
<input type="number" id="${ex}-rep">

<button onclick="saveExercise('${ex}')">
Save
</button>

</div>
`;
});
}

function saveExercise(ex){

let kg =
document.getElementById(`${ex}-kg`).value;

let reps =
document.getElementById(`${ex}-rep`).value;

let history =
JSON.parse(localStorage.getItem(ex)) || [];

history.push({
date:new Date().toLocaleDateString(),
kg,
reps
});

localStorage.setItem(
ex,
JSON.stringify(history)
);

checkProgress(ex);

alert("Saved!");
}

function checkProgress(ex){

let history =
JSON.parse(localStorage.getItem(ex));

if(history.length < 2) return;

let last =
parseFloat(history[history.length-1].kg);

let prev =
parseFloat(history[history.length-2].kg);

if(last > prev){

alert(
`${ex} naik beban.
Progressive overload berhasil!`
);

}
}

let interval;

function startRest(seconds){

clearInterval(interval);

let timer =
document.getElementById("timer");

interval = setInterval(()=>{

let min =
Math.floor(seconds/60);

let sec =
seconds%60;

timer.innerHTML =
`${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;

seconds--;

if(seconds < 0){

clearInterval(interval);

timer.innerHTML = "REST DONE";

if(navigator.vibrate){
navigator.vibrate([500,300,500]);
}

}

},1000);
}
