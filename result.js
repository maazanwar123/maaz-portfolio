const score = localStorage.getItem("score");
const total = localStorage.getItem("total");

document.getElementById("result").innerHTML =
    `Your Score: ${score} / ${total}`;

function logout() {

    localStorage.removeItem("loggedIn");
    localStorage.removeItem("score");
    localStorage.removeItem("total");

    window.location.href = "index.html";
}