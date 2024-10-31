const items = [{
        title: "Куртка 'Gloss'",
        tags: ["зима"],
        price: 245,
        img: "./img/1.png",
        rating: 4.2,
    },
    {
        title: "Пальто-пиджак",
        tags: ["осень"],
        price: 230,
        img: "./img/2.png",
        rating: 4.3,
    },
    {
        title: "Жилетка",
        tags: ["осень"],
        price: 150,
        img: "./img/3.png",
        rating: 5.0,
    },
    {
        title: "Жакет",
        tags: ["осень", "зима"],
        price: 150,
        img: "./img/4.png",
        rating: 4.2,
    },
    {
        title: "Корсет",
        tags: ["все сезоны"],
        price: 200,
        img: "./img/5.png",
        rating: 4.8,
    },
    {
        title: "Брючный костюм тройка",
        tags: ["все сезоны"],
        price: 550,
        img: "./img/6.png",
        rating: 4.4,
    },
    {
        title: "Косуха",
        tags: ["осень"],
        price: 300,
        img: "./img/7.png",
        rating: 5.0,
    },
    {
        title: "Пальто",
        tags: ["осень"],
        price: 450,
        img: "./img/8.png",
        rating: 4.0,
    },
    {
        title: "Лонгслив",
        tags: ["все сезоны"],
        price: 120,
        img: "./img/9.png",
        rating: 3.9,
    },
    {
        title: "Брючный костюм",
        tags: ["все сезоны"],
        price: 450,
        img: "./img/10.png",
        rating: 4.4,
    },
    {
        title: "Костюм",
        tags: ["лето", "осень"],
        price: 350,
        img: "./img/11.png",
        rating: 4.1,
    },
    {
        title: "Платье",
        tags: ["все сезоны"],
        price: 230,
        img: "./img/12.png",
        rating: 5.0,
    }
];
const cardTemplate = document.querySelector('#item-template');
const container = document.querySelector('.shop-cards');
const input = document.querySelector('#search-input');
const button = document.querySelector('#search-btn');
const nothingFound = document.querySelector('#nothing-found');

function makeCardByTemplate(title, tags, price, img, rating) {
    const myCard = cardTemplate.content.cloneNode(true);

    myCard.querySelector('h1').textContent = title;
    myCard.querySelector('.price').textContent = `${price} BYN`;
    myCard.querySelector('img').src = img;

    const tagsContainer = myCard.querySelector('.tags');

    tags.forEach((tag) => {
        const element = document.createElement('span');
        element.classList.add('tag');
        element.textContent = tag;
        tagsContainer.append(element);
    });

    const ratingContainer = myCard.querySelector('.rating');
    for (let i = 0; i < Math.floor(rating); i++) {
        const star = document.createElement("i");
        star.classList.add("fa", "fa-star");
        ratingContainer.append(star);
    }


    return myCard;
}
let currentState = [...items];

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
};

function renderItems(arr) {
    container.innerHTML = '';
    nothingFound.textContent = '';


    arr.forEach((item) => {
        const card = makeCardByTemplate(item.title, item.tags, item.price, item.img, item.rating);
        container.append(card);
    });
    if (!arr.length) {
        nothingFound.textContent = 'Ничего не найдено';
    }
}
renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

const sortControl = document.querySelector('#sort');

sortControl.addEventListener('change', (event) => {
    const selectedOption = event.target.value

    switch (selectedOption) {
        case 'expensive':
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case 'cheap':
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case 'rating':
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case 'alphabet':
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems(currentState);
})

function provideSearch() {
    const searchItems = input.value.trim().toLowerCase();

    currentState = items.filter((el) => el.title.toLowerCase().includes(searchItems));

    currentState.sort((a, b) => sortByAlphabet(a, b));
    sortControl.selectedIndex = 0;
    renderItems(currentState);
}
button.addEventListener('click', provideSearch);
input.addEventListener('search', provideSearch);