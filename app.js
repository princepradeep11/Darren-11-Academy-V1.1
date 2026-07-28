let questions = [];
let currentIndex = 0;
let answered = false;

async function loadQuestions() {
    const response = await fetch('data/questions.json');
    questions = await response.json();

    showQuestion();
}

function showQuestion() {
    answered = false;
    document.getElementById("result").innerText = "";
    document.getElementById("nextBtn").style.display = "none";

    let q = questions[currentIndex];

    document.getElementById("question").innerText = q.question;

    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(option => {
        let btn = document.createElement("button");
        btn.innerText = option;

        btn.onclick = () => selectAnswer(btn, option, q.answer);

        optionsDiv.appendChild(btn);
    });
}

function selectAnswer(button, selected, correct) {
    if (answered) return;
    answered = true;

    let buttons = document.querySelectorAll("#options button");

    buttons.forEach(btn => {
        btn.disabled = true;

        if (btn.innerText === correct) {
            btn.classList.add("correct");
        }

        if (btn.innerText === selected && selected !== correct) {
            btn.classList.add("wrong");
        }
    });

    if (selected === correct) {
        document.getElementById("result").innerText = "✅ Correct!";
    } else {
        document.getElementById("result").innerText = "❌ Wrong!";
    }

    document.getElementById("nextBtn").style.display = "inline-block";

    // Auto next after 1.5 sec
    setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
    currentIndex++;

    if (currentIndex >= questions.length) {
        currentIndex = 0; // restart
    }

    showQuestion();
}

loadQuestions();
