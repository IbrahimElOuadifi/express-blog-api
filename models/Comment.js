import mongoose from 'mongoose';

const commentSchema = mongoose.Schema({
    fromUser: String,
    toPost: String,
    text: String,
    createAt: {
        type: Date,
        default: new Date()
    }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;