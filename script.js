const frame = document.querySelector('.frame');
let currentItem = 0;
let totalItems = 10;

async function getData() {
    const apiKey = "DEMO_KEY";
    const url = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=15`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        let count = 0;

        data.forEach(item => {
            if (item.media_type !== "image") return;
            if (count >= totalItems) return;

            const li = document.createElement("li");
            const img = document.createElement("img");

            img.src = item.url;
            img.alt = item.title;

            li.appendChild(img);

            if (count === 0) {
                li.classList.add("active");
            }

            frame.appendChild(li);
            count++;
        });

    } catch (error) {
        console.error("Error fetching NASA data:", error);
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