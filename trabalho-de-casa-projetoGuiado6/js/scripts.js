const STORAGE_KEY = "savedImageBase64";

const uploadBtn = document.getElementById("uploadBtn");
const fileInput = document.getElementById("fileInput");
const preview   = document.getElementById("preview");
const removeBtn = document.getElementById("removeBtn");

uploadBtn.addEventListener("click", () => {
    fileInput.click();
});

fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file)
        return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const base64Image = e.target.result;
        localStorage.setItem(STORAGE_KEY, base64Image);
        displayImage(base64Image);
    };

    reader.readAsDataURL(file);
});

function displayImage(base64Image) {
    preview.src = base64Image;
    preview.style.display = "block";
}

removeBtn.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    preview.src = "";
    preview.style.display = "none";
});

window.addEventListener("DOMContentLoaded", () => {
    const savedImage = localStorage.getItem(STORAGE_KEY);
    if (savedImage)
        displayImage(savedImage);
});