import Comment from '../models/Comment.js';

export const get = async (req, res) => {

    const query = req.query;

    try {
        const data = await Comment.find(query);
        res.status(200).json(data);
    }catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const create = async (req, res) => {
    
    const data = new Comment(req.body);

    try {
        await data.save();
        res.status(201).json({ data });
    }catch(err) {
        res.status(409).json({ message: err.message });
    }
}

export const update = async (req, res) => {
    
    const data = new Comment()._id('6053cbf1d1b0a01dbc25a147');

    try {
        await data.save();
        res.status(201).json({ data });
    }catch(err) {
        res.status(409).json({ message: err.message });
    }
}

export const remove = async (req, res) => {

    const query = req.query;

    try {
        const data = await Comment.deleteMany(query);
        res.status(201).json(data);
    }catch(err) {
        res.status(409).json(err);
    }
}