const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

// Function to search for suggestions based on user input
function search(str) {
    let results = [];

    for (let i = 0; i < fruit.length; i++) {
        if (fruit[i].toLowerCase().includes(str.toLowerCase())) {
            results.push(fruit[i]);
        }
    }

    return results;
}

// Event handler for user input in the search bar
function searchHandler(e) {
    const inputValue = e.target.value;
    const results = search(inputValue);
    showSuggestions(results, inputValue);
}

// Function to display suggestions in the dropdown
function showSuggestions(results, inputVal) {
    suggestions.innerHTML = '';

    if (results.length > 0) {
        const select = document.createElement('select');

        results.forEach(result => {
            const option = document.createElement('option');
            option.textContent = result;
            select.appendChild(option);

            // Add event listener for hover
            option.addEventListener('mouseover', function() {
                highlightSuggestion(this);
            });

            // Add event listener for click
            option.addEventListener('click', function() {
                useSuggestion(this);
            });
        });

        select.addEventListener('change', function() {
            input.value = this.value;
            suggestions.innerHTML = '';
        });

        suggestions.appendChild(select);
    } else {
        const message = document.createElement('p');
        message.textContent = 'No suggestions found';
        suggestions.appendChild(message);
    }
}

// Function to highlight the suggestion on hover
function highlightSuggestion(option) {
    const allOptions = document.querySelectorAll('select option');
    
    allOptions.forEach((opt) => opt.classList.remove('highlighted'));
    option.classList.add('highlighted');
}

// Function to use the selected suggestion when clicked
function useSuggestion(option) {
    input.value = option.value || option.textContent;
    suggestions.innerHTML = '';
}

// Event listener for user input in the search bar
input.addEventListener('input', searchHandler);

// Event listener for mouseout to remove the highlighting when the cursor leaves the suggestions container
suggestions.addEventListener('mouseout', () => {
    const allOptions = document.querySelectorAll('select option');
    allOptions.forEach((opt) => opt.classList.remove('highlighted'));
});

// Event listener for click on suggestions to use the selected suggestion
suggestions.addEventListener('click', (e) => {
    const clickedOption = e.target;
    if (clickedOption.tagName === 'OPTION') {
        useSuggestion(clickedOption);
    }
});
