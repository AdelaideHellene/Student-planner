const startButton = document.getElementById("start-button");
const logo = document.querySelector(".splash-logo");


setTimeout(() => {

    logo.style.opacity = "1";
    logo.style.transform = "scale(1)";

}, 300);


setTimeout(() => {

    startButton.style.opacity = "1";

}, 1800);


startButton.addEventListener("click", function() {

    window.location.href = "login.html";

});