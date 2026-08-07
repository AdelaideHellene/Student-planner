const loginButton = document.getElementById("loginButton");
const nameInput = document.getElementById("name-field");


loginButton.addEventListener("click", function(){

    localStorage.setItem("studentName", nameInput.value);

    window.location.href = "dashboard.html";

});
