let questions = [];
let currentIndex = 0;
let answered = false;


// LOAD QUESTIONS
fetch('./data/questions.json')
.then(response => response.json())
.then(data => {
    questions = data;
    console.log("Questions loaded:", questions.length);
    showQuestion();
})
.catch(error => {
    console.error("Error loading JSON:", error);
    document.getElementById("question").innerText =
        "❌ Failed to load questions.json";
});


// SHOW QUESTION
function showQuestion() {

    answered = false;

    if (currentIndex >= questions.length) {
        document.getElementById("question").innerText = "🎉 Completed!";
        document.getElementById("options").innerHTML = "";
        return;
    }

    let q = questions[currentIndex];

    document.getElementById("question").innerText = q.question;

    let optionsHTML = "";

    q.options.forEach(option => {
        optionsHTML += `<button onclick="selectAnswer(this, '${option}', '${q.answer}')">${option}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;

    document.getElementById("result").innerText = "";
}


// SELECT ANSWER
function selectAnswer(btn, selected, correct) {

    if (answered) return;

    answered = true;

    let buttons = document.querySelectorAll("#options button");

    buttons.forEach(button => {

        if (button.innerText === correct) {
            button.classList.add("correct");
        }

        if (button.innerText === selected && selected !== correct) {
            button.classList.add("wrong");
        }

        button.disabled = true;
    });

    if (selected === correct) {
        document.getElementById("result").innerText = "✅ Correct!";
    } else {
        document.getElementById("result").innerText = "❌ Wrong!";
    }

}


// NEXT QUESTION
function nextQuestion() {

    if (!answered) {
        alert("Please select an answer first!");
        return;
    }

    currentIndex++;

    showQuestion();
}
