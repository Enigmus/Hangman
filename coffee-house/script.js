// Burger on/off
let burger = document.querySelector(".burger");
burger.addEventListener("click", (e) => {
    e.target.classList.toggle("burger_active");
    burger.previousElementSibling.classList.toggle("header__menu-wrap_open");
    document.querySelector("body").classList.toggle("lock");
});

//Закрыть мобильное меню при щелчке по пункту меню.
let menuLinks = document.querySelector(".header__menu-wrap");
 menuLinks.addEventListener("click", (e) => {
    if (window.innerWidth < 769) {
        if (e.target.tagName == "A") {
            burger.click();
        }
    }
}); 

//Слайдер

let slidesWrapp = document.querySelector(".slider__slides-wrap");
let sliderControls = document.querySelector('.slider__controls');

let sliderBtnLeft = document.querySelector(".slider__btn_left");
let sliderBtnRight = document.querySelector(".slider__btn_right");


let slideCount = slidesWrapp.children.length;
let slideWidth = slidesWrapp.children[0].offsetWidth;
let activeSlide = 0;

window.addEventListener('resize',()=>{
    slideWidth = slidesWrapp.children[0].offsetWidth;
    console.log(slideWidth);
    slidesWrapp.style.transitionProperty = 'all'; 
        slidesWrapp.style.transform = `translateX(-${activeSlide * slideWidth}px)`;
})

slidesWrapp.children[activeSlide].classList.add['slider__slide_active'];
sliderControls.children[activeSlide].classList.add('slider__control_active');

let posStart = 0;
let posx = 0;
let posxx = 0;
let posEnd = 0;
let posPercent = slideWidth * 0.05;

const slideStartSwipe = (e) => {
    posStart = posx = e.clientX;
    slidesWrapp.style.transitionProperty = 'none';
    slidesWrapp.style.cursor = 'grabbing';
    console.log(slidesWrapp.style.transitionProperty);

    document.addEventListener('mousemove',slideMove);
    document.addEventListener('mouseup',slideEndSwipe);
}

const slideMove = (e) => {    
    let translateXFull = slidesWrapp.style.transform;
    let translateXNum = Number(translateXFull.substring(translateXFull.indexOf('(') + 1, translateXFull.length - 3));

    posxx = posx - e.clientX;
    posx = e.clientX;
    slidesWrapp.style.transform = `translateX(${translateXNum - posxx}px)`;
}

const slideEndSwipe = () =>{
    posEnd = posStart - posx;
    slidesWrapp.style.cursor = 'grab';
    document.removeEventListener('mousemove',slideMove);
    document.removeEventListener('mouseup',slideEndSwipe);

    if(Math.abs(posEnd) > posPercent){
        if(posStart < posx)
            changeSlide('left');
        else if (posStart > posx)
            changeSlide('right');
    }

    if(posStart !== posxx){
        slidesWrapp.style.transitionProperty = 'all'; 
        slidesWrapp.style.transform = `translateX(-${activeSlide * slideWidth}px)`;
    }
}




const changeSlide = (direction) => {
    slidesWrapp.children[activeSlide].classList.remove('slider__slide_active');
    sliderControls.children[activeSlide].classList.remove('slider__control_active');
    if ((direction === "right")) {
        activeSlide++;
        if (activeSlide === slideCount) activeSlide = 0;
    } else if ((direction === "left")) {
        activeSlide--;
        if (activeSlide < 0) activeSlide = slideCount - 1;
    }

    slidesWrapp.style.transform = `translateX(-${activeSlide * slideWidth}px)`;    
    slidesWrapp.children[activeSlide].classList.add('slider__slide_active');
    sliderControls.children[activeSlide].classList.add('slider__control_active');
};



sliderBtnLeft.addEventListener("click", () => {
    changeSlide("left");
});
sliderBtnRight.addEventListener("click", () => {
    changeSlide("right");
});

slidesWrapp.addEventListener('mousedown', slideStartSwipe);


//setInterval(()=>changeSlide('right'),3000);
console.log();
