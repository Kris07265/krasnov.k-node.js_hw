Homework 24 "TS Перевірка рядка на заборонені слова з виділенням"

Напиши функцію highlightForbiddenWords, яка приймає рядок і масив заборонених слів. Якщо знаходить у рядку заборонене слово, то обгортає його в тег <del>, який буде закреслювати це слово.

Функція повинна повертати оновлений рядок, готовий для демонстрації в HTML. Створи також просту HTML-сторінку для відображення результату.

Вимоги до функції:

Функція повинна приймати два параметри:
text: string — рядок, який потрібно перевірити.
forbiddenWords: string[] — масив заборонених слів.
Функція повинна повернути оновлений рядок, в якому всі знайдені заборонені слова будуть обгорнуті в тег <del>.
Copy code

const text = "This is a test sentence with some bad words.";
const forbiddenWords = ["bad", "test"];
const result = highlightForbiddenWords(text, forbiddenWords);
console.log(result); // "This is a <del>test</del> sentence with some <del>bad</del> words."
Завдання:

Реалізуй функцію highlightForbiddenWords на TypeScript.
Додай HTML-інтерфейс, який дозволяє ввести рядок і заборонені слова.
Реалізуй логіку оновлення DOM-дерева, щоб відобразити змінений рядок із закресленими забороненими словами.