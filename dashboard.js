// Darren 11+ Academy Dashboard


function updateDashboard(){


let data = getProgress();



// Total questions

document.getElementById(
"totalQuestions"
).innerText =

data.questionsCompleted;



// Accuracy

document.getElementById(
"accuracy"
).innerText =

getAccuracy() + "%";



// Subjects

document.getElementById(
"mathsProgress"
).innerText =

data.Maths;



document.getElementById(
"englishProgress"
).innerText =

data.English;



document.getElementById(
"vrProgress"
).innerText =

data.VR;



document.getElementById(
"nvrProgress"
).innerText =

data.NVR;



}



// Run when page loads

updateDashboard();