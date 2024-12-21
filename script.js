// Handle adding new categories or subcategories
const addCategoryButton = document.getElementById('addCategoryButton');
const newCategoryInput = document.getElementById('newCategory');
const parentCategorySelect = document.getElementById('parentCategory');
const dropdownMenu = document.getElementById('dropdownMenu');
const removeCategorySelect = document.getElementById('removeCategory');
const removeCategoryButton = document.getElementById('removeCategoryButton');

// Populate removable categories (excluding locked ones)
function populateRemoveCategorySelect() {
    removeCategorySelect.innerHTML = '<option value="">Select category to remove</option>';
    const categories = dropdownMenu.querySelectorAll('.category:not([data-locked="true"])');
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.textContent;
        option.textContent = category.textContent;
        removeCategorySelect.appendChild(option);
    });
}

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
    populateRemoveCategorySelect();
});

// Handle removing categories
removeCategoryButton.addEventListener('click', () => {
    const categoryToRemove = removeCategorySelect.value;
    if (!categoryToRemove) {
        alert("Please select a category to remove.");
        return;
    }

    const categoryButton = [...dropdownMenu.querySelectorAll('.category, .subcategory')]
        .find(btn => btn.textContent === categoryToRemove);

    if (categoryButton) {
        const parent = categoryButton.closest('.dropdown-item, .sub-menu');
        parent.removeChild(categoryButton);

        if (parent && parent.classList.contains('sub-menu') && parent.children.length === 0) {
            parent.remove(); // Remove empty sub-menu
        }

        populateRemoveCategorySelect();
    } else {
        alert("Category not found.");
    }
});

// Initialize removable categories list
populateRemoveCategorySelect();
