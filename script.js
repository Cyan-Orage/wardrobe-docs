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

    // Create the new category button
    const newCategoryButton = document.createElement('button');
    newCategoryButton.textContent = newCategory;
    newCategoryButton.classList.add('subcategory');
    newCategoryButton.setAttribute('data-category', newCategory);

    if (parentCategory) {
        // Add as a subcategory under the selected parent category
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
        // Add as a new main category
        const newDropdownItem = document.createElement('div');
        newDropdownItem.classList.add('dropdown-item');
        newDropdownItem.appendChild(newCategoryButton);
        dropdownMenu.appendChild(newDropdownItem);
    }

    // Clear inputs
    newCategoryInput.value = '';
    parentCategorySelect.value = '';
});
