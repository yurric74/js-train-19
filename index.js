// 1. Створення базового об'єкту "Book":
/*
 * Об'єкт: Book
 * Властивості:
 * ----------------------------------
 * | Властивість | Значення         |
 * |-------------|------------------|
 * | title       | "Загальна Книга" |
 * | author      | "Анонім"         |
 * | pages       | 0                |
 *
 * Функції:
 * ------------------------------------------------------------------------
 * | Функція    | Опис                                                    |
 * -----------------------------------------------------------------------
 * | read()     | Виводить повідомлення "Ви читаєте <title> від <author>" |
 */

const Book = {// Створюємо об'єкт Book
    title: "Загальна Книга",
    author: "Анонім",
    pages: 0,
    read ()  
    {console.log ("Ви читаєте ${this.title} від ${this.author}")}}
console.log("Завдання: 1 ==============================");

console.log(Book);// Виводимо в консоль Об'єкт: Book

console.log(Object.getPrototypeOf(Book));// Виводимо в консоль прототип Об'єкту: Book

Book.read();// Викликаємо функцію read об'єкту Book

// 2. Наслідування від базового об'єкту Book

/*
 * Об'єкт: Novel
 * Властивості та функції наслідуються від об'єкта Book
 * Додаємо нову властивість
 *  | Властивість | Значення |
 *  |-------------|----------|
 *  | genre       | "Новела" |
 */

const Novel = Object.create(Book);// Створюємо об'єкт Novel, наслідуємо властивості і функції від об'єкта Book

 Novel.genre = "Новела";// Додаємо властивість genre

console.log("Завдання: 2 ==============================");

console.log(Novel);// Виводимо в консоль Об'єкт: Novel

console.log(Object.getPrototypeOf(Novel));// Виводимо в консоль прототип Об'єкту: Novel

// 3. Створення нового об'єкту та зміна його прототипу

/*
 * Об'єкт: Biography
 * Властивості:
 * --------------------------------------
 * | Властивість | Значення             |
 * |-------------|----------------------|
 * | title       | "Загальна Біографія" |
 * | author      | "Біограф"            |
 * | pages       | 200                  |
 */

const Biography = {// Створюємо об'єкт Biography
    title: "Загальна Біографія" ,
    author: "Біограф" ,
    pages: 200,};
Object.setPrototypeOf(Biography,Novel);// Змінемо прототип об'єкта Biography на Novel

console.log("Завдання: 3 ==============================");
console.log(Biography);// Виводимо в консоль Об'єкт: Biography

console.log(Novel.isPrototypeOf(Biography));// Перевіримо чи являється Novel прототипом Biography та виведемо в консоль

// 4. Інкапсуляція властивості та додання властивості
/*
 * Об'єкт: ScienceBook
 * Властивості та функції наслідуються від об'єкта Book
 * Також тут використовується інкапсуляція для створення властивості 'info', яка не може бути змінена напряму, а лише змінюється за допомогю гетера
 */

const ScienceBook = Object.create(Book);// Створюємо ScienceBook, наслідуємо властивості і функції від об'єкта Book
Object.defineProperty(ScienceBook, "info", {value: "написана в 1915 році",
writable: false, enumerable: true, configurable: false,});
Object.defineProperty(ScienceBook, "setInfo", {set(newInfo) {// Додаємо властивість 'info' за допомогою Object.defineProperty
    console.error("Cannot assign to read-only property 'info' of object '#<Object>'");},})// Зробимо щоб 'info' не можно було видалити або змінити, перевіримо і спробуємо присвоїти ій будь яке значення (це потрібно робити ззовні defineProperty),
// Отримаємо помилку Cannot assign to read only property 'info' of object '#<Object>'

// Далі створюємо сетер який присвоє властивості info значення яке отримує при виклику, помилку більше не отримуємо але при спробі вивести значення info отримуємо undefined

Object.defineProperty(ScienceBook, "getInfo", {get() {// Створимо гетер який буде нам повертати рядок: Про книгу <title>: <info>
    return `Про книгу ${this.title}: ${this.info}`;},})// тепер все виводить коректно

// Заповнюємо об'єкт
// | Властивість | Значення             |
// |-------------|----------------------|
// | title       | "Фізика 101"         |
// | author      | "Альберт Ейнштейн"   |
// | info        | написана в 1915 році |

console.log("Завдання: 4 ==============================");
console.log(ScienceBook.getInfo);// Виводимо в консоль властивість info
ScienceBook.setInfo = "написана в 2023 році";
console.log(ScienceBook.getInfo);// Виводимо в консоль налаштування властивости info

// 5. Поліморфізм: створення нового об'єкта та перевизначення його методу
/*
 * Об'єкт: Textbook
 * Властивості та функції наслідуються від об'єкта ScienceBook
 * Метод read() перевизначено для демонстрації поліморфізму,
 * має виводити "Ви читаєте підручник "<title>" від <author>. <info>"
 */

const Textbook = Object.create(ScienceBook);//Створюємо Textbook та наслідуємо властивості з ScienceBook

Textbook.read = function () {// Перевизначаємо метод read(), відповідно з дописом вище
    console.log(`Ви читаєте підручник "${this.title}" від ${this.author}. ${this.info}`);};
    Textbook.title = "Фізика у Вищій Школі";
    Textbook.author = "Дж. Д. Джонс";
    // Встановлюємо значення для Textbook
// | Властивість | Значення                   |
// |-------------|----------------------------|
// | title       | "Фізика у Вищій Школі"     |
// | author      | "Дж. Д. Джонс"             |

console.log("Завдання: 5 ==============================");
Textbook.read();// Викликаємо функцію read об'єкту Textbook

// 6. Абстракція: створення об'єкта з загальними властивостями
/*
 * Об'єкт: Media
 * Властивості:
 * --------------
 * | Властивість | Значення           |
 * |-------------|--------------------|
 * | format      | "Загальний Формат" |
 * | length      | 0                  |
 *
 * Функції:
 * ---------------------------------------------------------------------------------------------------------------
 * | Функція | Опис                                                                                              |
 * |---------|---------------------------------------------------------------------------------------------------|
 * | play()  | Виводить повідомлення "Зараз відтворюється медіа у форматі <format> з тривалістю <length> секунд" |
 */

const Media = {// Створюємо об'єкт Media
    format: "Загальний Формат",
    length: 0,
    play() {
        console.log(`Зараз відтворюється медіа у форматі ${this.format} з тривалістю ${this.length} секунд`);},};
/*
 * Об'єкт: Song
 * Властивості та функції наслідуються від об'єкта Media
 * Додаткові властивості: artist, title
 */
const Song = Object.create(Media);
// Створюємо об'єкт Song, наслідуємо властивості і функції від об'єкта Media
Song.artist = "Загальний Виконавець";
Song.title = "Загальна Пісня";
// Встановлюємо додаткові властивості
// | Властивість | Значення               |
// |-------------|------------------------|
// | artist      | "Загальний Виконавець" |
// | title       | "Загальна Пісня"       |

console.log("Завдання: 6 ==============================");
Song.play();// Викликаємо функцію play об'єкту Song
