// backend/controllers/authController.ts
import { Request, Response } from 'express';
import User, { IUser } from '../models/User'; // Import IUser
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '1h',
    });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    const user = await User.create({
        name,
        email,
        password,
        role,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
export const authUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id.toString()),
        });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
export const getUserProfile = async (req: Request, res: Response) => {
    // TypeScript now knows req.user is of type IUser | undefined
    // So, we can safely access req.user._id if req.user exists
    if (!req.user) {
        // This case should ideally be caught by the 'protect' middleware,
        // but it's good practice for type safety.
        res.status(404).json({ message: 'User not found in request' });
        return;
    }

    // Now req.user._id is correctly typed as string or mongoose.Types.ObjectId
    const user = await User.findById(req.user._id).select('-password');

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        });
    } else {
        res.status(404).json({ message: 'User not found in database' });
    }
};