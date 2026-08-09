const startButton = document.getElementById("start-button");
const logo = document.querySelector(".splash-logo");

setTimeout(() => {
    logo.classList.add("show");
}, 300);

setTimeout(() => {
    startButton.classList.add("show");
}, 1800);

startButton.addEventListener("click", function () {
    window.location.href = "login.html";
});