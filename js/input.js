const rangeInputs = document.querySelectorAll(".range-input input");
const priceInputs = document.querySelectorAll(".field input");
const progress = document.querySelector(".slider .progress");
const shopCarts = document.querySelectorAll('.shop-cart');

let priceGap = 1000;

priceInputs.forEach(input => {
    input.addEventListener("input", () => {
        let minVal = parseInt(priceInputs[0].value);
        let maxVal = parseInt(priceInputs[1].value);
        if ((maxVal - minVal >= priceGap) && maxVal < 40000) {
            if (input.classList.contains("input-min")) {
                rangeInputs[0].value = minVal;
                progress.style.left = (minVal / rangeInputs[0].max) * 100 + "%";
            } else {
                rangeInputs[1].value = maxVal;
                progress.style.right = 100 - (maxVal / rangeInputs[1].max) * 100 + "%";
            }
        }
    });
});

rangeInputs.forEach(input => {
    input.addEventListener("input", () => {
        let minVal = parseInt(rangeInputs[0].value);
        let maxVal = parseInt(rangeInputs[1].value);
        if (maxVal - minVal < priceGap) {
            if (input.classList.contains("range-min")) {
                rangeInputs[0].value = maxVal - priceGap;
            } else {
                rangeInputs[1].value = minVal + priceGap;
            }
        } else {
            priceInputs[0].value = minVal;
            priceInputs[1].value = maxVal;
            progress.style.left = (minVal / rangeInputs[0].max) * 100 + "%";
            progress.style.right = 100 - (maxVal / rangeInputs[1].max) * 100 + "%";
        }
    });
});

// Фильтрация товаров по цене
function filterProductsByPrice() {
    const minPrice = parseInt(priceInputs[0].value);
    const maxPrice = parseInt(priceInputs[1].value);

    shopCarts.forEach(cart => {
        const cartPrice = parseInt(cart.querySelector('.cart-price').textContent.replace(' ₽', ''));
        if (cartPrice >= minPrice && cartPrice <= maxPrice) {
            cart.style.display = 'block';
        } else {
            cart.style.display = 'none';
        }
    });
}
document.getElementById('catalog__form').addEventListener('reset', () => {
    setTimeout(() => {
        // Восстанавливаем начальные значения для инпутов диапазона
        rangeInputs[0].value = rangeInputs[0].min;
        rangeInputs[1].value = rangeInputs[1].max;
        priceInputs[0].value = rangeInputs[0].min;
        priceInputs[1].value = rangeInputs[1].max;
        progress.style.left = '0%';
        progress.style.right = '0%';

        // Показать все товары
        shopCarts.forEach(cart => {
            cart.style.display = 'block';
        });
    }, 0); // Используем setTimeout, чтобы изменения произошли после сброса формы
});

priceInputs.forEach(input => {
    input.addEventListener('input', filterProductsByPrice);
});

rangeInputs.forEach(input => {
    input.addEventListener('input', filterProductsByPrice);
});

// Первичная фильтрация товаров по цене
filterProductsByPrice();
