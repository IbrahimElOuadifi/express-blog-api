import Like from '../models/Like.js';

export const get = async (req, res) => {

    const query = req.query;

    try {
        const data = await Like.find(query);
        res.status(200).json(data);
    }catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const toggle = async (req, res) => {
    
    const newLike = new Like(req.body);
    const query = req.body;

    try {
        const data = await Like.find(req.body);
        if(data.length === 0) {
            await newLike.save();
            res.status(201).json({ data });
        }else {
            const data = await Like.findOneAndDelete(query);
            res.status(201).json(data);
        }
    }catch(err) {
        res.status(409).json({ message: err.message });
    }
}


export const remove = async (req, res) => {

    const query = req.query;

    try {
        const data = await Like.deleteMany(query);
        res.status(201).json(data);
    }catch(err) {
        res.status(409).json({ Error: err.message });
    }
}