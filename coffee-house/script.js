let burger = document.querySelector(".burger");
burger.addEventListener('click',(e) => {
    e.target.classList.toggle("burger_active")
    burger.previousElementSibling.classList.toggle("header__menu-wrap_open");
    document.querySelector('body').classList.toggle('lock')
})
console.log(burger)