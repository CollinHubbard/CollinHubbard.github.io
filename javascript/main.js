var starCount = 0;

window.addEventListener("click", func2);

function func2(e) {
    var newStar = document.createElement("div");

    newStar.innerHTML = "★";
    newStar.setAttribute("class", "stars");

    newStar.style.position = "relative";

    newStar.style.top = (-280 - (starCount * 100)) + "px";
    newStar.style.left = 10 + "px";

    var newId = "" + starCount;

    newStar.setAttribute("id", newId);

    newStar.style.transform = "translate3d(" + e.clientX + "px, " + e.clientY + "px, 0)";

    document.body.appendChild(newStar);

    starCount++;
}

window.addEventListener("mousemove", func);

function func(e) {
    var x = e.clientX;
    var y = e.clientY;

    var s = document.querySelectorAll(".stars");

    s.forEach(function(s) {
        var delay = s.id * 100;
        setTimeout(function() {
            s.style.transform = "translate3d(" + x + "px, " + y + "px, 0)";
        }, delay);
    })
}
