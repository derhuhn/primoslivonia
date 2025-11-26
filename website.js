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
                    const categoryNav = document.getElementById('category-nav');

                    categoryOrder.forEach(category => {
                        if (menuData[category]) { // Only render categories that exist in menu.json
                            // Create Navigation Button
                            const navButton = document.createElement('button');
                            navButton.classList.add('category-nav-button');
                            navButton.textContent = category;
                            navButton.addEventListener('click', () => {
                                const section = document.getElementById(category.replace(/\s+/g, '-').toLowerCase());
                                if (section) {
                                    // Offset for sticky header/nav
                                    const yOffset = -70; 
                                    const y = section.getBoundingClientRect().top + window.pageYOffset + yOffset;
                                    window.scrollTo({top: y, behavior: 'smooth'});
                                }
                            });
                            categoryNav.appendChild(navButton);

                            const categorySection = document.createElement('section');
                            categorySection.classList.add('menu-category');
                            // Add ID for navigation
                            categorySection.id = category.replace(/\s+/g, '-').toLowerCase();

                            const categoryTitle = document.createElement('h2');
                            categoryTitle.textContent = category;
                            categorySection.appendChild(categoryTitle);

                            const itemList = document.createElement('ul');
                            itemList.classList.add('menu-items');

                            menuData[category].forEach(item => {
                                const listItem = document.createElement('li');
                                listItem.classList.add('menu-item');

                                if (item.price && item.variants) {
                                    // Special case for items with both price and variants
                                    listItem.classList.add('menu-item-has-variants'); // This will make it a column

                                    // Container for the main item and price
                                    const mainItemDiv = document.createElement('div');
                                    mainItemDiv.classList.add('menu-item-no-variants'); // Use existing style for this line

                                    const itemName = document.createElement('h3');
                                    itemName.textContent = item.item;
                                    mainItemDiv.appendChild(itemName);

                                    const itemPrice = document.createElement('p');
                                    itemPrice.classList.add('item-price');
                                    itemPrice.textContent = `$${item.price.toFixed(2)}`;
                                    mainItemDiv.appendChild(itemPrice);

                                    listItem.appendChild(mainItemDiv);

                                    // Now add the variants
                                    const variantsList = document.createElement('ul');
                                    variantsList.classList.add('item-variants', 'special-variant-list');
                                    for (const variant in item.variants) {
                                        const variantItem = document.createElement('li');
                                        variantItem.innerHTML = `<span>${variant}</span> <span class="variant-price">$${item.variants[variant].toFixed(2)}</span>`;
                                        variantsList.appendChild(variantItem);
                                    }
                                    listItem.appendChild(variantsList);

                                } else {
                                    // Existing logic for other items
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
                                }
                                itemList.appendChild(listItem);
                            });
                            categorySection.appendChild(itemList);
                            menuDisplay.appendChild(categorySection);
                        }
                    });

                    // Scroll Spy Logic
                    window.addEventListener('scroll', () => {
                        const fromTop = window.scrollY + 100; // Adjust offset
                        const navButtons = document.querySelectorAll('.category-nav-button');
                        
                        navButtons.forEach(link => {
                            const section = document.getElementById(link.textContent.replace(/\s+/g, '-').toLowerCase());
                            if (section && 
                                section.offsetTop <= fromTop && 
                                section.offsetTop + section.offsetHeight > fromTop) {
                                link.classList.add('active');
                                // Scroll nav to keep active button in view
                                link.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                            } else {
                                link.classList.remove('active');
                            }
                        });
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