interface Result<T> {
    success: boolean;
    data: T;
    timestamp: Date;
}

const stringResult: Result<string> = {
    success: true,
    data: "String Result",
    timestamp: new Date()
};

const numbersResult: Result<number[]> = {
    success: true,
    data: [10, 20, 30],
    timestamp: new Date()
};




type ApiStatus = "success" | "error";

interface ApiResponse<T> {
    status: ApiStatus;
    data: T;
}

interface User {
    id: number;
    email: string;
}

interface Post {
    id: number;
    title: string;
}

const userResponse: ApiResponse<User> = {
    status: "success",
    data: { id: 1, email: "user@test.com" }
};

const postsResponse: ApiResponse<Post[]> = {
    status: "success",
    data: [
        { id: 101, title: "First Post" },
        { id: 102, title: "Second Post" },
    ]
};




class Queue<T> {
    private items: T[] = [];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    size(): number {
        return this.items.length;
    }
}

const q = new Queue<string>();
q.enqueue("a");
q.enqueue("b");
q.dequeue();
q.size();

// q.enqueue(42);
// Error Text: Argument of type 'number' is not assignable to parameter of type 'string'.




async function fetchUser(): Promise<User> {
    return { id: 1, email: "alex@test.com" };
}

async function fetchPosts(): Promise<Post[]> {
    return [{ id: 10, title: "Posts" }];
}

async function withLogging<T>(actionName: string, fn: () => Promise<T>): Promise<T> {
    console.log(`Початок: ${actionName}`);
    const result = await fn();
    console.log(`Готово: ${actionName}`);
    return result;
}

async function runApp() {
    const user = await withLogging("fetchUser", () => fetchUser());
    const posts = await withLogging("fetchPosts", () => fetchPosts());
}
runApp();




function logValue(value: unknown): void {
    console.log(value);
}

function parseJson(json: string): unknown {
    return JSON.parse(json);
}

const user = parseJson('{"id": 1}');