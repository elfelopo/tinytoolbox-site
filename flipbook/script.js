const imageInput = document.getElementById("imageInput");
const frameCount = document.getElementById("frameCount");
const columnsInput = document.getElementById("columnsInput");
const createButton = document.getElementById("createButton");
const downloadButton = document.getElementById("downloadButton");
const previewCanvas = document.getElementById("previewCanvas");

let images = [];


// When the user selects images
imageInput.addEventListener("change", function () {

    images = [];

    const files = Array.from(imageInput.files);

	files.sort((a, b) =>
	    a.name.localeCompare(b.name, undefined, { numeric: true })
	);

	for (const file of files) {

	    const image = new Image();

	    image.src = URL.createObjectURL(file);

	    images.push(image);
	}

    frameCount.textContent = "Frames: " + images.length;
});


// Create the spritesheet
createButton.addEventListener("click", function () {

    if (images.length === 0) {
        alert("Please select some PNG images first!");
        return;
    }

    const columns = parseInt(columnsInput.value);

    const frameWidth = images[0].width;
    const frameHeight = images[0].height;

    const rows = Math.ceil(images.length / columns);

    previewCanvas.width = frameWidth * columns;
    previewCanvas.height = frameHeight * rows;

    const ctx = previewCanvas.getContext("2d");

    ctx.clearRect(
        0,
        0,
        previewCanvas.width,
        previewCanvas.height
    );

    for (let i = 0; i < images.length; i++) {

        const column = i % columns;
        const row = Math.floor(i / columns);

        const x = column * frameWidth;
        const y = row * frameHeight;

        ctx.drawImage(
            images[i],
            x,
            y
        );
    }

    downloadButton.disabled = false;
});


// Download the spritesheet
downloadButton.addEventListener("click", function () {

    const link = document.createElement("a");

    link.download = "spritesheet.png";

    link.href = previewCanvas.toDataURL("image/png");

    link.click();
});
