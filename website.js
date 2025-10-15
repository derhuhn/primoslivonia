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

                                if (item.price && item.variants) {
                                    // Item with both price and variants
                                    listItem.classList.add('menu-item-has-variants');

                                    const baseItemLine = document.createElement('div');
                                    baseItemLine.classList.add('menu-item-line');
                                    baseItemLine.innerHTML = `<h3>${item.item}</h3><p class="item-price">$${item.price.toFixed(2)}</p>`;
                                    listItem.appendChild(baseItemLine);

                                    for (const variant in item.variants) {
                                        const variantLine = document.createElement('div');
                                        variantLine.classList.add('menu-item-line');
                                        variantLine.innerHTML = `<h3>${variant}</h3><p class="variant-price">$${item.variants[variant].toFixed(2)}</p>`;
                                        listItem.appendChild(variantLine);
                                    }
                                } else if (item.price) {
                                    // Item with only a price
                                    listItem.classList.add('menu-item-no-variants');
                                    listItem.innerHTML = `<h3>${item.item}</h3><p class="item-price">$${item.price.toFixed(2)}</p>`;
                                } else if (item.variants) {
                                    // Item with only variants
                                    listItem.classList.add('menu-item-has-variants');
                                    const itemName = document.createElement('h3');
                                    itemName.textContent = item.item;
                                    listItem.appendChild(itemName);

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
