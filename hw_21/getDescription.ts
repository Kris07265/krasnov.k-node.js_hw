interface Product {
    name: string;
    price: number;
    inStock: boolean;
}

function getDescription(product: Product) : string {
    const inStockText = product.inStock ? "Так" : "Ні";

    return `Товар: ${product.name}, Ціна: ${product.price} грн., В наявності: ${inStockText}`;
}