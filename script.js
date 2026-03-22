/* 
    Assignment: Frame
    1. Pick a free, public API (e.g. NASA, Dog API, PokéAPI, etc.)
    2. In getData(), use fetch() to fetch data from the API
    3. Insert 10+ li elements into the .frame element 
*/

const frame = document.querySelector('.frame');
let currentItem = 0;
let totalItems = 20;

async function getData() {
    try {
        const response = await fetch('https://api.disneyapi.dev/character');
        const result = await response.json();

        frame.innerHTML = '';

        // Disney API stores the characters in result.data
        let characters = result.data.slice(0, 20);

        characters.forEach((char, index) => {
            const li = document.createElement('li');

            const img = document.createElement('img');
            img.src = char.imageUrl || '';
            img.alt = char.name;

            const name = document.createElement('p');
            name.textContent = char.name;

            li.appendChild(img);
            li.appendChild(name);

            if (index === 0) {
                li.classList.add('active');
            }

            frame.appendChild(li);
        });

        totalItems = characters.length;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function goToItem(index) {
    const items = frame.querySelectorAll('li');
    if (items.length === 0) return;

    items[currentItem].classList.remove('active');
    currentItem = index;
    items[currentItem].classList.add('active');
}

frame.addEventListener('click', function () {
    const nextItem = (currentItem + 1) % totalItems;
    goToItem(nextItem);
});

getData();