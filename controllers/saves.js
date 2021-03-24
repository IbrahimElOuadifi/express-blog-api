import Save from '../models/Save.js';

export const get = async (req, res) => {

    const query = req.query;

    try {
        const data = await Save.find(query);
        res.status(200).json(data);
    }catch(err) {
        res.status(404).json({ message: err.message });
    }
}

export const toggle = async (req, res) => {
    
    const newSave = new Save(req.body);
    const query = req.body;

    try {
        const data = await Save.find(req.body);
        if(data.length === 0) {
            await newSave.save();
            res.status(201).json({ data });
        }else {
            const data = await Save.findOneAndDelete(query);
            res.status(201).json(data);
        }
    }catch(err) {
        res.status(409).json({ message: err.message });
    }
}


export const remove = async (req, res) => {

    const query = req.query;

    try {
        const data = await Save.deleteMany(query);
        res.status(201).json(data);
    }catch(err) {
        res.status(409).json({ Error: err.message });
    }
}