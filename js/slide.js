// Get the button with the id 'btnMenu' and the element with the class 'slideBar'.
let btm = document.querySelector("#btnMenu");
let slideBar = document.querySelector(".slideBar");

// When the button is clicked, toggle the 'active' class on the slideBar element.
btm.onclick = () => {
    slideBar.classList.toggle("active");
};
