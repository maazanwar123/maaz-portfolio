
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
}

const questions = [
{
    question: "What does HTML stand for?",
    options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Home Tool Markup Language",
        "Hyperlinks Text Mark Language"
    ],
    answer: 0
},
{
    question: "Which language is used for styling webpages?",
    options: ["Java", "Python", "CSS", "PHP"],
    answer: 2
},
{
    question: "Which company developed JavaScript?",
    options: ["Google", "Microsoft", "Netscape", "Apple"],
    answer: 2
},
{
    question: "Which tag creates a hyperlink?",
    options: ["<a>", "<link>", "<href>", "<url>"],
    answer: 0
},
{
    question: "Which symbol is used for comments in JavaScript?",
    options: ["//", "##", "<!-- -->", "**"],
    answer: 0
}
];

let currentQuestion = 0;
let answers = [];

function loadQuestion() {

    let q = questions[currentQuestion];

    document.getElementById("question").innerHTML =
        (currentQuestion + 1) + ". " + q.question;

    let html = "";

    q.options.forEach((option, index) => {

        html += `
        <label class="option">
            <input type="radio" name="option" value="${index}">
            ${option}
        </label><br>
        `;
    });

    document.getElementById("options").innerHTML = html;
}

function saveAnswer() {

    let selected =
        document.querySelector('input[name="option"]:checked');

    if (selected) {
        answers[currentQuestion] =
            Number(selected.value);
    }
}
function nextQuestion() {

    saveAnswer();

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
}

function previousQuestion() {

    saveAnswer();

    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}
function submitExam() {

    saveAnswer();

    let score = 0;

    questions.forEach((q, index) => {
        if (answers[index] === q.answer) {
            score++;
        }
    });

    // Save in localStorage
    let studentResult = {
        username: localStorage.getItem("studentName"),
        score: score,
        total: questions.length,
        date: new Date().toLocaleString()
    };

    let results =
        JSON.parse(localStorage.getItem("allResults")) || [];

    results.push(studentResult);

    localStorage.setItem(
        "allResults",
        JSON.stringify(results)
    );

    // Send to PHP + MySQL
    const data = new FormData();

    data.append(
        "username",
        localStorage.getItem("studentName")
    );

    data.append("score", score);
    data.append("total", questions.length);

    fetch("save_result.php", {
        method: "POST",
        body: data
    })
    .then(response => response.text())
.then(result => {
    console.log("PHP Response:", result);

    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);

    window.location.href = "result.html";
});
}

let timeLeft = 300;

const timer = setInterval(() => {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").innerHTML =
        `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    timeLeft--;

    if (timeLeft < 0) {
        clearInterval(timer);
        submitExam();
    }

}, 1000);

loadQuestion();