// Загрузка товаров из localStorage или JSON
let products = [];

async function loadProductsData() {
    console.log('Загрузка товаров...');
    
    // Сначала пробуем загрузить из localStorage (если админ добавлял)
    const saved = localStorage.getItem('velocity_products');
    if (saved && saved !== '[]') {
        try {
            products = JSON.parse(saved);
            console.log('Загружено из localStorage:', products.length);
            renderProducts();
            return;
        } catch(e) {
            console.log('Ошибка парсинга localStorage');
        }
    }
    
    // Если нет - грузим из JSON
    try {
        const response = await fetch('data/products.json');
        if (response.ok) {
            products = await response.json();
            console.log('Загружено из JSON:', products.length);
        } else {
            throw new Error('JSON не загружен');
        }
    } catch (error) {
        console.log('Ошибка загрузки JSON, используем тестовые данные');
        products = [
            { id: 1, name: "City Rider", desc: "Лёгкий и манёвренный для города", price: "₽25 000", image: "images/bike1.jpg" },
            { id: 2, name: "Mountain Pro", desc: "Для бездорожья и приключений", price: "₽45 000", image: "images/bike2.jpg" },
            { id: 3, name: "Electro Move", desc: "Электровелосипед с запасом хода 80км", price: "₽89 000", image: "images/bike3.jpg" },
            { id: 4, name: "Speed Racer", desc: "Шоссейный велосипед для скорости", price: "₽67 000", image: "images/bike4.jpg" },
            { id: 5, name: "Urban Explorer", desc: "Стильный городской велосипед", price: "₽32 000", image: "images/bike5.jpg" }
        ];
    }
    
    renderProducts();
}

function renderProducts() {
    const grid = document.getElementById('bikeGrid');
    if (!grid) {
        console.log('Ошибка: bikeGrid не найден на странице');
        return;
    }
    
    console.log('Рендер товаров, количество:', products.length);
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column:1/-1; padding: 2rem;">Товары скоро появятся</p>';
        return;
    }
    
    grid.innerHTML = '';
    
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const card = document.createElement('div');
        card.className = 'bike-card';
        
        card.innerHTML = '<img src="' + product.image + '" alt="' + product.name + '" onerror="this.src=\'https://via.placeholder.com/300x200?text=VELO+CITY\'">' +
            '<h3>' + product.name + '</h3>' +
            '<p>' + product.desc + '</p>' +
            '<span class="price">' + product.price + '</span>';
        
        grid.appendChild(card);
    }
}

// Запуск
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProductsData);
} else {
    loadProductsData();
}
