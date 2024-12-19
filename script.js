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

//This is for tags
const tagsInput = document.getElementById('tags');
const addButton = document.getElementById('add');

let wardrobe = [];

addButton.addEventListener('click', () => {
    const tags = tagsInput.value.split(',').map(tag => tag.trim());
    const croppedImage = document.querySelector('#crop-image');
    if (croppedImage) {
        wardrobe.push({ image: croppedImage.src, tags });
        displayWardrobe();
        tagsInput.value = '';
    }
});

function displayWardrobe() {
    gallery.innerHTML = '';
    wardrobe.forEach(item => {
        const img = document.createElement('img');
        img.src = item.image;
        const tagText = document.createElement('p');
        tagText.textContent = `Tags: ${item.tags.join(', ')}`;
        gallery.appendChild(img);
        gallery.appendChild(tagText);
    });
}
