const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // Node.js built-in module for generating random tokens


const userSchema = new Schema(
    {
        username: {
            type: String,
            // required: true,
            unique: true,
            trim: true,
            minlength: 3
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        isEmailVerified: {
            type: Boolean,
            default: false
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8
        },
        profile: {
            profilePicture: {
                type: String,
                trim: true,
                default: 'https://res.cloudinary.com/dl4v8tj7k/image/upload/v1620832915/default-profile-picture.jpg'
            },
            location: {
                type: String,
                trim: true
            },
            birthday: {
                type: Date
            },
            education: {
                type: String,
                trim: true
            },
            work: {
                type: String,
                trim: true
            },
            skills: {
                type: [String],
                trim: true
            },
            interests: {
                type: [String],
                trim: true
            },
        },
        metaDate: {
            createdAt: {
                type: Date,
                default: Date.now,
            },
            updatedAt: {
                type: Date,
                default: Date.now
            },
            lastLogin: {
                type: Date,
                default: Date.now
            },
            lastActive: {
                type: Date,
                default: Date.now
            }
        },
        verificationToken: {
            type: String
        }

    },
);

// Hash the password before saving the user model
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// Update the updated date before saving the user model
userSchema.pre('save', function (next) {
    const user = this;
    user.metaDate.updatedAt = Date.now();
    next();
});

// Create a unique username based on user's name before creating the user model
userSchema.pre('save', async function (next) {
    const user = this;
    const username = user.name.replace(/\s+/g, '-').toLowerCase();
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        const random = Math.floor(Math.random() * 10000);
        user.username = `${username}-${random}`;
    } else {
        user.username = username;
    }
    next();
});

// Generate an auth token for the user
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' });
    return token;
};

// Generate a verification token for the user
userSchema.methods.generateVerificationToken = async function () {
    const user = this;
    const token = crypto.randomBytes(24).toString('hex');
    user.verificationToken = token;
    await user.save();
    return token;
};

// Find user by credentials
userSchema.statics.findByCredentials = async (email, password) => {
    const User = this;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid login credentials');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid login credentials');
        }

        return user;
    }
    catch (error) {
        throw new Error(error.message);
    }
}

const User = mongoose.model('User', userSchema);

module.exports = User;