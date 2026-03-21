/* 
    Assignment: Frame
    1. Pick a free, public API (e.g. NASA, Dog API, PokéAPI, etc.)
    2. In getData(), use fetch() to fetch data from the API
    3. Insert 10+ li elements into the .frame element 
*/

const frame = document.querySelector('.frame');
let currentItem = 0;
let totalItems = 40; // change this if you do more than 10 items

async function getData() {
    try {
        const response = await fetch('https://dattebayo-api.onrender.com/characters');
        const data = await response.json();

        frame.innerHTML = '';

        let characters = data.characters;

        // duplicate until we have at least 40
        while (characters.length < 40) {
            characters = characters.concat(data.characters);
        }

        characters = characters.slice(0, 40);

        characters.forEach((char, index) => {
            const li = document.createElement('li');

            const img = document.createElement('img');
            img.src = char.images[0];

            li.appendChild(img);

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
    items[currentItem].classList.remove('active');
    currentItem = index;
    items[currentItem].classList.add('active');
}

frame.addEventListener('click', function () {
    const nextItem = (currentItem + 1) % totalItems;
    goToItem(nextItem);
});

getData();