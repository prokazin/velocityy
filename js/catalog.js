// Загрузка товаров из localStorage или JSON
let products = [];

async function loadProductsData() {
    // Сначала пробуем загрузить из localStorage (если админ добавлял)
    const saved = localStorage.getItem('velocity_products');
    if (saved && saved !== '[]') {
        try {
            products = JSON.parse(saved);
            console.log('Загружено из localStorage:', products.length);
            renderProducts();
            return;
        } catch(e) {}
    }
    
    // Если нет - грузим из JSON
    try {
        const response = await fetch('data/products.json');
        products = await response.json();
        console.log('Загружено из JSON:', products.length);
        renderProducts();
    } catch (error) {
        console.log('Ошибка загрузки, используем данные по умолчанию');
        products = [
            { id: 1, name: "City Rider", desc: "Лёгкий и манёвренный для города", price: "₽25 000", image: "images/bike1.jpg" },
            { id: 2, name: "Mountain Pro", desc: "Для бездорожья и приключений", price: "₽45 000", image: "images/bike2.jpg" }
        ];
        renderProducts();
    }
}

function renderProducts() {
    const grid = document.getElementById('bikeGrid');
    if (!grid) return;
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="text-align:center; grid-column:1/-1;">Товары скоро появятся</p>';
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
}    grid.innerHTML = '';
    
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
