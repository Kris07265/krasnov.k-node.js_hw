Homework 26 "API інтернет-магазину з автентифікацією"

Що ви будуєте
Бекенд для інтернет-магазину. Гості можуть переглядати каталог товарів. Зареєстровані користувачі можуть створювати замовлення й бачити тільки свої замовлення. Адміністратор може керувати товарами й бачити всі замовлення.

Завдання 1. Модель користувача і реєстрація
Створіть модель User:

Поле                Тип         Вимоги

email        String      обов'язкове, унікальне, зберігати в нижньому регістрі

password     String      обов'язкове, мінімум 8 символів (перевірка до хешування)

name         String      обов'язкове

role         String

Реалізуйте POST /api/auth/register:

перевірте, що email і пароль передані й email має валідний формат;
перевірте, що користувач з таким email ще не існує → 409 Conflict;
захешуйте пароль через bcrypt (salt rounds = 10);
збережіть користувача;
поверніть 201 і об'єкт користувача без поля password.
Увага:
роль
admin
не можна отримати через реєстрацію. Навіть якщо клієнт надішле
"role": "admin"
у тілі запиту, сервер має це проігнорувати. Адміна створюємо вручну (див. завдання 5).
Завдання 2. Логін і видача токена
Реалізуйте POST /api/auth/login:

знайдіть користувача за email;
порівняйте пароль через bcrypt.compare;
якщо email не знайдено або пароль не збігся — поверніть однакову відповідь 401 з повідомленням Invalid credentials;
при успіху згенеруйте access-токен з payload { id, role } і терміном життя з .env;
поверніть { accessToken, user }.
Завдання 3. Middleware перевірки токена
Створіть middlewares/authMiddleware.js:

дістає токен із заголовка Authorization: Bearer <token>;
якщо заголовка немає або формат неправильний → 401;
верифікує токен через jwt.verify;
окремо обробляє TokenExpiredError (повідомлення про закінчення терміну дії) та JsonWebTokenError (невалідний підпис);
при успіху кладе розпакований payload у req.user і викликає next().
Перевірте роботу на маршруті GET /api/auth/me — повертає дані поточного користувача з бази (не з токена!).

Завдання 4. Каталог товарів
Модель Product: title, description, price (Number, min 0), stock (Number, min 0, default 0), category, createdAt.

Маршрути:

Метод       Шлях                         Доступ

GET            /api/products     публічний

GET            /api/products/:id публічний

POST.         /api/products      тільки admin

PUT            /api/products/:id  тільки admin

DELETE       /api/products/:id  тільки admin

У GET /api/products додайте пагінацію: ?page=1&limit=10, а також фільтр ?category=.

Завдання 5. Ролі та авторизація
Створіть middlewares/roleMiddleware.js - функцію, яка приймає список дозволених ролей і повертає middleware:

js

Copy code
router.post('/', authMiddleware, roleMiddleware('admin'), createProduct);
Створіть скрипт scripts/createAdmin.js, який створює адміністратора з .env-змінних або з аргументів командного рядка:

bash

Copy code
node scripts/createAdmin.js admin@shop.com StrongPass123
Завдання 6. Замовлення
Модель Order:

user — ObjectId, ref на User;
items — масив { product: ObjectId(ref Product), quantity: Number, priceAtPurchase: Number };
total — Number;
status — enum ['pending', 'paid', 'shipped', 'cancelled'], default pending;
createdAt.
Маршрути (усі потребують токен):

Метод    Шлях                                      Що робить

POST       /api/orders               створює замовлення з масиву { productId, quantity }

GET         /api/orderscustomer           бачить тільки свої, admin - усі

GET          /api/orders/:idcustomer   тільки своє, чуже → 403

PATCH      /api/orders/:id/status    тільки admin

При створенні замовлення:

ціну беріть з бази, а не з тіла запиту (клієнту не можна довіряти ціну);
перевірте наявність stock, при нестачі → 400 із назвою товару;
порахуйте total на сервері;
зменште stock товарів.
Ключова перевірка цього завдання: користувач A не може прочитати замовлення користувача B, навіть знаючи його
id
. Перевірте це вручну двома різними токенами.
refresh-токени
Access-токен живе 15 хвилин. Це незручно, якщо після кожних 15 хвилин треба знову вводити пароль. Додайте пару access + refresh.

При логіні генеруйте два токени різними секретами й з різним TTL.
Refresh-токен зберігайте в базі (окрема колекція RefreshToken з полями token, user, expiresAt) — щоб його можна було відкликати.
Віддавайте refresh-токен у httpOnly cookie, а не в тілі відповіді.
POST /api/auth/refresh — приймає refresh-токен, перевіряє підпис і наявність у базі, видає нову пару, старий refresh видаляє з бази (ротація).
POST /api/auth/logout — видаляє refresh-токен із бази й очищає cookie.
Перевірте, що після logout старий refresh-токен більше не працює, хоча його підпис усе ще валідний.