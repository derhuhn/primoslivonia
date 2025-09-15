// JavaScript for the new responsive website

document.addEventListener('DOMContentLoaded', () => {
    const menuDisplay = document.getElementById('menu-display');

    // Fetch category order first
    fetch('categories_web.md')
        .then(response => response.text())
        .then(categoryOrderText => {
            const categoryOrder = categoryOrderText.split('\n').map(cat => cat.trim()).filter(cat => cat.length > 0);

            // Then fetch menu data
            fetch('menu.json')
                .then(response => response.json())
                .then(menuData => {
                    categoryOrder.forEach(category => {
                        if (menuData[category]) { // Only render categories that exist in menu.json
                            const categorySection = document.createElement('section');
                            categorySection.classList.add('menu-category');

                            const categoryTitle = document.createElement('h2');
                            categoryTitle.textContent = category;
                            categorySection.appendChild(categoryTitle);

                            const itemList = document.createElement('ul');
                            itemList.classList.add('menu-items');

                            menuData[category].forEach(item => {
                                const listItem = document.createElement('li');
                                listItem.classList.add('menu-item');

                                const itemName = document.createElement('h3');
                                itemName.textContent = item.item;
                                listItem.appendChild(itemName);

                                if (item.price) {
                                    listItem.classList.add('menu-item-no-variants');
                                    const itemPrice = document.createElement('p');
                                    itemPrice.classList.add('item-price');
                                    itemPrice.textContent = `$${item.price.toFixed(2)}`;
                                    listItem.appendChild(itemPrice);
                                } else if (item.variants) {
                                    listItem.classList.add('menu-item-has-variants');
                                    const variantsList = document.createElement('ul');
                                    variantsList.classList.add('item-variants');
                                    for (const variant in item.variants) {
                                        const variantItem = document.createElement('li');
                                        variantItem.innerHTML = `${variant}: <span class="variant-price">$${item.variants[variant].toFixed(2)}</span>`;
                                        variantsList.appendChild(variantItem);
                                    }
                                    listItem.appendChild(variantsList);
                                }
                                itemList.appendChild(listItem);
                            });
                            categorySection.appendChild(itemList);
                            menuDisplay.appendChild(categorySection);
                        }
                    });
                })
                .catch(error => {
                    console.error('Error fetching menu data:', error);
                    menuDisplay.textContent = 'Failed to load menu. Please try again later.';
                });
        })
        .catch(error => {
            console.error('Error fetching category order:', error);
            menuDisplay.textContent = 'Failed to load category order. Please try again later.';
        });
});