document.addEventListener('DOMContentLoaded', () => {
    const sizeBlocks = document.querySelectorAll('.size-block');
    const shopCarts = document.querySelectorAll('.shop-cart');

    let selectedSize = null;

    sizeBlocks.forEach(sizeBlock => {
        sizeBlock.addEventListener('click', () => {
            const newSize = sizeBlock.getAttribute('data-size');
            console.log(newSize)

            // Если выбран тот же размер, что и ранее, снимаем выбор
            if (newSize === selectedSize) {
                selectedSize = null;
            } else {
                selectedSize = newSize;
            }

            // Перебираем все товары
            shopCarts.forEach(cart => {
                const cartSize = cart.getAttribute('data-cart-size');
                console.log(cartSize)

                // Проверяем, совпадает ли размер с выбранным
                if (selectedSize === null || selectedSize === cartSize) {
                    // Показываем текущий товар
                    cart.style.display = 'block';
                } else {
                    // Скрываем остальные товары
                    cart.style.display = 'none';
                }
            });
        });
    });
});