let burger = document.querySelector(".burger");
burger.addEventListener("click", (e) => {
    e.target.classList.toggle("burger_active");
    burger.previousElementSibling.classList.toggle("header__menu-wrap_open");
    document.querySelector("body").classList.toggle("lock");
});

/* let link = document.querySelectorAll(".header__menu-wrap a");
link.addEventListener('click',(e)=>{
    burger.click();
}); */

let lnks = document.querySelector(".header__menu-wrap");
lnks.addEventListener("click", (e) => {
    if (window.innerWidth < 769) {
        if (e.target.tagName == "A") {
            lnks.classList.add("header__menu-wrap_no-transition");
            burger.click();
            setTimeout(() => {
                lnks.classList.remove("header__menu-wrap_no-transition");
            }, 1000);
        }
    }
});

console.log(lnks);
