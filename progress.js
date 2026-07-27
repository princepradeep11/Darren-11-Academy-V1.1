// Darren 11+ Academy Progress Memory


let progress = JSON.parse(

localStorage.getItem("darrenProgress")

)

|| {


questionsCompleted: 0,

correctAnswers: 0,


Maths: 0,

English: 0,

VR: 0,

NVR: 0


};





function updateProgress(subject, correct){



// Count question

progress.questionsCompleted++;




// Count correct answer

if(correct){

progress.correctAnswers++;

}




// Subject tracking

if(progress[subject] !== undefined){

progress[subject]++;

}




saveProgress();


}





function saveProgress(){


localStorage.setItem(

"darrenProgress",

JSON.stringify(progress)

);


}






function getAccuracy(){


if(progress.questionsCompleted === 0){

return 0;

}


return Math.round(

(progress.correctAnswers /

progress.questionsCompleted)

*100

);


}





function getProgress(){


return progress;


}





function resetProgress(){


localStorage.removeItem(

"darrenProgress"

);


location.reload();


}