const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    try {
        const { items } = req.body;

        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: 'The products array is required.' });
        }

        let total = 0;
        const orderItems = [];

        for (const item of items) {
            const product = await Product.findById(item.productId);

            if (!product) {
                return res.status(404).json({ message: `Product with ID ${item.productId} not found` });
            }

            const updatedProduct = await Product.findOneAndUpdate(
                { _id: product._id, stock: { $gte: item.quantity } },
                { $inc: { stock: -item.quantity } },
                { new: true }
            );

            if (!updatedProduct) {
                return res.status(400).json({
                    message: `Insufficient stock: ${product.title}. Available: ${product.stock}`,
                });
            }

            const itemTotal = product.price * item.quantity;
            total += itemTotal;

            orderItems.push({
                product: product._id,
                quantity: item.quantity,
                priceAtPurchase: product.price,
            });
        }

        const order = await Order.create({
            user: req.user.id,
            items: orderItems,
            total,
        });

        return res.status(201).json(order);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const query = req.user.role === 'admin' ? {} : { user: req.user.id };
        const orders = await Order.find(query).populate('items.product', 'title price').sort({ createdAt: -1 });

        return res.json(orders);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('items.product', 'title price');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (req.user.role !== 'admin' && order.user.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access to another person order is prohibited.' });
        }

        return res.json(order);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['pending', 'paid', 'shipped', 'cancelled'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        return res.json(order);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};