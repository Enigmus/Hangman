// Burger on/off
let burger = document.querySelector(".burger");
if (burger) {
    burger.addEventListener("click", (e) => {
        e.target.classList.toggle("burger_active");
        burger.previousElementSibling.classList.toggle(
            "header__menu-wrap_open"
        );
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
}
//Слайдер

let slidesWrapp = document.querySelector(".slider__slides-wrap");
if (slidesWrapp) {
    let sliderControls = document.querySelector(".slider__controls");

    let sliderBtnLeft = document.querySelector(".slider__btn_left");
    let sliderBtnRight = document.querySelector(".slider__btn_right");

    let slideCount = slidesWrapp.children.length; //количетсво слайдов
    let slideWidth = slidesWrapp.children[0].offsetWidth; //ширина одногго слайда
    let activeSlide = 0; //номер активного слайда

    let isPause = false;

    //пересчитываем размер слайда при изменении размера окна
    window.addEventListener("resize", () => {
        slideWidth = slidesWrapp.children[0].offsetWidth;
        slidesWrapp.style.transitionProperty = "all";
        slidesWrapp.style.transform = `translateX(-${
            activeSlide * slideWidth
        }px)`;
    });

    slidesWrapp.children[activeSlide].classList.add["slider__slide_active"];
    sliderControls.children[activeSlide].classList.add(
        "slider__control_active"
    );

    let posStart = 0; //Позиция по Х где было событие mousedown/touchstart
    let posx = 0;
    let posxx = 0;
    let posEnd = 0; //Позиция по Х где было событик mouseup/touchend
    let posPercent = slideWidth * 0.1; //На сколько процентов надо сдвинуть слайд, чтобы считался свайп

    const slideStartSwipe = (e) => {
        posStart = posx = e.clientX || e.touches[0].clientX;
        slidesWrapp.style.transitionProperty = "none";
        slidesWrapp.style.cursor = "grabbing";

        document.addEventListener("mousemove", slideMove);
        document.addEventListener("mouseup", slideEndSwipe);
        document.addEventListener("touchmove", slideMove);
        document.addEventListener("touchend", slideEndSwipe);
        animatePause(true);
    };

    const slideMove = (e) => {
        let translateXFull = slidesWrapp.style.transform;
        let translateXNum = Number(
            translateXFull.substring(
                translateXFull.indexOf("(") + 1,
                translateXFull.length - 3
            )
        );

        posxx = posx - (e.clientX || e.touches[0].clientX);
        posx = e.clientX || e.touches[0].clientX;
        slidesWrapp.style.transform = `translateX(${translateXNum - posxx}px)`;
    };

    const slideEndSwipe = () => {
        posEnd = posStart - posx;
        slidesWrapp.style.cursor = "grab";
        document.removeEventListener("mousemove", slideMove);
        document.removeEventListener("mouseup", slideEndSwipe);
        document.removeEventListener("touchmove", slideMove);
        document.removeEventListener("touchend", slideEndSwipe);
        animatePause(false);

        if (Math.abs(posEnd) > posPercent) {
            if (posStart < posx) changeSlide("left");
            else if (posStart > posx) changeSlide("right");
        }

        if (posStart !== posxx) {
            slidesWrapp.style.transitionProperty = "all";
            slidesWrapp.style.transform = `translateX(-${
                activeSlide * slideWidth
            }px)`;
        }
    };

    const changeSlide = (direction) => {
        slidesWrapp.children[activeSlide].classList.remove(
            "slider__slide_active"
        );
        sliderControls.children[activeSlide].classList.remove(
            "slider__control_active"
        );
        sliderControls.children[activeSlide].classList.add(
            "slider__control_no-active"
        );

        if (direction === "right") {
            activeSlide++;
            if (activeSlide === slideCount) activeSlide = 0;
        } else if (direction === "left") {
            activeSlide--;
            if (activeSlide < 0) activeSlide = slideCount - 1;
        }

        slidesWrapp.style.transform = `translateX(-${
            activeSlide * slideWidth
        }px)`;
        sliderControls.children[activeSlide].classList.remove(
            "slider__control_no-active"
        );
        slidesWrapp.children[activeSlide].classList.add("slider__slide_active");
        sliderControls.children[activeSlide].classList.add(
            "slider__control_active"
        );
    };

    //Навешиваем обработчики событий
    sliderBtnLeft.addEventListener("click", () => {
        changeSlide("left");
    });
    sliderBtnRight.addEventListener("click", () => {
        changeSlide("right");
    });

    slidesWrapp.addEventListener("mousedown", slideStartSwipe);
    slidesWrapp.addEventListener("touchstart", slideStartSwipe);

    slidesWrapp.addEventListener("mouseenter", () => {
        isPause = true;
        animatePause(isPause);
    });
    slidesWrapp.addEventListener("mouseleave", () => {
        isPause = false;
        animatePause(isPause);
    });

    setInterval(() => {
        if (!isPause) changeSlide("right");
    }, 5000);

    const animatePause = (isPause) => {
        if (isPause) {
            for (control of [...sliderControls.children]) {
                control.classList.add("slider__control_pause");
            }
        } else {
            for (control of [...sliderControls.children]) {
                control.classList.remove("slider__control_pause");
            }
        }
    };
}

//show-more

const showMore = (t) => {
    let showBtn = t.querySelector("button");
    showBtn.addEventListener("click", () => {
        for (const tab of [...t.children]) {
            tab.style.display = "flex";
        }
        showBtn.parentElement.style.display = "none";
    });
};

const resetShowMore = (num) => {
    let tabs = document.querySelectorAll(".menu-page__tab");

    tabs.forEach((tab) => {
        let goods = tab.querySelectorAll(".goods-cart");
        let showBtn = tab.querySelector(".menu-page__goods-more-btn");
        if (num < 769) {
            if (goods.length > 4) {
                if (showBtn) {
                    for (let i = 0; i < goods.length; i++) {
                        if (i > 3) {
                            goods[i].style.display = "none";
                        }
                    }
                    showBtn.parentElement.style.display = "flex";
                }
            } else {
                showBtn.parentElement.style.display = "none";
            }
        } else {
            for (let i = 0; i < goods.length; i++) {
                goods[i].style.display = "flex";
            }
            showBtn.parentElement.style.display = "none";
        }
    });
};

//tabs
let tabSwitcher = document.querySelector(".tab-switcher");
if (tabSwitcher) {
    let tabs = document.querySelector(".menu-page__tabs");

    showMore(tabs.children[0]);
    let i = 0;
    for (const tabSwitch of [...tabSwitcher.children]) {
        tabSwitch.id = i;
        i++;
    }

    const tabSwitchNoActive = () => {
        for (const tabSwitch of [...tabSwitcher.children]) {
            if (tabSwitch.classList.contains("tab-switcher__item_active"))
                tabSwitch.classList.remove("tab-switcher__item_active");
        }
    };
    const tabNoActive = () => {
        for (const tab of [...tabs.children]) {
            if (tab.classList.contains("menu-page__tab_active"))
                tab.classList.remove("menu-page__tab_active");
        }
    };

    tabSwitcher.addEventListener("click", (e) => {
        let li = e.target.closest("li");
        if (e.target.closest("li")) {
            tabSwitchNoActive();
            tabNoActive();
            resetShowMore(window.innerWidth);
            li.classList.add("tab-switcher__item_active");
            tabs.children[li.id].classList.add("menu-page__tab_active");
            showMore(tabs.children[li.id]);
        }
    });
    window.addEventListener("resize", () => {
        resetShowMore(window.innerWidth);
    });
}

/************************** */
let modal = document.querySelector(".modal");
if (modal) {
    let goodsCart = document.querySelectorAll(".goods-cart");

    //загрузили JSON
    async function loadJSON() {
        const response = await fetch("products.json");
        const data = await response.json();
        return data;
    }

    //открыть модалку
    const modalOpen = (goodData, imgSrc, imgAlt) => {
        modal.innerHTML = modalConstuct(goodData, imgSrc, imgAlt);
        modal.classList.add("modal_open");
        document.querySelector("body").classList.add("lock");
        modal
            .querySelector(".modal__close")
            .addEventListener("click", modalClose);
        modal.addEventListener("click", (e) => {
            if (e.target.classList.contains("modal__body")) modalClose();
        });
        modal.querySelectorAll('label').forEach(
          (label) => {
            label.addEventListener('click',()=>modalCheck(goodData))
          }
        );
    };

    //закрыть модалку
    const modalClose = () => {
        modal.classList.remove("modal_open");
        modal.innerHTML = "";
        document.querySelector("body").classList.remove("lock");
    };

    //конструктор модалки
    const modalConstuct = (goodData, imgSrc, imgAlt) => {
        return `<div class="modal__body">
      <div class="modal__content">
        <div class="modal__img-wrap">
          <img src="${imgSrc}" alt="${imgSrc}">
        </div>
        <form class="modal__desc" id="check">
          <div class="modal__title">
            <h3 class="modal__header heading-3">${goodData.name}</h3>
            <span class="modal__goods-desc medium">${goodData.description}</span>
          </div>
          <div class="modal__size">
            <span class="modal__size-title medium">Size</span>
            <div class="modal__size-tabs size-tabs">
              <label for="small">
                <input type="radio" name="size" id="small" value="${goodData.sizes.s["add-price"]}" checked>
                <span class="size-tabs__item">
                  <span class="size-tabs__item-icon lnk">S</span>
                  <span class="size-tabs__item-text lnk">${goodData.sizes.s.size}</span>
                </span>
              </label>
              <label for="medium">
                <input type="radio" name="size" id="medium" value="${goodData.sizes.m["add-price"]}">
                <span class="size-tabs__item">
                  <span class="size-tabs__item-icon lnk">M</span>
                  <span class="size-tabs__item-text lnk">${goodData.sizes.m.size}</span>
                </span>
              </label>
              <label for="large">
                <input type="radio" name="size" id="large" value="${goodData.sizes.l["add-price"]}">
                <span class="size-tabs__item">
                  <span class="size-tabs__item-icon lnk">L</span>
                  <span class="size-tabs__item-text lnk">${goodData.sizes.l.size}</span>
                </span>
              </label>              
            </div>
          </div>
          <div class="modal__additives">
            <div class="modal__additives-title medium">Additives</div>
            <div class="modal__additives-tabs additives-tabs">
              <label for="additive-1">
                <input type="checkbox" name="additive1" id="additive-1" value="${goodData.additives[0]["add-price"]}">
                <span class="additives-tabs__item">
                  <span class="additives-tabs__item-icon lnk">1</span>
                  <span class="additives-tabs__item-text lnk">${goodData.additives[0].name}</span>
                </span>
              </label> 
              <label for="additive-2">
                <input type="checkbox" name="additive2" id="additive-2" value="${goodData.additives[1]["add-price"]}">
                <span class="additives-tabs__item">
                  <span class="additives-tabs__item-icon lnk">2</span>
                  <span class="additives-tabs__item-text lnk">${goodData.additives[1].name}</span>
                </span>
              </label> 
              <label for="additive-3">
                <input type="checkbox" name="additive3" id="additive-3" value="${goodData.additives[2]["add-price"]}">
                <span class="additives-tabs__item">
                  <span class="additives-tabs__item-icon lnk">3</span>
                  <span class="additives-tabs__item-text lnk">${goodData.additives[2].name}</span>
                </span>
              </label> 
            </div>
          </div>
          <div class="modal__total">
            <div class="modal__total-text heading-3">Total:</div>
            <div class="modal__total-price heading-3">$${goodData.price}</div>
          </div>
          <div class="modal__alert">
            <div class="modal__alert-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <g clip-path="url(#clip0_268_12877)">
                <path d="M8 7.66663V11" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 5.00667L8.00667 4.99926" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8.00004C14.6663 4.31814 11.6816 1.33337 7.99967 1.33337C4.31778 1.33337 1.33301 4.31814 1.33301 8.00004C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z" stroke="#403F3D" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_268_12877">
                <rect width="16" height="16" fill="white"/>
                </clipPath>
                </defs>
                </svg>
            </div>
            <div class="modal__alert-text caption">
              The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.
            </div>
          </div>
          <button class="modal__close btn lnk">Close</button>
        </form>
      </div>
    </div>`;
    };

    //калькулятор
    const modalCheck = (goodData) => {     
        const { elements } = document.forms.check      
        const data = Array.from(elements)
          .map((element) => {
            const value = 
            (element.type === 'checkbox' || 'radio') && (element.checked) 
                ? element.value : 0 ;      
            return value 
          })      
        let price = goodData.price;
        let adds =  data.reduce((acc,el)=>acc + +el,0);
          console.log(price);
        modal.querySelector('.modal__total-price').textContent = 
        `$${(Number(price) + adds).toFixed(2)}`;
    }

    const goodModal = (title, imgSrc, imgAlt) => {
        loadJSON().then((products) => {
            const goodData = products.filter(
                (product) => product.name === title
            );
            modalOpen(goodData[0], imgSrc, imgAlt);
        });
    };

    goodsCart.forEach((cart) => {
        let img = cart.querySelector("img");
        let title = cart.querySelector("h3");
        cart.addEventListener("click", () =>
            goodModal(title.textContent, img.src, img.alt)
        );
    });
}