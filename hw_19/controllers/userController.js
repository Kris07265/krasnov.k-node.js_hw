const User = require('../models/userModel');
const asyncHandler = require('../utils/asyncHandler');

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

const createUser = asyncHandler(async (req, res) => {
    const { name, email, age } = req.body;
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
});

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        res.status(404);
        throw new Error('User not found');
    }
    res.json(user);
});

const updateUser = asyncHandler(async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!updatedUser) {
        res.status(404);
        throw new Error('User not found');
    }
    res.json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
        res.status(404);
        throw new Error('User not found');
    }
    res.json({ message: "User deleted" });
});

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };
