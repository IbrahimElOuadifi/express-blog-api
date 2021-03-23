import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    text: String,
    creator: String,
    img: String,
    createAt: {
        type: Date,
        default: new Date()
    }
});

const Post = mongoose.model('Post', postSchema);

export default Post;