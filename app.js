// Darren 11+ Academy V1.2

let questions = [];
let currentQuestionIndex = 0;
let answered = false;

// Daily tracking
let dailyCount = 0;
const DAILY_TARGET = 100;


// Shuffle function
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


// Load questions
fetch("data/questions.json")
.then(res => res.json())
.then(data => {

    questions = data;

    shuffle(questions); // 🔥 random order

    loadQuestion();
});



function loadQuestion(){

    answered = false;

    if(dailyCount >= DAILY_TARGET){
        document.getElementById("question").innerText =
        "🎉 Daily Target Complete!";
        document.getElementById("options").innerHTML = "";
        return;
    }

    let q = questions[currentQuestionIndex];

    document.getElementById("subject").innerText =
    "Subject: " + q.subject;

    document.getElementById("question").innerText =
    q.question;

    let html = "";

    q.options.forEach((option, index) => {
        html += `
        <button onclick="checkAnswer(${index})">
            ${option}
        </button>`;
    });

    document.getElementById("options").innerHTML = html;

}



function checkAnswer(selected){

    if(answered) return;

    answered = true;

    let q = questions[currentQuestionIndex];
    let buttons = document.querySelectorAll("#options button");

    buttons[selected].classList.add("selected");

    let correct = selected === q.answer;

    // Show correct/wrong
    buttons.forEach((btn, index) => {
        if(index === q.answer){
            btn.classList.add("correct");
        }
        if(index === selected && !correct){
            btn.classList.add("wrong");
        }
    });

    updateProgress(q.subject, correct);

    dailyCount++;

    // Coach message
    document.getElementById("coachMessage").innerText =
    correct ? "✅ Excellent!" : "❌ Review this topic.";

    updateDashboard();

    // Auto next after 1.5 sec
    setTimeout(() => {
        nextQuestion();
    }, 1500);

}



function nextQuestion(){

    currentQuestionIndex++;

    if(currentQuestionIndex >= questions.length){
        shuffle(questions);
        currentQuestionIndex = 0;
    }

    loadQuestion();

}
