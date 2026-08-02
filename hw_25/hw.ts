interface Author {
    name: string;
    country: string;
}

interface Book {
    readonly id: number;
    title: string;
    author: Author;
    year: number;
    pages: number;
    genre?: string;
    rating?: number;
}

const book1: Book = {
    id: 1,
    title: "1984",
    author: {name: "George Orwell", country: "United Kingdom"},
    year: 1949,
    pages: 328,
    genre: "Dystopian",
    rating: 4.8,
};

const book2: Book = {
    id: 2,
    title: "To Kill a Mockingbird",
    author: {name: "Harper Lee", country: "United Kingdom"},
    year: 1960,
    pages: 281,
};

function printBook(book: Book): void {
    console.log(`"${book.title}" — ${book.author.name}`);

    if (book.genre) {
        console.log(`Genre: ${book.genre}`);
    }

    if (book.rating !== undefined) {
        console.log(`Rating: ${book.rating}`);
    }
}

printBook(book1);
printBook(book2);

const book3: Book = {
    id: 3,
    title: "The Hobbit",
    author: {name: "George Orwell", country: "United Kingdom"},
    year: 1937,
    pages: 310,
};

// book3.id = 99;

const library: Book[] = [
    {
        id: 1,
        title: "1984",
        author: { name: "George Orwell", country: "United Kingdom" },
        year: 1949,
        pages: 328,
        genre: "Dystopian",
        rating: 4.8,
    },
    {
        id: 2,
        title: "Harry Potter and the Philosopher's Stone",
        author: { name: "J.K. Rowling", country: "United Kingdom" },
        year: 1997,
        pages: 223,
        genre: "Fantasy",
        rating: 4.9,
    },
    {
        id: 3,
        title: "The Road",
        author: { name: "Cormac McCathy", country: "USA" },
        year: 2006,
        pages: 287,
        genre: "Post-apocalyptic",
        rating: 4.5,
    },
    {
        id: 4,
        title: "Project Hail Mary",
        author: { name: "Andy Weir", country: "USA" },
        year: 2021,
        pages: 496,
        genre: "Sci-Fi",
        rating: 4.9,
    },
];

function getRecentBooks(books: Book[], afterYear: number): string[] {
    return books
        .filter((book) => book.year > afterYear)
        .map((book) => book.title);
}

const recentBooks = getRecentBooks(library, 2000);
console.log(recentBooks);