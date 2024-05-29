const modal = document.querySelector('.modal-ikons')
const close = document.querySelector('.modal__ikons-close')
const introBuy = document.querySelector('.modal-text__inner')
/* body */
const body = document.querySelector('body')
/* modal cart */
const cartOpen = document.querySelector('.modal-cart')
const cartClose = document.querySelector('.modal__cart-close')
const cart = document.querySelector('.modal__cart-box-items')
/* mini cart */
const miniCartOpen = document.querySelector('.modal-mini-cart')
const introCart = document.querySelector('.mini-cart-box')
/* mini cart for modal cart */
const miniBtn = document.querySelector('.mini-cart-bottom-btn')
let buyCartItem
let buyOffer
const miniCartBox = document.querySelector('.mini-cart-box')


window.addEventListener('click', (event) => {
    if (event.target.closest('.header-nav-cart')) {
        miniCartOpen.style.display = 'flex';
        body.style.overflow = 'hidden';
    } else if (event.target == miniCartOpen) {
        miniCartOpen.style.display = 'none';
        body.style.overflow = 'visible';
    }
    if (event.target == miniBtn) {
        cartOpen.style.display = 'flex';
    } else if (event.target == cartClose || event.target == cartOpen) {
        cartOpen.style.display = 'none';
    }

    const shopInfo = event.target.closest('.shop-cart')
    if (shopInfo) {
        /* ОБЪЕКТ */
        const shopItem = {
            id: shopInfo.dataset.cartId,
            title: shopInfo.querySelector('.cart-title').innerText,
            price: shopInfo.querySelector('.cart-price').innerText,
        };

        /* ШАБЛОНЫЕ СТРОКИ */
        const shopOnItem = `
        
        <div class="modal-text__inner-title">${shopItem.title}</div>
        <div class="modal-text__inner-choose">
        <div class="modal-text__inner-choose-title">Выберите размер</div>
        <button class="modal-text__inner-choose-btn">36</button>
        <button class="modal-text__inner-choose-btn">36</button>
        <button class="modal-text__inner-choose-btn">36</button>
        <button class="modal-text__inner-choose-btn">36</button>
        <button class="modal-text__inner-choose-btn">36</button>
        </div>
        <div class="modal-text__inner-price">${shopItem.price}</div>
        <button class="modal-text__inner-btn">Заказать</button>
        <div class="modal-text__inner-bonuses">
        <img src="img/catalog/Vector.png" alt=""
        class="modal-text__inner-bonuses-img">
        <span class="modal-text__inner-bonuses-text">Бесплатная доставка до
        двери</span>
        </div>
        <div class="modal-text__inner-bonuses">
        <img src="img/catalog/Vector.png" alt=""
        class="modal-text__inner-bonuses-img">
        <span class="modal-text__inner-bonuses-text">Оплата заказа при
        получении</span>
        </div>
        <div class="modal-text__inner-bonuses">
        <img src="img/catalog/Vector.png" alt=""
        class="modal-text__inner-bonuses-img">
        <span class="modal-text__inner-bonuses-text">Обмен в течении двух
        недель</span>
        </div>`
        buyCartItem = `
        <div class="mini-cart-box__card" data-id="${shopItem.id}">
        <img src="img/modal/cross.png" alt="" class="mini-cart-box__card-img">
        <div class="mini-cart-box__card-desc">
        <div class="mini-cart-box__card-desc__title">${shopItem.title}</div>
        <div class="mini-cart-box__card-price">${shopItem.price}</div>
        </div>
        <img data-delete src="img/modal/trash.png" alt="" class="mini-cart-box__card-trash">
        </div>
        `
        buyOffer = `
        <div class="modal__cart-box__inner-item" data-id="${shopItem.id}">
                                    <img src="img/modal/cross.png" alt="" class="mini-cart-box__card-img">
                                    <div class="mini-cart-box__card-desc">
                                        <div class="mini-cart-box__card-desc__title">${shopItem.title}
                                        </div>
                                        <div class="modal-cart-total-price">${shopItem.price}</div>
                                    </div>
                                    <button data-delete class="modal__cart-box__inner-btn">Удалить</button>
                                </div>
        
        `

        introBuy.insertAdjacentHTML("afterbegin", shopOnItem);
        modal.style.display = 'flex';
        body.style.overflow = 'hidden';

    }
    if (event.target.matches('.modal-text__inner-btn')) {
        introCart.insertAdjacentHTML("afterbegin", buyCartItem)
        cart.insertAdjacentHTML("beforeend", buyOffer);
        itemsCounter()
        itemCounter()
        calcBiletPrice()
    }
    if (event.target == modal || event.target == close) {
        modal.style.display = 'none';
        introBuy.innerHTML = '';
        body.style.overflow = 'visible';

    }



    if (event.target.hasAttribute('data-delete')) {
        let cartItemToRemove
        let offerItemToRemove
    
        if (event.target.closest('.mini-cart-box')) {
            cartItemToRemove = event.target.closest('.mini-cart-box__card');
            const id = cartItemToRemove.getAttribute('data-id');
            offerItemToRemove = document.querySelector(`.modal__cart-box__inner-item[data-id="${id}"]`);
        } else if (event.target.closest('.modal__cart-box__inner')) {
            offerItemToRemove = event.target.closest('.modal__cart-box__inner-item');
            const id = offerItemToRemove.getAttribute('data-id');
            cartItemToRemove = document.querySelector(`.mini-cart-box__card[data-id="${id}"]`);
        }
    
        if (cartItemToRemove && offerItemToRemove) {
            cartItemToRemove.remove();
            offerItemToRemove.remove();
            
            itemCounter();
            itemsCounter();
            calcBiletPrice();
        }
    }
    // if (event.target.hasAttribute('data-delete')) {
    //     if (event.target.closest('.mini-cart-box')) {
    //         event.target.closest('.mini-cart-box__card').remove();
    //         itemCounter()
    //     } else if (event.target.closest('.modal__cart-box__inner')) {
    //         event.target.closest('.modal__cart-box__inner-item').remove();
    //         itemsCounter()
    //     }
    //     calcBiletPrice()

    // }
})

function itemCounter() {
    let currentPrice = 0;
    const cartPrice = document.querySelector('.cart-counter');
    if (miniCartBox.children.length > 0) {
        currentPrice = parseInt(miniCartBox.children.length);
    }
    cartPrice.innerHTML = currentPrice;
}
function itemsCounter() {
    let currentPrice = 0;
    const cartPrice = document.querySelector('.modal__cart-counter');
    if (cart.children.length > 0) {
        currentPrice = parseInt(cart.children.length);
    }
    cartPrice.innerHTML = currentPrice;
}
function calcBiletPrice() {
    const miniCart = document.querySelectorAll('.mini-cart-box__card');
    const modalCart = document.querySelectorAll('.modal__cart-box__inner-item');
    const totalMiniModal = document.querySelector('.mini-cart-counter-price');
    const totalModal = document.querySelector('.total-modal');
    let priceTotal = 0;
    let priceTotals = 0;
    modalCart.forEach(function(item) {
        const priceEL = item.querySelector('.modal-cart-total-price');
        const currentPrices = parseInt(priceEL.innerText);
        priceTotals += currentPrices;
    })
    totalModal.innerHTML = priceTotals;

    miniCart.forEach(function (item) {
        const priceEL = item.querySelector('.mini-cart-box__card-price');
        const currentPrice = parseInt(priceEL.innerText);
        priceTotal += currentPrice;
    });
    totalMiniModal.innerText = priceTotal;

}






