/* 
    Assignment: Frame
    1. Pick a free, public API (e.g. NASA, Dog API, PokéAPI, etc.)
    2. In getData(), use fetch() to fetch data from the API
    3. Insert 10+ li elements into the .frame element 
*/

const frame = document.querySelector('.frame');
let currentItem = 0;
let totalItems = 10; // change this if you do more than 10 items

async function getData() {
    // YOUR CODE HERE
    const searchData = await fetch(
        "https://collectionapi.metmuseum.org/public/collection/v1/search?q=sun&hasImages=true"
    );

    const searchDataJson = await searchData.json();

    for (let i = 0; i < 10; i++) {

        const id = searchDataJson.objectIDs[i];

        const data = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
        );

        const json = await data.json();

        const image = document.createElement("img");
        image.src = json.primaryImage;

        if (i === 0) {
            image.classList.add("active");
        }

        const listItem = document.createElement("li");
        listItem.appendChild(image);

        frame.appendChild(listItem);
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