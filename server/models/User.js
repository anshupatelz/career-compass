const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
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
            picture: {
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
            created: {
                type: Date,
                default: Date.now
            },
            updated: {
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
    },
);

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '7 days' });
    return token;
};

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