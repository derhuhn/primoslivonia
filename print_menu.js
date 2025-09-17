document.addEventListener('DOMContentLoaded', () => {
    fetch('primos_print_menu.md')
        .then(response => response.text())
        .then(markdown => {
            const frontPage = document.getElementById('front-page');
            const backPage = document.getElementById('back-page');

            const frontPageTitles = [
                'Specialty Pizzas',
                'Round Pizza',
                'Square Pizza',
                'Tray Pizza',
                'Stuffed Pizza',
                'BBQ Ribs',
                'Broasted Chicken',
                'Primo\'s Chicken Tenders',
                'Wing Dings',
                'Combination Plates',
                'Seafood',
                'Hand Battered Shrimp'
            ];

            const backPageTitles = [
                'Salads',
                'Submarines',
                'Sandwiches',
                'Side Orders',
                'Desserts',
                'Pasta',
                'U BAKE PIZZA'
            ];

            const allTitles = [...frontPageTitles, ...backPageTitles, 'CHOICE OF ITEMS:', 'TOPPING SELECTIONS'];
            const sections = {};
            let currentTitle = '';

            markdown.split('\n').forEach(line => {
                const matchedTitle = allTitles.find(t => line.trim().toUpperCase().startsWith(t.toUpperCase()));
                if (matchedTitle) {
                    currentTitle = matchedTitle;
                    sections[currentTitle] = line + '\n';
                } else if (currentTitle && !line.trim().startsWith("PRIMO'S PIZZA")) {
                    sections[currentTitle] += line + '\n';
                }
            });

            const createSectionElement = (content) => {
                const sectionContainer = document.createElement('div');
                sectionContainer.classList.add('menu-section');
                
                const lines = content.trim().split('\n');
                const titleLine = lines.shift();
                const restOfContent = lines.join('\n');

                const titleElement = document.createElement('h2');
                titleElement.textContent = titleLine;

                const contentElement = document.createElement('pre');
                contentElement.textContent = restOfContent;

                sectionContainer.appendChild(titleElement);
                sectionContainer.appendChild(contentElement);
                return sectionContainer;
            };

            frontPageTitles.forEach(title => {
                if (sections[title]) {
                    frontPage.appendChild(createSectionElement(sections[title]));
                }
            });

            backPageTitles.forEach(title => {
                if (sections[title] && title !== 'TOPPING SELECTIONS') {
                    backPage.appendChild(createSectionElement(sections[title]));
                }
            });

            // Handle the special toppings section
            const toppingsTitle = 'CHOICE OF ITEMS:';
            if (sections[toppingsTitle]) {
                const toppingsContainer = document.createElement('div');
                toppingsContainer.id = 'toppings-footer';
                toppingsContainer.appendChild(createSectionElement(sections[toppingsTitle]));
                frontPage.appendChild(toppingsContainer);
            }
        });
});





