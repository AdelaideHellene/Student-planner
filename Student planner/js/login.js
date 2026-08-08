const loginButton = document.getElementById("loginButton");
const nameField = document.getElementById("name-field");


loginButton.addEventListener("click", function() {

    const name = nameField.value.trim();

    if (name === "") {

        alert("Please enter your name.");

        return;

    }

    localStorage.setItem("studentName", name);

    window.location.href = "dashboard.html";

});
