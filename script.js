const upload = document.getElementById('upload');// this is for cropping functionality
const gallery = document.getElementById('gallery');

upload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        const image = document.createElement('img');
        image.src = e.target.result;
        image.id = 'crop-image';
        gallery.appendChild(image);

        // Apply Cropper.js
        const cropper = new Cropper(image, {
            aspectRatio: 1, // Adjust ratio as needed
            crop(event) {
                console.log(event.detail.x, event.detail.y, event.detail.width, event.detail.height);
            },
        });

        // Optional: Add save functionality
        document.body.appendChild(document.createElement('button')).textContent = "Save Crop";
    };
    reader.readAsDataURL(file);
});

