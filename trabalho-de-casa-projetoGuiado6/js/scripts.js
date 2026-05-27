//flags
const STORAGE_KEY = "galleryImages";
const MAX_IMAGES = 3;

//buttons
const uploadBtn  = document.getElementById("uploadBtn");
const fileInput  = document.getElementById("fileInput");
const removeBtn  = document.getElementById("removeBtn");
const galleryBtn = document.getElementById("galleryBtn");

//load images from local storage if any
let images = localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)) : [];
if (images.length > 0)
    galleryBtn.style.display = "block";

//upload button action
uploadBtn.addEventListener("click", () => {
    //check for max images
    if (images.length >= MAX_IMAGES) {
        alert(`Você atingiu o limite de ${MAX_IMAGES} imagens!`);
        return;
    }

    //trigger the file input click
    fileInput.click();
});

//file input action
fileInput.addEventListener("change", (event) => {
    //grab the first file
    const file = event.target.files[0];
    if (!file)
        return;

    //read the file
    const reader = new FileReader();
    reader.onload = function(e) {
        //read as base64 and update the images array
        const base64Image = e.target.result;
        images.push(base64Image);

        //save in the local storage and show the gallery button
        localStorage.setItem(STORAGE_KEY, JSON.stringify(images));
        galleryBtn.style.display = "block";
    };

    reader.readAsDataURL(file);
});

//remove button action
removeBtn.addEventListener("click", () => {
    //check if there are images to remove then ask for confirmation
    if (images.length === 0 || !confirm("Deseja realmente limpar a galeria?"))
        return;

    //clear local storage and reset the images array
    localStorage.removeItem(STORAGE_KEY);
    images = [];
    galleryBtn.style.display = "none";
});
