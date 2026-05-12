let decrease = document.getElementById("decrease-btn");
let increase = document.getElementById("increase-btn");
let size = 2;

let imagesContainer = document.querySelector(".images-container");
let images = imagesContainer.getElementsByTagName("img");

decrease.addEventListener("click", function() {
    size = Math.max(1, size - 1);
    let newClass = `size-${size}`;

    for (let img of images)
        img.className = newClass;
});

increase.addEventListener("click", function() {
    size = Math.min(3, size + 1);
    let newClass = `size-${size}`;

    for (let img of images)
        img.className = newClass;
});