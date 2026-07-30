Homework 19 "Агрегації, індекси та обробка помилок у Node.js + MongoDB"

Як запустити проєкт 

Встановити залежності: `npm install`

Створити файл `.env`, в якому повинні бути такі змінні: `PORT`, `MONGO_URI`.

Запустити сервер: `node server.js`

Обробка помилок

1. Неправильний ID
   GET `/api/products/123abc`
   Статус: `400 Bad Request`
   Відповідь: `{"message": "Invalid ID format: 123abc"}`

2. Невідома категорія
   POST `/api/products`
   Тіло: `{"name": "Toy Car", "price": 100, "category": "toys", "stock": 5}`
   Статус: `400 Bad Request`
   Відповідь: `{"message": "Validation Error", "invalidFields": ["category"]}`

3. Не заповнені обов'язкові поля
   POST `/api/products`
   Тіло: `{"name": "Bad Product"}`
   Статус: `400 Bad Request`
   Відповідь: `{"message": "Validation Error", "invalidFields": ["price", "category", "stock"]}`

4. Неіснуючий маршрут (404)
   GET `/api/nonexistent`
   Статус: `404 Not Found`
   Відповідь: `{"message": "Not Found - /api/nonexistent"}`

Кешування

Якщо додати новий товар, але кеш ще не закінчився, то звичайний `GET` поверне старий список без нового товару.

Це можна виправити так: Під час додавання, зміни або видалення товару можна примусово скидувати кеш (`cacheData = null`).


Пагінація

Можна розбивати список товарів на сторінки за допомогою параметрів `page` та `limit`.

Приклад: `GET /api/products?page=1&limit=5`

Відповідь: повертає кількість усіх товарів (`totalDocs`), всього сторінок (`totalPages`), поточну сторінку (`currentPage`) та масив товарів (`products`).