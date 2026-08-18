export interface User {
    readonly id: number;
    readonly createdAt: Date;
    email: string;
    phone?: string;
    role: "admin" | "user" | "guest";
    preferences?: {
        emailEnabled?: boolean;
        smsEnabled?: boolean;
    };
}

export const adminUser: User = {
    id: 1,
    createdAt: new Date(),
    email: "admin@example.com",
    phone: "+380992165423",
    role: "admin",
    preferences: {
        emailEnabled: true,
        smsEnabled: true,
    },
};

export const guestUser: User = {
    id: 2,
    createdAt: new Date(),
    email: "guest@example.com",
    role: "guest",
};


// adminUser.id = 12;
// Cannot assign to 'id' because it is a read-only property.

// adminUser.role = "superadmin";
// Type '"superadmin"' is not assignable to type '"admin" | "user" | "guest"'.

// const invalidUser: User = { id: 3, createdAt: new Date() };
// Type '{ id: number; createdAt: Date; }' is missing the following properties from type 'User': email, role


export interface Admin extends User {
    readonly permissions: readonly string[];
    role: "admin";
}

type WithStringId = { id: string; label: string };
type WithNumberId = { id: number; count: number };
type Broken = WithStringId & WithNumberId;

// const brokenItem: Broken = {
//   id: 123,
//   label: "test",
//   count: 5,
// };
// Type 'number' is not assignable to type 'never'

export type SafeMerge<T, U> = Omit<T, keyof U> & U;

type Fixed = SafeMerge<WithStringId, WithNumberId>;

export const fixedItem: Fixed = {
    id: 42,
    label: "Safe Item",
    count: 10,
};

declare const __brand: unique symbol;

export type Brand<K, T> = K & { readonly [__brand]: T };

export type UserId = Brand<number, "UserId">;
export type OrderId = Brand<number, "OrderId">;

export function getUser(id: UserId): void {
    console.log(`Getting user with ID: ${id}`);
}

const rawUserId = 1 as unknown as UserId;
const orderId = 42 as unknown as OrderId;

getUser(rawUserId);

// getUser(orderId);
    // Argument of type 'OrderId' is not assignable to parameter of type 'UserId'.
    // Type 'OrderId' is not assignable to type '{ readonly [__brand]: "UserId"; }'.
    // Types of property '[__brand]' are incompatible.
    // Type '"OrderId"' is not assignable to type '"UserId"'.

const nextUserId = ((rawUserId as number) + 1) as UserId;