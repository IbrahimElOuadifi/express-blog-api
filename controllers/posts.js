import PostMessage from '../models/Post.js';
import Comment from '../models/Comment.js';
import Like from '../models/Like.js';
import Save from '../models/Save.js';

export const get = async (req, res) => {

    const query = req.query;

    try {
        const data = await PostMessage.find(query);
        res.status(200).json(data);
    }catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const create = async (req, res) => {
    
    const data = new PostMessage(req.body);

    try {
        await data.save();
        res.status(201).json({ data });
    }catch(err) {
        res.status(409).json({ message: err.message });
    }
}

export const update = async (req, res) => {
    
    const { id } = req.params;
    const { body } = req;

    try {
        const data = await PostMessage.findByIdAndUpdate(id, { ...body });
        res.status(201).json({ data });
    }catch(err) {
        res.status(409).json({ message: err.message });
    }
}

export const remove = async (req, res) => {

    const { id } = req.params;

    try {
        const deletedComments = await Comment.deleteMany({ toPost: id });
        const deletedLikes = await Like.deleteMany({ toPost: id });
        const deletedSaves = await Save.deleteMany({ toPost: id });
        const data = await PostMessage.findByIdAndDelete(id);
        res.status(201).json({ data, deletedComments, deletedLikes, deletedSaves });
    }catch(err) {
        res.status(409).json({ Error: err.message });
    }
}