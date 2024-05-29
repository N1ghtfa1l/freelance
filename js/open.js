const plus = document.querySelectorAll('.side-img')
plus.forEach(function (item) {
    item.addEventListener('click', function () {
        const plusId = this.dataset.question
        const question = document.querySelector('#' + plusId)
        question.classList.toggle('qustions__inner__side-subtitle--active')
    })
})
