function updateDashboard(){

    let data = getProgress();

    document.getElementById("totalQuestions").innerText =
    data.questionsCompleted;

    document.getElementById("accuracy").innerText =
    getAccuracy() + "%";

    document.getElementById("mathsProgress").innerText =
    data.Maths;

    document.getElementById("englishProgress").innerText =
    data.English;

    document.getElementById("vrProgress").innerText =
    data.VR;

    document.getElementById("nvrProgress").innerText =
    data.NVR;

    // Daily progress
    if(typeof dailyCount !== "undefined"){
        document.getElementById("dailyProgress").innerText =
        "Daily Progress: " + dailyCount + " / 100";
    }
}

// Load initial dashboard
updateDashboard();
