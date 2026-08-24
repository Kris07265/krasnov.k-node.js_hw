function getLast<T>(arr: T[]): T | undefined {
    return arr[arr.length - 1];
}

const n = getLast([1, 2, 3]);    // number | undefined
const s = getLast(["a", "b"]);   // string | undefined
const e = getLast([]);           // undefined


function wrapInArray<T>(value: T): T[] {
    return [value];
}

const a = wrapInArray(5);         // number[]
const b = wrapInArray("hello");   // string[]


// function swapSingle<T>(first: T, second: T): [T, T] {
//     return [second, first];
// }
// swapSingle("Аліна", 26);
// Error Text:
// Argument of type 'number' is not assignable to parameter of type 'string'.

function swap<T, U>(first: T, second: U): [U, T] {
    return [second, first];
}

const r = swap("Аліна", 26);   // [number, string]


function filterAndTransform<T, U>(
    arr: T[],
    predicate: (item: T) => boolean,
    transform: (item: T) => U
): U[] {
    return arr.filter(predicate).map(transform);
}

const result = filterAndTransform(
    [1, 2, 3, 4],
    n => n % 2 === 0,
    n => `Число: ${n}`
); // string[]



function printId<T extends { id: number }>(obj: T): T {
    console.log(obj.id);
    return obj;
}

const user = printId({ id: 1, email: "a@test.com" });
console.log(user.email);

// printId({ name: "Alice" });
// Error Text: Object literal may only specify known properties, and 'name' does not exist in type '{ id: number; }'.

// printId({ id: "abc" });
// Error Text: Type 'string' is not assignable to type 'number'.