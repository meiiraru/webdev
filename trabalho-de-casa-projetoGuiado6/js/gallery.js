//key for local storage
const STORAGE_KEY = "galleryImages";

//elements
const container = document.querySelector(".container");
const noImagesMsg = document.querySelector("p");

//image generator function
function generateImageElement(src, alt) {
    //create image element
    const image = document.createElement("img");
    image.src = src;
    image.alt = alt;
    return image;
}

//load images when the page finishes loading
window.addEventListener("DOMContentLoaded", () => {
    //load from local storage
    const storedImages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

    //no images to show
    if (storedImages.length === 0)
        return;

    //generate image elements for each stored image
    for (const base64Image of storedImages) {
        const altStr = `Image ${container.children.length + 1}`;
        const image = generateImageElement(base64Image, altStr);
        container.appendChild(image);
    }

    //hide the no images message
    noImagesMsg.style.display = "none";
});