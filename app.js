document.addEventListener("DOMContentLoaded", () => {
    fetch("menu.json")
        .then(response => response.json())
        .then(data => {
            const menuContainer = document.getElementById("menu-container");

            for (const category in data) {
                const categoryEl = document.createElement("div");
                categoryEl.classList.add("category");

                const categoryTitle = document.createElement("h2");
                categoryTitle.textContent = category;
                categoryEl.appendChild(categoryTitle);

                data[category].forEach(item => {
                    const itemEl = document.createElement("div");
                    itemEl.classList.add("item");

                    const itemName = document.createElement("span");
                    itemName.classList.add("item-name");
                    itemName.textContent = item.item;
                    itemEl.appendChild(itemName);

                    if (item.variant) {
                        const itemVariant = document.createElement("span");
                        itemVariant.classList.add("item-variant");
                        itemVariant.textContent = item.variant;
                        itemEl.appendChild(itemVariant);
                    }

                    const itemPrice = document.createElement("span");
                    itemPrice.classList.add("item-price");
                    itemPrice.textContent = `$${item.price.toFixed(2)}`;
                    itemEl.appendChild(itemPrice);

                    categoryEl.appendChild(itemEl);
                });

                menuContainer.appendChild(categoryEl);
            }
        });
});
