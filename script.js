/*
    Assignment: Frame
    1. Pick a free, public API (e.g. NASA, Dog API, PokéAPI, etc.)
    2. In getData(), use fetch() to fetch data from the API
    3. Insert 10+ li elements into the .frame element
*/

const frame = document.querySelector('.frame');
let currentItem = 0;
let totalItems = 10;

async function getData() {
  const response = await fetch('https://catfact.ninja/facts?limit=10');
  const data = await response.json();

  data.data.forEach((item, index) => {
    const li = document.createElement('li');
    li.textContent = item.fact;

    if (index === 0) {
      li.classList.add('active');
    }

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
