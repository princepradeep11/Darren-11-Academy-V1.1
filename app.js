// Darren 11+ Academy Main Engine


let questions = [];

let currentQuestion = 0;



// Load questions


fetch("data/questions.json")

.then(response => response.json())

.then(data => {


questions = data;


loadQuestion();


});





function loadQuestion(){


let q = questions[currentQuestion];



document.getElementById(
"subject"
).innerText =

"Subject: " + q.subject;




document.getElementById(
"question"
).innerText =

q.question;



let html = "";



q.options.forEach(function(option,index){



html +=

`

<button onclick="checkAnswer(${index})">

${option}

</button>

`;



});



document.getElementById(
"options"
).innerHTML = html;



}







function checkAnswer(selected){


let q = questions[currentQuestion];



let correct =

selected === q.answer;




updateProgress(
q.subject,
correct
);




if(correct){


document.getElementById(
"coachMessage"
).innerText =

"Excellent work Darren! Keep building accuracy.";

}

else{


document.getElementById(
"coachMessage"
).innerText =

"Good attempt. Review this topic and try again.";

}




updateDashboard();



}







function nextQuestion(){



currentQuestion++;




if(currentQuestion >= questions.length){



alert(

"🎉 Practice Complete!"

);



currentQuestion = 0;



}




loadQuestion();



}