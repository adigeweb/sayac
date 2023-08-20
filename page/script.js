const srcParams = new URLSearchParams(location.search);
const year = new Date().getFullYear();
const starting = srcParams.get("s");
const ending = srcParams.get("e");
if (!starting || !ending) location.href = "../";
const month = new Date().getMonth();

document.querySelector("h1").innerText = srcParams.get("t");

const ratio = parseInt(((ending - new Date()) / (ending - starting)) * 100).toFixed(4);

setTimeout(() => {
  document.querySelector(".loading").style.display = "none";
}, 1000);

let timer = setInterval(function () {
    const today = new Date().getTime();
    let diff;
    if (month > 6) {
        diff = ending - today;
    } else {
        diff = starting - today;
    }

    let days = Math.floor(diff / (1000 * 60 * 60 * 24));
    let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML =
        "<div class=\"days\"> \
  <div class=\"numbers\">" + days + "</div>days</div> \
<div class=\"hours\"> \
  <div class=\"numbers\">" + hours + "</div>hours</div> \
<div class=\"minutes\"> \
  <div class=\"numbers\">" + minutes + "</div>minutes</div> \
<div class=\"seconds\"> \
  <div class=\"numbers\">" + seconds + "</div>seconds</div> \
</div>";

    document.querySelector(".circle").style.background = `conic-gradient(orange 0deg, orange ${3.6 * ratio}deg, black ${3.6 * ratio}deg, black ${360 - 3.6 * ratio}deg)`;

}, 1000);