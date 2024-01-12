document.addEventListener("DOMContentLoaded", function () {
    const question = [
        [
            "Маршрутка",
            "Как называют автобус, совершающий поездки по определенному маршруту?",
        ],
        ["Лассо", "Как называется веревка с петлей на конце?"],
        ["Старт", "Начальный этам спортивного состязания?"],
        ["Штатив", "Подставка для микроскопа, фотоаппарата"],
        ["Геракл", "В греческой мифологии: герой, совершивший 12 подвигов?"],
        ["Косяк", "Как называется стая рыб?"],
        ["Финал", "Завершающий этап спортивного состязания"],
        ["Сахара", "Крупнейшая жаркая пустыня?"],
        ["Кирпич", 'Из чего сделан самый крепкий дом в "Трех поросятах"?'],
        ["Чехия", "В какой стране находится Прага?"],
    ];

    const keyCode = [
        ["KeyA", "Ф"],
        ["KeyB", "И"],
        ["KeyC", "С"],
        ["KeyD", "В"],
        ["KeyE", "У"],
        ["KeyF", "А"],
        ["KeyG", "П"],
        ["KeyH", "Р"],
        ["KeyI", "Ш"],
        ["KeyJ", "О"],
        ["KeyK", "Л"],
        ["KeyL", "Д"],
        ["KeyM", "Ь"],
        ["KeyN", "Т"],
        ["KeyO", "Щ"],
        ["KeyP", "З"],
        ["KeyQ", "Й"],
        ["KeyR", "К"],
        ["KeyS", "Ы"],
        ["KeyT", "Е"],
        ["KeyU", "Г"],
        ["KeyV", "М"],
        ["KeyW", "Ц"],
        ["KeyX", "Ч"],
        ["KeyY", "Н"],
        ["KeyZ", "Я"],
        ["Semicolon", "Ж"],
        ["Comma", "Б"],
        ["Period", "Ю"],
        ["BracketLeft", "Х"],
        ["BracketRight", "Ъ"],
        ["Quote", "Э"],
        ["Backquote", "Ё"],
    ];

    const alphabet = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

    const mainTemp = `
        <div class="main__container">
        <div class="main__content">
            <div class="main__column main__column_left">
            <div class="main__img-wrapp hangman">
                <div class="hangman__wrapp">
                <img src="img/hangman-img0.png" alt="hangman" class="hangman__part">
                <img src="img/hangman-img1.png" alt="head" class="hangman__part hangman__part_hide">
                <img src="img/hangman-img2.png" alt="body" class="hangman__part hangman__part_hide">
                <img src="img/hangman-img3.png" alt="left-hand" class="hangman__part hangman__part_hide">
                <img src="img/hangman-img4.png" alt="right-hand" class="hangman__part hangman__part_hide">
                <img src="img/hangman-img5.png" alt="left-leg" class="hangman__part hangman__part_hide">
                <img src="img/hangman-img6.png" alt="right-leg" class="hangman__part hangman__part_hide"></img>
                </div>
            </div>
            <h1 class="main__title">Игра Виселица</h1>
            </div>
            <div class="main__column main__column_right">
            <div class="main__secret-word secret">                
            </div>
            <div class="main__hint"></div>
            <div class="main__lives">Осталось попыток: <span class="main__lives-span">0 / 6</span></div>
            <div class="main__keyboard keyboard"></div>
            </div>
        </div>
        </div>
    `;

    const generateKeys = () => {
        let out = "";
        for (let i = 0; i < alphabet.length; i += 1) {
            out += `<button class="keyboard__key" data-status=true data-letter="${alphabet[i]}">${alphabet[i]}</button>\n`;
        }
        return out;
    };

    const generateSecret = () =>
        question[Math.floor(Math.random() * question.length)];

    const modalConstruct = (word, lose = false) => {
        const text = lose
            ? "Поздравляем,<br> Вы угадали загаданное слово"
            : "Сожалеем,<br> Вы не угадали загаданное слово";
        return `
              <div class="modal__body">
              <div class="modal__content">
                  <h3 class="modal__title">${text}</h3>
                  <h2 class="modal__secret-word">${word}</h2>
                  <button class="modal__btn modal__btn_new-game">Играть еще</button>
              </div>
              </div>        
          `;
    };

    const modalClose = () => {
        modal.classList.remove("modal_open");
        modal.innerHTML = "";
        document.querySelector("body").classList.remove("lock");
    };

    const page = document.querySelector(".page");
    const main = document.createElement("main");
    main.classList.add("main");
    main.innerHTML = mainTemp;
    page.append(main);
    const modal = document.createElement("div");
    modal.classList.add("modal");
    page.append(modal);

    const hangmanImgs = main.querySelector(".hangman__wrapp").children;
    const secretDiv = main.querySelector(".secret");
    const hintDiv = main.querySelector(".main__hint");
    const livesSpan = main.querySelector(".main__lives-span");
    const keyboard = main.querySelector(".keyboard");
    let lives = 0;
    var word = "";
    let hint = "";
    let closeLetters = 0;

    const startGame = () => {
        [word, hint] = generateSecret();
        closeLetters = word.length;
        [...hangmanImgs].forEach((el, index) =>
            index !== 0 ? el.classList.add("hangman__part_hide") : false
        );

        let html = "";
        for (let i = 0; i < word.length; i += 1) {
            html += `<div class="secret__letter secret__letter_hide">
              ${word[i].toUpperCase()}
              </div>`;
        }
        secretDiv.innerHTML = html;
        hintDiv.innerText = hint;
        livesSpan.innerText = `0 / 6`;
        keyboard.innerHTML = generateKeys();
        lives = 0;

        console.log(`Мы загадали слово => ${word}`);
    };

    const modalOpen = (word, lose = false) => {
        modal.innerHTML = modalConstruct(word, lose);
        modal.classList.add("modal_open");
        document.querySelector("body").classList.add("lock");
        modal
            .querySelector(".modal__btn_new-game")
            .addEventListener("click", () => {
                modalClose();
                startGame();
            });
    };

    const keyChange = (letter, status = false) => {
        const btn = [...keyboard.children].find(
            (el) => el.dataset.letter === letter
        );
        if (status) btn.classList.add("keyboard__key_on");
        else btn.classList.add("keyboard__key_off");
    };

    const getStatusKey = (letter) => {
        return [...keyboard.children].find((el) => el.dataset.letter === letter)
            .dataset.status;
    };

    const setStatusKey = (letter, status = false) => {
        return ([...keyboard.children].find(
            (el) => el.dataset.letter === letter
        ).dataset.status = "false");
    };

    const gameProcess = (letter) => {
        if (!word.toUpperCase().includes(letter)) {
            lives += 1;
            livesSpan.innerText = `${lives} / 6`;
            hangmanImgs[lives].classList.remove("hangman__part_hide");
            keyChange(letter);
            if (lives === 6) modalOpen(word);
        } else {
            word.toUpperCase()
                .split("")
                .forEach((el, ind) => {
                    if (el === letter) {
                        secretDiv.childNodes[ind].classList.remove(
                            "secret__letter_hide"
                        );
                        closeLetters -= 1;
                    }
                });
            keyChange(letter, true);
            if (closeLetters === 0) modalOpen(word, true);
        }
    };

    const letterChangeMouse = (e) => {
        if (e.target.tagName !== "BUTTON") return false;
        const keyLetter = e.target.innerText;
        const keyStatus = e.target.dataset.status;
        if (keyStatus === "true") {
            e.target.dataset.status = "false";
            gameProcess(keyLetter);
        } else {
            return false;
        }
    };

    startGame();
    keyboard.addEventListener("click", (e) => letterChangeMouse(e));

    document.addEventListener("keypress", (event) => {
        if (!keyCode.flat(Infinity).includes(event.code)) return false;
        let letter = keyCode.find((el) => el[0] === event.code)[1];

        if (getStatusKey(letter) === "true") {
            setStatusKey(letter);
            gameProcess(letter);
        } else {
            return false;
        }
    });
});
