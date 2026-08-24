Homework 29 "Дженерики в типах, класах"

Завдання 1 : Дженерик в інтерфейсі
Опишіть інтерфейс Result<T>, який описує результат операції:

success булеве
data значення типу T
timestamp дата
Створіть дві змінні: одну типу Result<string>, другу типу Result<number[]>.

Завдання 2 : Відповідь API
Опишіть ApiResponse<T>:

status тільки "success" або "error" (літеральний union, не просто рядок)
data значення типу T
Далі:

Опишіть інтерфейси User (id, email) і Post (id, title).
Створіть змінну типу ApiResponse<User> і змінну типу ApiResponse<Post[]>.
Наведіть курсор на .data в обох випадках і переконайтесь, що там нормальний тип, а не any.
Завдання 3 : Дженерик у класі
Напишіть клас Queue<T> черга, яка працює за принципом «перший зайшов, перший вийшов» (на відміну від стека, де навпаки).

Методи:

enqueue(item: T): void додати в кінець
dequeue(): T | undefined забрати з початку
size(): number скільки елементів
Copy code
const q = new Queue<string>();
q.enqueue("a");
q.enqueue("b");
q.dequeue();   // "a"
q.size();      // 1

// q.enqueue(42);   // має бути помилка
Завдання 4 : Обгортка, що зберігає тип
Напишіть withLogging, яка приймає назву операції та асинхронну функцію, логує початок і кінець, і повертає результат.

Copy code
async function fetchUser(): Promise<User> { /* ... */ }
async function fetchPosts(): Promise<Post[]> { /* ... */ }

const user = await withLogging("fetchUser", () => fetchUser());
// user має бути типу User

const posts = await withLogging("fetchPosts", () => fetchPosts());
// posts має бути типу Post[]
Усередині: залогуйте Початок: {назва}, викличте функцію, залогуйте Готово: {назва}, поверніть результат.

Дві деталі, на які варто звернути увагу:

Другим аргументом приймається функція, а не її результат.
Не забудьте await перед викликом
Заглушки для
fetchUser
і
fetchPosts
напишіть самі ,хай просто повертають готовий об'єкт.
Завдання 5 : Знайдіть зайве
Дано дві функції. В обох дженерик використано неправильно. Виправте їх

Copy code
// А
function logValue<T>(value: T): void {
console.log(value);
}

// Б
function parseJson<T>(json: string): T {
return JSON.parse(json);
}

const user = parseJson<User>('{"id": 1}');
Підказка до Б: подивіться уважно, що саме перевіряє ця функція.