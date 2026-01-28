import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    mobileNumber: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    name: {
        type: String,
        default: 'Customer',
    },
    address: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const User = mongoose.model('User', userSchema);
export default User;
