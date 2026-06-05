// ===== МАССИВ ТОВАРОВ =====
// ПРОСТО ДОБАВЛЯЙ НОВЫЙ ОБЪЕКТ В ЭТОТ МАССИВ
// ФОРМАТ: { name: "Название", desc: "Описание", price: "Цена", image: "images/название.jpg" }

const products = [
    {
        name: "BOOSTER NAIK",
        desc: "Лёгкий и манёвренный для города",
        price: "₽79 000",
        image: "images/bike1.jpg"
    },
    {
        name: "Mountain Pro",
        desc: "Для бездорожья и приключений",
        price: "₽45 000",
        image: "images/bike2.jpg"
    },
    {
        name: "Electro Move",
        desc: "Электровелосипед с запасом хода 80км",
        price: "₽89 000",
        image: "images/bike3.jpg"
    },
    {
        name: "Speed Racer",
        desc: "Шоссейный велосипед для скорости",
        price: "₽67 000",
        image: "images/bike4.jpg"
    }
];

// Функция отрисовки всех товаров
function renderProducts() {
    const grid = document.getElementById('bikeGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bike-card';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <span class="price">${product.price}</span>
        `;
        
        grid.appendChild(card);
    });
}

// Запуск
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
});
