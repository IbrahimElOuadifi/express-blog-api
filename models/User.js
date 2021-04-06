import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    //id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String },
    urlPic: String,
    createAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

export default User;