// Reference DOM elements
const dropdownMenu = document.getElementById('dropdownMenu');
const gallery = document.getElementById('gallery');
let wardrobe = [
    { image: "top1.png", category: "T-Shirts", tags: ["casual", "summer"] },
    { image: "dress1.png", category: "Dresses", tags: ["formal", "evening"] },
    { image: "skort1.png", category: "Skorts", tags: ["sport", "summer"] },
    // Add more items as needed
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

// Initial display of all items
displayWardrobe(wardrobe);

// Filter by category
dropdownMenu.addEventListener('click', event => {
    if (event.target.classList.contains('subcategory')) {
        const category = event.target.getAttribute('data-category');
        const filteredItems = wardrobe.filter(item => item.category === category);
        displayWardrobe(filteredItems);
    }
});

// Example: Handle adding new items
const uploadButton = document.getElementById('uploadButton');
uploadButton.addEventListener('click', () => {
    const fileInput = document.getElementById('uploadImage');
    const categorySelect = document.getElementById('categorySelect');
    const tagsInput = document.getElementById('uploadTags');

    if (!fileInput.files[0]) {
        alert('Please upload an image.');
        return;
    }

    const reader = new FileReader();
    reader.onload = e => {
        const imageSrc = e.target.result;
        const category = categorySelect.value;
        const tags = tagsInput.value.split(',').map(tag => tag.trim());

        wardrobe.push({ image: imageSrc, category, tags });
        displayWardrobe(wardrobe);

        // Clear form
        fileInput.value = '';
        tagsInput.value = '';
    };

    reader.readAsDataURL(fileInput.files[0]);
});
