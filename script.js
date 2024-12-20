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

// Sample wardrobe data
let wardrobe = [
    { image: "top1.png", category: "Tops", tags: ["casual", "summer"] },
    { image: "dress1.png", category: "Full-body", tags: ["formal", "evening"] },
    { image: "shoes1.png", category: "Shoes", tags: ["sport", "casual"] },
    // Add more items as needed
];

const gallery = document.getElementById('gallery');
const dropdownMenu = document.getElementById('dropdownMenu');
const tagInput = document.getElementById('tags');
const filterByTags = document.getElementById('filterByTags');

// Display all wardrobe items in the gallery
function displayWardrobe(items) {
    gallery.innerHTML = '';
    items.forEach(item => {
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.category;
        gallery.appendChild(img);

        const tagText = document.createElement('p');
        tagText.textContent = `Tags: ${item.tags.join(', ')}`;
        gallery.appendChild(tagText);
    });
}

// Initial display of all items
displayWardrobe(wardrobe);

// Filter by category
dropdownMenu.addEventListener('click', (event) => {
    if (event.target.classList.contains('category')) {
        const category = event.target.getAttribute('data-category');
        const filteredItems = wardrobe.filter(item => item.category === category);
        displayWardrobe(filteredItems);
    }
});

// Filter by tags
filterByTags.addEventListener('click', () => {
    const tags = tagInput.value.split(',').map(tag => tag.trim());
    const filteredItems = wardrobe.filter(item => tags.every(tag => item.tags.includes(tag)));
    displayWardrobe(filteredItems);
});

// Handle new clothing uploads
document.getElementById('uploadButton').addEventListener('click', () => {
    const fileInput = document.getElementById('uploadImage');
    const categorySelect = document.getElementById('categorySelect');
    const tagsInput = document.getElementById('uploadTags');

    if (!fileInput.files[0]) {
        alert('Please upload an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const imageSrc = e.target.result;
        const category = categorySelect.value;
        const tags = tagsInput.value.split(',').map(tag => tag.trim());

        // Add new clothing item to the wardrobe array
        wardrobe.push({ image: imageSrc, category, tags });

        // Display updated wardrobe
        displayWardrobe(wardrobe);

        // Clear the form
        fileInput.value = '';
        tagsInput.value = '';
    };

    reader.readAsDataURL(fileInput.files[0]);
});
