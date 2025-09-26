const User = require('../models/user');
const { generateToken, generateRefreshToken } = require('../utils/auth');
const Logger = require('../utils/logger');

class AuthService {
    // Register new user
    static async register(userData) {
        try {
            const { name, email, password, role, profile } = userData;

            // Check if user already exists
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists with this email');
            }

            // Create new user
            const user = new User({
                name,
                email,
                password,
                role: role || 'farmer',
                profile
            });

            await user.save();

            // Generate tokens
            const token = generateToken(user._id);
            const refreshToken = generateRefreshToken(user._id);

            Logger.info('User registered successfully', { userId: user._id, email });

            return {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    profile: user.profile
                },
                token,
                refreshToken
            };
        } catch (error) {
            Logger.error('Error in user registration', error);
            throw error;
        }
    }

    // Login user
    static async login(email, password) {
        try {
            // Find user by email
            const user = await User.findOne({ email }).select('+password');
            if (!user) {
                throw new Error('Invalid credentials');
            }

            // Check if account is active
            if (!user.isActive) {
                throw new Error('Account is deactivated');
            }

            // Check password
            const isPasswordValid = await user.comparePassword(password);
            if (!isPasswordValid) {
                throw new Error('Invalid credentials');
            }

            // Generate tokens
            const token = generateToken(user._id);
            const refreshToken = generateRefreshToken(user._id);

            Logger.info('User logged in successfully', { userId: user._id, email });

            return {
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    profile: user.profile
                },
                token,
                refreshToken
            };
        } catch (error) {
            Logger.error('Error in user login', error);
            throw error;
        }
    }

    // Get user profile
    static async getProfile(userId) {
        try {
            const user = await User.findById(userId).select('-password');
            if (!user) {
                throw new Error('User not found');
            }

            return user;
        } catch (error) {
            Logger.error('Error getting user profile', error);
            throw error;
        }
    }

    // Update user profile
    static async updateProfile(userId, updateData) {
        try {
            const user = await User.findByIdAndUpdate(
                userId,
                { $set: updateData },
                { new: true, runValidators: true }
            ).select('-password');

            if (!user) {
                throw new Error('User not found');
            }

            Logger.info('User profile updated', { userId });

            return user;
        } catch (error) {
            Logger.error('Error updating user profile', error);
            throw error;
        }
    }
}

module.exports = AuthService;