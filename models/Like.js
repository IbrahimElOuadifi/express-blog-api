import mongoose from 'mongoose';

const likeSchema = mongoose.Schema({
    fromUser: String,
    toPost: String,
    createAt: {
        type: Date,
        default: new Date()
    }
});

const Like = mongoose.model('Like', likeSchema);

export default Like;