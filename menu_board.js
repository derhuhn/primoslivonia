document.addEventListener("DOMContentLoaded", () => {
    fetch("menu.json")
        .then(response => response.json())
        .then(data => {
            const menuBoard1 = document.getElementById("menu-board-1");
            const menuBoard2 = document.getElementById("menu-board-2");
            const menuBoard3 = document.getElementById("menu-board-3");

            const screen1Categories = ["Round Pizza", "Square Pizza", "Specialty Pizzas", "Tray Pizza", "Stuffed Pizza", "U Bake Pizza"];
            const screen2Categories = ["BBQ Ribs", "Broasted Chicken", "Chicken Tenders", "Wing Dings", "Combination Plates", "Seafood", "Hand Battered Shrimp"];
            const screen3Categories = ["Side Orders", "Submarines", "Sandwiches", "Pasta", "Salads", "Desserts", "Extras", "Buckets"];

            if (menuBoard1) {
                menuBoard1.classList.add("menu-board-1-layout");
                renderMenu1(data, screen1Categories, menuBoard1);
            }

            if (menuBoard2) {
                menuBoard2.classList.add("menu-board-2-layout");
                renderMenu2(data, screen2Categories, menuBoard2);
            }

            if (menuBoard3) {
                menuBoard3.classList.add("menu-board-3-layout");
                renderMenu3(data, screen3Categories, menuBoard3);
            }
        });

    function renderMenu(data, categories, container) {
        categories.forEach(categoryName => {
            if (data[categoryName]) {
                const categoryEl = document.createElement("div");
                categoryEl.classList.add("category");

                const categoryTitle = document.createElement("h1");
                if (categoryName === "Hand Battered Shrimp") {
                    categoryTitle.innerHTML = `<span class="small-header-part">Hand Battered</span> Shrimp`;
                } else if (categoryName === "Combination Plates") {
                    categoryTitle.classList.add("combination-plates-header");
                    categoryTitle.textContent = categoryName;
                } else {
                    categoryTitle.textContent = categoryName;
                }
                categoryEl.appendChild(categoryTitle);

                const itemsEl = createItems(data[categoryName], categoryName);
                categoryEl.appendChild(itemsEl);
                container.appendChild(categoryEl);
            }
        });
    }

    function renderMenu1(data, categories, container) {
        const column1 = document.createElement("div");
        column1.classList.add("category");

        const roundPizzaTitle = document.createElement("h1");
        roundPizzaTitle.textContent = "Round Pizza";
        column1.appendChild(roundPizzaTitle);
        const roundPizzaItems = createItems(data["Round Pizza"], "Round Pizza");
        column1.appendChild(roundPizzaItems);

        const squarePizzaTitle = document.createElement("h1");
        squarePizzaTitle.textContent = "Detroit Square Pizza";
        squarePizzaTitle.classList.add("detroit-square-pizza-header");
        squarePizzaTitle.style.marginTop = "2vh";
        column1.appendChild(squarePizzaTitle);
        const squarePizzaItems = createItems(data["Square Pizza"], "Square Pizza");
        column1.appendChild(squarePizzaItems);

        const detroitImage = document.createElement("img");
        detroitImage.src = "grande_detroit_style.png";
        detroitImage.classList.add("pizza-image");
        column1.appendChild(detroitImage);

        

        container.appendChild(column1);

        const column2 = document.createElement("div");
        column2.classList.add("category");

        const trayPizzaTitle = document.createElement("h1");
        trayPizzaTitle.textContent = "Tray Pizza";
        column2.appendChild(trayPizzaTitle);
        const trayPizzaItems = createItems(data["Tray Pizza"], "Tray Pizza");
        column2.appendChild(trayPizzaItems);

        const stuffedPizzaTitle = document.createElement("h1");
        stuffedPizzaTitle.textContent = "Stuffed Pizza";
        stuffedPizzaTitle.style.marginTop = "2vh";
        column2.appendChild(stuffedPizzaTitle);
        const stuffedPizzaItems = createItems(data["Stuffed Pizza"], "Stuffed Pizza");
        column2.appendChild(stuffedPizzaItems);

        container.appendChild(column2);

        const specialtyPizzaEl = document.createElement("div");
        specialtyPizzaEl.classList.add("category");
        const specialtyPizzaTitle = document.createElement("h1");
        specialtyPizzaTitle.textContent = "Specialty Pizzas";
        specialtyPizzaEl.appendChild(specialtyPizzaTitle);
        const specialtyPizzaItems = createItems(data["Specialty Pizzas"], "Specialty Pizzas");
        specialtyPizzaEl.appendChild(specialtyPizzaItems);
        container.appendChild(specialtyPizzaEl);

        const uBakePizzaEl = document.createElement("div");
        uBakePizzaEl.classList.add("category");
        const uBakePizzaTitle = document.createElement("h1");
        uBakePizzaTitle.textContent = "U Bake Pizza";
        uBakePizzaEl.appendChild(uBakePizzaTitle);
        const uBakePizzaItems = createItems(data["U Bake Pizza"], "U Bake Pizza");
        uBakePizzaEl.appendChild(uBakePizzaItems);

        container.appendChild(uBakePizzaEl);

        // No otherCategories filter here, as all are explicitly placed
    }

    function renderMenu2(data, categories, container) {
        const column1 = document.createElement("div");
        column1.classList.add("category");

        const chickenTendersTitle = document.createElement("h1");
        chickenTendersTitle.textContent = "Chicken Tenders";
        column1.appendChild(chickenTendersTitle);
        const chickenTendersItems = createItems(data["Chicken Tenders"], "Chicken Tenders");
        column1.appendChild(chickenTendersItems);

        const wingDingsTitle = document.createElement("h1");
        wingDingsTitle.textContent = "Wing Dings";
        wingDingsTitle.style.marginTop = "2vh";
        column1.appendChild(wingDingsTitle);
        const wingDingsItems = createItems(data["Wing Dings"], "Wing Dings");
        column1.appendChild(wingDingsItems);

        container.appendChild(column1);

        const column2 = document.createElement("div");
        column2.classList.add("category");

        const bbqRibsTitle = document.createElement("h1");
        bbqRibsTitle.textContent = "BBQ Ribs";
        column2.appendChild(bbqRibsTitle);
        const bbqRibsItems = createItems(data["BBQ Ribs"], "BBQ Ribs");
        column2.appendChild(bbqRibsItems);

        const handBatteredShrimpTitle = document.createElement("h1");
        handBatteredShrimpTitle.innerHTML = `<span class="small-header-part">Hand Battered</span> Shrimp`;
        handBatteredShrimpTitle.style.marginTop = "2vh";
        column2.appendChild(handBatteredShrimpTitle);
        const handBatteredShrimpItems = createItems(data["Hand Battered Shrimp"], "Hand Battered Shrimp");
        column2.appendChild(handBatteredShrimpItems);

        container.appendChild(column2);

        const broastedChickenEl = document.createElement("div");
        broastedChickenEl.classList.add("category");
        const broastedChickenTitle = document.createElement("h1");
        broastedChickenTitle.textContent = "Broasted Chicken";
        broastedChickenEl.appendChild(broastedChickenTitle);
        const broastedChickenItems = createItems(data["Broasted Chicken"], "Broasted Chicken");
        broastedChickenEl.appendChild(broastedChickenItems);
        container.appendChild(broastedChickenEl);

        const combinationPlatesEl = document.createElement("div");
        combinationPlatesEl.classList.add("category");
        const combinationPlatesTitle = document.createElement("h1");
        combinationPlatesTitle.textContent = "Combination Plates";
        combinationPlatesEl.appendChild(combinationPlatesTitle);
        const combinationPlatesItems = createItems(data["Combination Plates"], "Combination Plates");
        combinationPlatesEl.appendChild(combinationPlatesItems);
        container.appendChild(combinationPlatesEl);

        const seafoodEl = document.createElement("div");
        seafoodEl.classList.add("category");
        const seafoodTitle = document.createElement("h1");
        seafoodTitle.textContent = "Seafood";
        seafoodEl.appendChild(seafoodTitle);
        const seafoodItems = createItems(data["Seafood"], "Seafood");
        seafoodEl.appendChild(seafoodItems);
        container.appendChild(seafoodEl);

        // No otherCategories filter here, as all are explicitly placed
    }

    function renderMenu3(data, categories, container) {
        const column1 = document.createElement("div");
        column1.classList.add("category", "stretch-column-content");

        const sideOrdersTitle = document.createElement("h1");
        sideOrdersTitle.textContent = "Side Orders";
        column1.appendChild(sideOrdersTitle);
        const sideOrdersItems = createItems(data["Side Orders"], "Side Orders");
        column1.appendChild(sideOrdersItems);

        container.appendChild(column1);

        const column2 = document.createElement("div");
        column2.classList.add("category");

        const submarinesTitle = document.createElement("h1");
        submarinesTitle.textContent = "Submarines";
        column2.appendChild(submarinesTitle);
        const submarinesItems = createItems(data["Submarines"], "Submarines");
        column2.appendChild(submarinesItems);

        const extrasTitle = document.createElement("h1");
        extrasTitle.textContent = "Extras";
        extrasTitle.style.marginTop = "2vh";
        column2.appendChild(extrasTitle);
        const extrasItems = createItems(data["Extras"], "Extras");
        column2.appendChild(extrasItems);

        container.appendChild(column2);

        const column3 = document.createElement("div");
        column3.classList.add("category", "stretch-column-content");

        const saladsTitle = document.createElement("h1");
        saladsTitle.textContent = "Salads";
        column3.appendChild(saladsTitle);
        const saladsItems = createItems(data["Salads"], "Salads");
        column3.appendChild(saladsItems);

        container.appendChild(column3);

        const column4 = document.createElement("div");
        column4.classList.add("category");

        const sandwichesTitle = document.createElement("h1");
        sandwichesTitle.textContent = "Sandwiches";
        column4.appendChild(sandwichesTitle);
        const sandwichesItems = createItems(data["Sandwiches"], "Sandwiches");
        column4.appendChild(sandwichesItems);

        const dessertsTitle = document.createElement("h1");
        dessertsTitle.textContent = "Desserts";
        dessertsTitle.style.marginTop = "2vh";
        column4.appendChild(dessertsTitle);
        const dessertsItems = createItems(data["Desserts"], "Desserts");
        column4.appendChild(dessertsItems);

        const bucketsTitle = document.createElement("h1");
        bucketsTitle.textContent = "Buckets";
        bucketsTitle.style.marginTop = "2vh";
        column4.appendChild(bucketsTitle);
        const bucketsItems = createItems(data["Buckets"], "Buckets");
        column4.appendChild(bucketsItems);

        container.appendChild(column4);

        const otherCategories = categories.filter(c => c !== "Side Orders" && c !== "Submarines" && c !== "Salads" && c !== "Sandwiches" && c !== "Desserts" && c !== "Extras" && c !== "Buckets");
        renderMenu(data, otherCategories, container);
    }

    function createItems(items, categoryName) {
        const itemsEl = document.createElement("div");
        itemsEl.classList.add("items");
        const isMenu3 = !!document.getElementById("menu-board-3");

        items.forEach(item => {
            const itemEl = document.createElement("div");

            if (isMenu3 && item.price && !item.variants) {
                itemEl.classList.add("special-item-row");

                const itemName = document.createElement("div");
                itemName.classList.add("special-item-name");
                itemName.textContent = item.item;
                itemEl.appendChild(itemName);

                const itemPrice = document.createElement("div");
                itemPrice.classList.add("special-item-price");
                itemPrice.textContent = `$${item.price.toFixed(2)}`;
                itemEl.appendChild(itemPrice);
            } else if (isMenu3 && item.variants) {
                itemEl.classList.add("item");

                if (item.price) {
                    const baseItemRow = document.createElement('div');
                    baseItemRow.classList.add('special-item-row');

                    const itemName = document.createElement("div");
                    itemName.classList.add("special-item-name");
                    itemName.textContent = item.item;
                    baseItemRow.appendChild(itemName);

                    const itemPrice = document.createElement("div");
                    itemPrice.classList.add("special-item-price");
                    itemPrice.textContent = `$${item.price.toFixed(2)}`;
                    baseItemRow.appendChild(itemPrice);

                    itemEl.appendChild(baseItemRow);
                } else {
                    const itemName = document.createElement("div");
                    itemName.classList.add("item-name");
                    itemName.textContent = item.item;
                    itemEl.appendChild(itemName);
                }

                const variantsContainer = document.createElement("div");
                Object.entries(item.variants).forEach(([variantName, variantPrice]) => {
                    const variantRow = document.createElement('div');
                    variantRow.classList.add('variant-row-menu3');

                    const variantText = document.createElement('div');
                    variantText.classList.add('variant-text-menu3');
                    variantText.textContent = variantName;
                    variantRow.appendChild(variantText);

                    const variantPriceEl = document.createElement('div');
                    variantPriceEl.classList.add('variant-price-menu3');
                    variantPriceEl.textContent = `$${variantPrice.toFixed(2)}`;
                    variantRow.appendChild(variantPriceEl);

                    variantsContainer.appendChild(variantRow);
                });
                itemEl.appendChild(variantsContainer);
            } else {
                itemEl.classList.add("item");

                const itemName = document.createElement("div");
                itemName.classList.add("item-name");
                itemName.textContent = item.item;
                itemEl.appendChild(itemName);

                if (item.price) {
                    const itemPrice = document.createElement("div");
                    itemPrice.classList.add("item-price");
                    itemPrice.textContent = `$${item.price.toFixed(2)}`;
                    itemEl.appendChild(itemPrice);
                } else if (item.variants) {
                    const variantsEl = document.createElement("div");
                    variantsEl.classList.add("variants");

                    const variantNamesEl = document.createElement("div");
                    variantNamesEl.classList.add("variant-names");
                    Object.keys(item.variants).forEach(variantName => {
                        const variantNameEl = document.createElement("span");
                        if ((categoryName === "Round Pizza" || categoryName === "Square Pizza" || categoryName === "U Bake Pizza" || categoryName === "Specialty Pizzas") && variantName.includes(" ")) {
                            const parts = variantName.split(/ (.*)/s);
                            const sizeEl = document.createElement("div");
                            sizeEl.textContent = parts[0];
                            const descEl = document.createElement("div");
                            descEl.classList.add("variant-description");
                            descEl.textContent = parts[1];
                            variantNameEl.appendChild(sizeEl);
                            variantNameEl.appendChild(descEl);
                        } else {
                            variantNameEl.textContent = variantName;
                        }
                        variantNamesEl.appendChild(variantNameEl);
                    });
                    variantsEl.appendChild(variantNamesEl);

                    const variantPricesEl = document.createElement("div");
                    variantPricesEl.classList.add("variant-prices");
                    Object.values(item.variants).forEach(variantPrice => {
                        const variantPriceEl = document.createElement("span");
                        variantPriceEl.textContent = `$${variantPrice.toFixed(2)}`;
                        variantPricesEl.appendChild(variantPriceEl);
                    });
                    variantsEl.appendChild(variantPricesEl);

                    itemEl.appendChild(variantsEl);
                }
            }

            itemsEl.appendChild(itemEl);
        });
        return itemsEl;
    }
});