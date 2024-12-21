// Handle adding new categories or subcategories
const addCategoryButton = document.getElementById('addCategoryButton');
const newCategoryInput = document.getElementById('newCategory');
const parentCategorySelect = document.getElementById('parentCategory');
const dropdownMenu = document.getElementById('dropdownMenu');

addCategoryButton.addEventListener('click', () => {
    const newCategory = newCategoryInput.value.trim();
    const parentCategory = parentCategorySelect.value;

    if (!newCategory) {
        alert("Please enter a category name.");
        return;
    }

    const newCategoryButton = document.createElement('button');
    newCategoryButton.textContent = newCategory;
    newCategoryButton.classList.add('subcategory');
    newCategoryButton.setAttribute('data-category', newCategory);

    if (parentCategory) {
        const parentMenu = [...dropdownMenu.querySelectorAll('.category')]
            .find(btn => btn.textContent === parentCategory)
            ?.nextElementSibling;

        if (parentMenu) {
            const subMenu = parentMenu.querySelector('.sub-menu');
            if (!subMenu) {
                const newSubMenu = document.createElement('div');
                newSubMenu.classList.add('sub-menu');
                parentMenu.appendChild(newSubMenu);
                newSubMenu.appendChild(newCategoryButton);
            } else {
                subMenu.appendChild(newCategoryButton);
            }
        } else {
            alert("Parent category not found.");
        }
    } else {
        const newDropdownItem = document.createElement('div');
        newDropdownItem.classList.add('dropdown-item');
        newDropdownItem.appendChild(newCategoryButton);
        dropdownMenu.appendChild(newDropdownItem);
    }

    newCategoryInput.value = '';
    parentCategorySelect.value = '';
});

// Validate and handle image uploads
const uploadImageInput = document.getElementById('uploadImage');
const validFormats = ['image/jpeg', 'image/png', 'image/webp'];

uploadImageInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) {
        alert('No file selected.');
        return;
    }

    if (!validFormats.includes(file.type)) {
        alert('Invalid file format. Please upload a JPEG, PNG, or WEBP image.');
        uploadImageInput.value = '';
        return;
    }

    console.log('File format is valid:', file.type);
});
