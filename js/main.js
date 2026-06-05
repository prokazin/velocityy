// ===== МАССИВ ТОВАРОВ =====
// ПРОСТО ДОБАВЛЯЙ НОВЫЙ ОБЪЕКТ В ЭТОТ МАССИВ
// ФОРМАТ: { name: "Название", desc: "Описание", price: "Цена", image: "images/название.jpg" }

const products = [
    {
        name: "City Rider",
        desc: "Лёгкий и манёвренный для города",
        price: "₽25 000",
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
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bike-card';
        
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <span class="price">${product.price}</span>
            <button class="order-btn">Заказать</button>
        `;
        
        grid.appendChild(card);
    });
    
    // Добавляем обработчики на кнопки Заказать
    document.querySelectorAll('.order-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.target.closest('.bike-card');
            const bikeName = card.querySelector('h3').innerText;
            alert(`Спасибо за заказ! ${bikeName}\nМенеджер VELO CITY свяжется с вами.`);
        });
    });
}

// Мобильное меню
function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.querySelector('nav');
    
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
}

// Плавный скролл по ссылкам
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                // Закрываем мобильное меню если открыто
                const nav = document.querySelector('nav');
                if (nav && nav.classList.contains('show')) {
                    nav.classList.remove('show');
                }
            }
        });
    });
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    initMobileMenu();
    initSmoothScroll();
});
