export enum ItemStatus {
    Available = "доступно",
    Issued = "видано",
    Lost = "втрачено",
}

export interface LibraryItemData {
    id: number;
    title: string;
    year: number;
    status: ItemStatus;
    internalNote: string;
}

export type PublicItem = Omit<LibraryItemData, "internalNote">;

export type ItemPreview = Pick<LibraryItemData, "id" | "title">;

export type ItemUpdate = Partial<Omit<LibraryItemData, "id">>;

const samplePublicItem: PublicItem = {
    id: 1,
    title: "title",
    year: 1840,
    status: ItemStatus.Available,
};

const samplePreview: ItemPreview = {
    id: 2,
    title: "title",
};

const sampleUpdate: ItemUpdate = {
    status: ItemStatus.Issued,
};

export abstract class LibraryItem {
    #status: ItemStatus = ItemStatus.Available;

    constructor(
        protected title: string,
        protected year: number
    ) {}

    public get status(): ItemStatus {
        return this.#status;
    }

    public borrow(): void {
        if (this.#status === ItemStatus.Issued) {
            console.log(`Предмет "${this.title}" вже видано!`);
            return;
        }
        this.#status = ItemStatus.Issued;
    }

    public abstract describe(): string;
}

export interface Searchable {
    matches(query: string): boolean;
}

export class Book extends LibraryItem implements Searchable {
    constructor(
        title: string,
        year: number,
        public author: string
    ) {
        super(title, year);
    }

    public describe(): string {
        return `Книга: ${this.title} (${this.year}), автор ${this.author}`;
    }

    public matches(query: string): boolean {
        const cleanQuery = query.toLowerCase();
        return (
            this.title.toLowerCase().includes(cleanQuery) ||
            this.author.toLowerCase().includes(cleanQuery)
        );
    }
}

export class Magazine extends LibraryItem {
    constructor(
        title: string,
        year: number,
        public issueNumber: number
    ) {
        super(title, year);
    }

    public describe(): string {
        return `Журнал: ${this.title}, випуск №${this.issueNumber}`;
    }
}

// const directItem = new LibraryItem("Тест", 2024);
// Error text: Cannot create an instance of an abstract class.

const libraryCatalog: LibraryItem[] = [
    new Book("1984", 1949, "Джордж Орвелл"),
    new Book("Маленький принц", 1943, "Антуан де Сент-Екзюпері"),
    new Magazine("Forbes", 2026, 12),
];

for (const item of libraryCatalog) {
    console.log(item.describe());
}