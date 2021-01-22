function hideFunc(e) {
    let sibling = e.nextElementSibling;

    if (sibling.style.display === "none") {

        sibling.style.display = "block";

        e.style.backgroundColor = "#ffffff";
    } else {
        sibling.style.display = "none";

        e.style.backgroundColor = "#fff47a";
    }
}
