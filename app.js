// Darren 11+ Academy Main Engine

let questions = [];
let currentQuestion = 0;
let answered = false;


// Load questions
fetch("data/questions.json")
.then(response => response.json())
.then(data => {
    questions = data;
    loadQuestion();
});



function loadQuestion(){

    answered = false;

    let q = questions[currentQuestion];

    document.getElementById("subject").innerText =
    "Subject: " + q.subject;

    document.getElementById("question").innerText =
    q.question;

    let html = "";

    q.options.forEach(function(option,index){

        html += `
        <button onclick="checkAnswer(${index})">
            ${option}
        </button>
        `;

    });

    document.getElementById("options").innerHTML = html;

}



function checkAnswer(selected){

    if(answered) return; // prevent multiple clicks

    answered = true;

    let q = questions[currentQuestion];

    let buttons = document.querySelectorAll("#options button");

    // Highlight selected
    buttons[selected].classList.add("selected");

    let correct = selected === q.answer;

    // Show correct/wrong colors
    buttons.forEach((btn, index) => {
        if(index === q.answer){
            btn.classList.add("correct");
        }
        if(index === selected && !correct){
            btn.classList.add("wrong");
        }
    });


    updateProgress(q.subject, correct);


    if(correct){
        document.getElementById("coachMessage").innerText =
        "✅ Excellent work Darren!";
    }
    else{
        document.getElementById("coachMessage").innerText =
        "❌ Not quite. Review and try again.";
    }

    updateDashboard();

}



function nextQuestion(){

    currentQuestion++;

    if(currentQuestion >= questions.length){
        alert("🎉 Practice Complete!");
        currentQuestion = 0;
    }

    loadQuestion();

}
