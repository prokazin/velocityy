// Пароль администратора (можно изменить)
const ADMIN_PASSWORD = 'velocity2025';

// Загрузка товаров из JSON
let products = [];

async function loadProducts() {
    try {
        const response = await fetch('data/products.json');
        products = await response.json();
        renderAdminProductsList();
    } catch (error) {
        console.log('Ошибка загрузки товаров:', error);
        products = [];
    }
}

// Сохранение товаров в JSON (имитация через localStorage)
function saveProducts() {
    // Для GitHub Pages используем localStorage как временное хранилище
    localStorage.setItem('velocity_products', JSON.stringify(products));
    
    // Обновляем отображение
    renderAdminProductsList();
    
    // Обновляем catalog.js если он перезагрузится
    if (typeof updateCatalogData === 'function') {
        updateCatalogData(products);
    }
}

// Отображение списка товаров в админке
function renderAdminProductsList() {
    const container = document.getElementById('productsAdminList');
    if (!container) return;
    
    if (products.length === 0) {
        container.innerHTML = '<p>Товаров пока нет</p>';
        return;
    }
    
    let html = '<div class="admin-products-grid">';
    for (let i = 0; i < products.length; i++) {
        const p = products[i];
        html += `
            <div class="admin-product-card">
                <img src="${p.image}" alt="${p.name}" onerror="this.src='https://via.placeholder.com/80x80'">
                <div class="admin-product-info">
                    <strong>${p.name}</strong>
                    <span>${p.price}</span>
                    <small>${p.desc.substring(0, 50)}</small>
                </div>
                <button class="delete-btn" data-id="${p.id}">🗑️ Удалить</button>
            </div>
        `;
    }
    html += '</div>';
    container.innerHTML = html;
    
    // Добавляем обработчики удаления
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(btn.getAttribute('data-id'));
            deleteProduct(id);
        });
    });
}

// Добавление товара
function addProduct(name, desc, price, image) {
    if (!name || !desc || !price || !image) {
        alert('Заполните все поля');
        return false;
    }
    
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    
    const newProduct = {
        id: newId,
        name: name,
        desc: desc,
        price: price,
        image: image
    };
    
    products.push(newProduct);
    saveProducts();
    alert('Товар добавлен!');
    return true;
}

// Удаление товара
function deleteProduct(id) {
    if (confirm('Удалить этот товар?')) {
        products = products.filter(p => p.id !== id);
        saveProducts();
        alert('Товар удалён');
    }
}

// Вход в админку
function initAdminLogin() {
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('adminPassword');
    const loginForm = document.getElementById('loginForm');
    const adminControls = document.getElementById('adminControls');
    const loginError = document.getElementById('loginError');
    
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const enteredPassword = passwordInput.value;
            if (enteredPassword === ADMIN_PASSWORD) {
                loginForm.style.display = 'none';
                adminControls.style.display = 'block';
                loginError.textContent = '';
                loadProducts();
            } else {
                loginError.textContent = 'Неверный пароль';
            }
        });
    }
    
    // Добавление товара
    const addBtn = document.getElementById('addProductBtn');
    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const name = document.getElementById('productName').value;
            const desc = document.getElementById('productDesc').value;
            const price = document.getElementById('productPrice').value;
            const image = document.getElementById('productImage').value;
            
            addProduct(name, desc, price, image);
            
            // Очищаем поля
            document.getElementById('productName').value = '';
            document.getElementById('productDesc').value = '';
            document.getElementById('productPrice').value = '';
            document.getElementById('productImage').value = '';
        });
    }
}

// Загрузка
document.addEventListener('DOMContentLoaded', () => {
    initAdminLogin();
    if (typeof initMobileMenu === 'function') initMobileMenu();
});

// Функция для синхронизации с catalog.js
window.updateCatalogData = function(newProducts) {
    localStorage.setItem('velocity_products', JSON.stringify(newProducts));
};
