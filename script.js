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

     frame.innerHTML = "";

    // 10 li 
    for (let i = 0; i < 10; i++) {
        const li = document.createElement("li");

        if (i == 0) {
            li.classList.add("active");
        }

        li.textContent = "Loading...";
        frame.appendChild(li);
    }

    const query = `
        query {
            pokemons(limit: 10, offset: 0) {
                results {
                    name
                }
            }
        }
    `;

    try {
        const response = await fetch("https://graphql-pokeapi.vercel.app/api/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ query: query })
        });

        const data = await response.json();
        const pokemonList = data.data.pokemons.results;

        const items = frame.querySelectorAll("li");

        for (let i = 0; i < pokemonList.length; i++) {
            items[i].textContent = pokemonList[i].name;
        }

    } catch (error) {
        console.log(error);
    }
}

function goToItem(index) {
    const items = frame.querySelectorAll('li');

    if (items.length == 0) {
        return;
    }

    if (!items[currentItem]) {
        currentItem = 0;
    }

    items[currentItem].classList.remove('active');

    currentItem = index % items.length;

    items[currentItem].classList.add('active');
}
frame.addEventListener('click', function () {
    const nextItem = (currentItem + 1) % totalItems;
    goToItem(nextItem);
});

getData();