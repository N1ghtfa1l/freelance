document.addEventListener('DOMContentLoaded', () => {
    const priceInput = document.querySelectorAll(".field input");
    const shopCarts = document.querySelectorAll('.shop-cart');
    const progress = document.querySelector(".slider .progress");

    priceInput.forEach(input => {
        input.addEventListener("input", () => {
            const minVal = parseInt(priceInput[0].value);
            const maxVal = parseInt(priceInput[1].value);
            const selectedCarts = [];

            // Фильтруем товары по выбранному диапазону цен
            shopCarts.forEach(cart => {
                const price = parseInt(cart.querySelector('.cart-price').textContent);
                if (price >= minVal && price <= maxVal) {
                    selectedCarts.push(cart);
                }
            });

            // Отображаем только отфильтрованные товары
            shopCarts.forEach(cart => {
                if (selectedCarts.includes(cart)) {
                    cart.style.display = 'block';
                } else {
                    cart.style.display = 'none';
                }
            });

            // Обновляем визуализацию прогресса
            const minValuePercent = (minVal / parseInt(priceInput[0].max)) * 100;
            const maxValuePercent = (maxVal / parseInt(priceInput[1].max)) * 100;
            progress.style.left = `${minValuePercent}%`;
            progress.style.right = `${100 - maxValuePercent}%`;
        });
    });
});