document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

   document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const users = [
        { username: "maaz", password: "12345" },
        { username: "affan", password: "54321" },
        { username: "azan", password:   "123" },
        { username: "hamdan", password: "1234" }
    ];

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (user) {

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("studentName", username);

        window.location.href = "exam.html";

    } else {

        document.getElementById("message").innerText =
            "Invalid username or password!";
    }
});
    if (username === validUsername && password === validPassword) {

        // Save login status
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("studentName", username);

        // Go to exam page
        window.location.href = "exam.html";

    } else {
        document.getElementById("message").innerText =
            "Invalid username or password!";
            
    }
});