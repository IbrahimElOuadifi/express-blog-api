import mongoose from 'mongoose';

const followSchema = mongoose.Schema({
    follower: String,
    following: String,
    createAt: {
        type: Date,
        default: new Date()
    }
});

const Follow = mongoose.model('Follow', followSchema);

export default Follow;