// References to DOM elements
const uploadInput = document.getElementById('upload'); // Cropping functionality
const gallery = document.getElementById('gallery');
const tagsInput = document.getElementById('tags');
const filterByTags = document.getElementById('filterByTags');
const dropdownMenu = document.getElementById('dropdownMenu');
const uploadImageInput = document.getElementById('uploadImage');
const categorySelect = document.getElementById('categorySelect');
const uploadTagsInput = document.getElementById('uploadTags');
const uploadButton = document.getElementById('uploadButton');

// Wardrobe data
let wardrobe = [
    { image: "top1.png", category: "Tops", tags: ["casual", "summer"] },
    { image: "dress1.png", category: "Full-body", tags: ["formal", "evening"] },
    { image: "shoes1.png", category: "Shoes", tags: ["sport", "casual"] }
];

// Display wardrobe items in the gallery
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

// Initialize gallery display
displayWardrobe(wardrobe);

// Filter by category
dropdownMenu.addEventListener('click', event => {
    if (event.target.classList.contains('category')) {
        const category = event.target.getAttribute('data-category');
        const filteredItems = wardrobe.filter(item => item.category === category);
        displayWardrobe(filteredItems);
    }
});

// Filter by tags
filterByTags.addEventListener('click', () => {
    const tags = tagsInput.value.split(',').map(tag => tag.trim());
    const filteredItems = wardrobe.filter(item => tags.every(tag => item.tags.includes(tag)));
    displayWardrobe(filteredItems);
});

// Handle image upload and add to wardrobe
uploadButton.addEventListener('click', () => {
    const file = uploadImageInput.files[0];
    if (!file) {
        alert('Please upload an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = e => {
        const imageSrc = e.target.result;
        const category = categorySelect.value;
        const tags = uploadTagsInput.value.split(',').map(tag => tag.trim());

        wardrobe.push({ image: imageSrc, category, tags });
        displayWardrobe(wardrobe);

        // Clear the form
        uploadImageInput.value = '';
        uploadTagsInput.value = '';
    };

    reader.readAsDataURL(file);
});

// Handle cropping functionality (Cropper.js)
uploadInput.addEventListener('change', event => {
    const file = event.target.
