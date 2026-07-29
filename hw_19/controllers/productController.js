const Product = require('../models/productModel');
const asyncHandler = require('../utils/asyncHandler');

let cacheData = null;
let cacheTime = null;
const cacheDuration = 30 * 1000;

const getProducts = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;

    if (page || limit) {
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 5;
        const skip = (pageNum - 1) * limitNum;

        const totalDocs = await Product.countDocuments();
        const totalPages = Math.ceil(totalDocs / limitNum);
        const products = await Product.find().skip(skip).limit(limitNum);

        return res.json({
            totalDocs,
            totalPages,
            currentPage: pageNum,
            products
        });
    }

    const now = Date.now();
    if (cacheData && cacheTime && (now - cacheTime < cacheDuration)) {
        console.log('Fetched from Cache');
        return res.json(cacheData);
    }

    const products = await Product.find();
    cacheData = products;
    cacheTime = now;
    console.log('Fetched from Database');
    res.json(products);
});

const createProduct = asyncHandler(async (req, res) => {
    const { name, price, category, stock } = req.body;
    const newProduct = new Product({ name, price, category, stock });
    await newProduct.save();
    cacheData = null;
    cacheTime = null;
    res.status(201).json(newProduct);
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }
    res.json(product);
});

const updateProduct = asyncHandler(async (req, res) => {
    const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!updatedProduct) {
        res.status(404);
        throw new Error('Product not found');
    }
    cacheData = null;
    cacheTime = null;
    res.json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
        res.status(404);
        throw new Error('Product not found');
    }
    cacheData = null;
    cacheTime = null;
    res.json({ message: "Product deleted successfully" });
});

module.exports = { getProducts, createProduct, getProductById, updateProduct, deleteProduct };