Завдання 1: Aggregation Pipeline

Порахувати кількість товарів у кожній категорії:

Pipeline:

`{
_id: "$category",
totalProducts: { "$sum": 1 }
}`

Вивід:

`_id
"books"
count
2`


`_id
"electronics"
count
3`


`_id
"clothing"
count
2`


`_id
"food"
count
2`

Порахувати середню ціну товарів по кожній категорії:

Pipeline:

`{
_id: "$category",
averagePrice: {
$avg: "$price"
}
}`

Вивід:

`_id
"clothing"
averagePrice
102.5`


`_id
"electronics"
averagePrice
1700`


`_id
"books"
averagePrice
52.5`


`_id
"food"
averagePrice
10`

Знайти сумарну вартість складу (суму price * stock):

Pipeline:

`{
_id: null,
totalInventoryValue: {
$sum: {
$multiply: ["$price", "$stock"]
}
}
}`

Вивід:

`{
"_id": null,
"totalInventoryValue": 18990
}`

Вивести категорії з середньою ціною > 300:

Pipeline:

`{
averagePrice: {
$gt: 300
}
}`

Вивід:

`{
"_id": "electronics",
"averagePrice": 1700
}`

Порахувати кількість активних та неактивних користувачів:

Pipeline:

`{
_id: "$isActive",
count: {
$sum: 1
}
}`

Вивід:

`{
"_id": false,
"count": 2
}`

`{
"_id": true,
"count": 3
}`


Завдання 2: Індекси та швидкість запитів

У чому різниця між COLLSCAN і IXSCAN?

Різниця в тому, що COLLSCAN це коли MongoDB при пошуку документа продивляється кожний документ, а IXSCAN це коли документ шукається за допомогою індексу.

Звідки взявся індекс у users?

В userModel.js для поля email вказано unique: true. MongoDB створює унікальний індекс на це поле щоб емейл не дублювався.

Виконайте запит з фільтром по category з .explain("executionStats") і збережіть значення totalDocsExamined, totalKeysExamined та stage.

`totalDocsExamined: 9
totalKeysExamined: 0
stage: 'COLLSCAN'`


Створіть індекс на поле category у колекції products.
Повторіть запит з .explain("executionStats"). Наведіть обидва результати поруч і порівняйте.

`totalDocsExamined: 3
totalKeysExamined: 3
stage: 'IXSCAN'`


Спробуйте додати користувача з email, який уже існує в колекції. Наведіть текст помилки і поясніть, чому вона виникла.

`MongoServerError: E11000 duplicate key error collection: shopDB.users index: email_1 dup key: { email: "olena@example.com" }`

Помилка виникає, тому що на полі email стоїть unique: true, це забороняє створювати другий документ з таким же емейлом.


Висновок:

Після створення індексу на поле category тип пошуку змінився з COLLSCAN на IXSCAN. Кількість переглянутих документів змінилася з 9 до 3, тому що без індексу при пошуку продивлялися всі документи в колекції а з індексом продивлялися тільки ті документи, що відповідали індексу.