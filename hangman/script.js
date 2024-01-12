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
});
