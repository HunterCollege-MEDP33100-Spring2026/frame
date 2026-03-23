/*
    Assignment: Frame
    1. Pick a free, public API (e.g. NASA, Dog API, PokéAPI, etc.)
    2. In getData(), use fetch() to fetch data from the API
    3. Insert 10+ li elements into the .frame element
*/

const frame = document.querySelector('.frame');
let currentItem = 0;
let totalItems = 10; // this will update after fetch

async function getData() {
    // fetch 10 random dog images from the Dog API
    const response = await fetch('https://dog.ceo/api/breeds/image/random/10');

    // convert the API response into JavaScript data
    const data = await response.json();

    // get the array of image URLs from the API
    const dogImages = data.message;

    // clear anything already inside the frame
    frame.innerHTML = '';

    // update totalItems based on how many images we received
    totalItems = dogImages.length;

    // loop through the image URLs
    dogImages.forEach((imageUrl, index) => {
        // create one list item
        const li = document.createElement('li');

        // create one image element
        const img = document.createElement('img');

        // set the image source to the API image URL
        img.src = imageUrl;

        // add alt text
        img.alt = `Dog image ${index + 1}`;

        // put the image inside the list item
        li.appendChild(img);

        // make the first item active by default
        if (index === 0) {
            li.classList.add('active');
        }

        // add the list item into the frame
        frame.appendChild(li);
    });
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