// JavaScript for the new responsive website

document.addEventListener('DOMContentLoaded', () => {
    const menuDisplay = document.getElementById('menu-display');

    function createConfetti(x, y) {
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '9999';
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#ff86efff', '#ff8401ff', '#12ff01ff', '#ff0000', '#0710ffff'];

        for (let i = 0; i < 40; i++) {
            particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 12,
                vy: (Math.random() - 0.5) * 12 - 5,
                size: Math.random() * 6 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                life: 100
            });
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let alive = false;
            particles.forEach(p => {
                if (p.life > 0) {
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.25; // gravity
                    p.life -= 1.5;
                    ctx.fillStyle = p.color;
                    ctx.fillRect(p.x, p.y, p.size, p.size);
                    alive = true;
                }
            });

            if (alive) {
                requestAnimationFrame(animate);
            } else {
                canvas.remove();
            }
        }

        animate();
    }

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
                    const orderOnlineBtn = document.getElementById('order-online-btn');

                    if (orderOnlineBtn) {
                        orderOnlineBtn.addEventListener('click', (e) => {
                            createConfetti(e.clientX, e.clientY);
                        });
                    }

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
                                    window.scrollTo({ top: y, behavior: 'smooth' });
                                }
                            });
                            categoryNav.appendChild(navButton);

                            const categorySection = document.createElement('section');
                            categorySection.classList.add('menu-category');
                            // Add ID for navigation
                            categorySection.id = category.replace(/\s+/g, '-').toLowerCase();

                            // Special class for featured category to handle full-width spanning
                            if (category === 'Featured') {
                                categorySection.classList.add('featured');
                            }

                            const categoryTitle = document.createElement('h2');
                            categoryTitle.textContent = category;
                            categorySection.appendChild(categoryTitle);

                            const itemList = document.createElement('ul');
                            itemList.classList.add('menu-items');

                            menuData[category].forEach(item => {
                                const listItem = document.createElement('li');
                                listItem.classList.add('menu-item');

                                if (category === 'Featured') {
                                    listItem.classList.add('featured-item-layout');

                                    if (item.image) {
                                        const img = document.createElement('img');
                                        img.src = item.image;
                                        img.alt = item.item;
                                        img.classList.add('featured-img');
                                        listItem.appendChild(img);
                                    }

                                    const textContainer = document.createElement('div');
                                    textContainer.classList.add('featured-text-container');

                                    const name = document.createElement('h3');
                                    name.classList.add('featured-name');
                                    name.textContent = item.item;
                                    textContainer.appendChild(name);

                                    if (item.subtitle) {
                                        const subtitle = document.createElement('p');
                                        subtitle.classList.add('featured-subtitle');
                                        subtitle.textContent = item.subtitle;
                                        textContainer.appendChild(subtitle);
                                    }

                                    if (item.description) {
                                        const desc = document.createElement('p');
                                        desc.classList.add('featured-description');
                                        desc.textContent = item.description;
                                        textContainer.appendChild(desc);
                                    }

                                    if (item.price) {
                                        const price = document.createElement('p');
                                        price.classList.add('featured-price');
                                        price.textContent = `$${item.price.toFixed(2)}`;
                                        textContainer.appendChild(price);
                                    }

                                    listItem.appendChild(textContainer);
                                } else if (item.price && item.variants) {
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

                                if (item.toppings) {
                                    const toppingsDiv = document.createElement('div');
                                    toppingsDiv.classList.add('item-toppings');
                                    toppingsDiv.textContent = item.toppings;
                                    listItem.appendChild(toppingsDiv);
                                }

                                // Special case for Toppings category - use simple text
                                if (category === 'Toppings') {
                                    const itemName = listItem.querySelector('h3');
                                    if (itemName) {
                                        const p = document.createElement('p');
                                        p.classList.add('topping-item-text');
                                        p.textContent = itemName.textContent;
                                        itemName.replaceWith(p);
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