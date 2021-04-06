import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import User from '../models/User.js';
import Post from '../models/Post.js';
import Comment from '../models/Comment.js';
import Like from '../models/Like.js';
import Save from '../models/Save.js';

export const get = async (req, res) => {
    
    const { id } = req.params;

    try {
        const userInfo = await User.findById(id);
        res.status(200).json({ userInfo });
    } catch (err) {
        res.status(500).json({ message: err.message, code: 'err' });
    }
}

export const remove = async (req, res) => {
    
    const { id } = req.params;

    try {
        const posts = await Post.find({ creator: id });
        posts.forEach(async ({ _id }) => {
            await Comment.deleteMany({ toPost: _id });
            await Like.deleteMany({ toPost: _id });
            await Save.deleteMany({ toPost: _id });
        });
        await Post.deleteMany({ creator: id });
        await Comment.deleteMany({ fromUser: id });
        await Like.deleteMany({ fromUser: id });
        await Save.deleteMany({ fromUser: id });
        const data = await User.findByIdAndDelete(id);
        res.status(200).json({ data });
    } catch (err) {
        res.status(500).json({ message: err.message, code: 'err' });
    }
}

export const signin = async (req, res) => {

    const { email, password } = req.body;

    try {
        // const existingID = await User.findOne({ id: user });
        // if(existingID) {
        //     const isPasswordCorrect = await bcrypt.compare(password, existingID.password);
        //     if(!isPasswordCorrect) return res.status(400).json({ message: 'Password incorrect!', code: 'pass_err' });
        //     const token = jwt.sign({ id: existingID._id, email: existingID.email }, 'test', { expiresIn: '1h' });
        //     return res.status(200).json({ result: existingID, token });
        // }
        if(validator.isEmpty(email) || validator.isEmpty(password)) return res.status(400).json({ message: 'Fields is requred!', code: 'user_fields' });
        const existingUser = await User.findOne({ email });
        if(existingUser){
            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
            if(!isPasswordCorrect) return res.status(400).json({ message: 'Password incorrect!', code: 'pass_err' });
            const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, 'test', { expiresIn: '1h' });
            return res.status(200).json({ result: existingUser, token });
        } else {
            return res.status(404).json({ message: 'User not found!', code: 'user_err' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message, code: 'err' });
    }
}

export const signup = async (req, res) => {

    const { name, email, password, confirmPassword } = req.body;

    try {
        if(validator.isEmpty(name) || validator.isEmpty(email) || validator.isEmpty(password) || validator.isEmpty(confirmPassword)) return res.status(400).json({ message: 'Fields is requred!', code: 'user_fields' });
        const existingEmail = await User.findOne({ email });
        if(existingEmail) return res.status(400).json({ message: 'Email already exists!', code: 'email_err' });
        if(!validator.isEmail(email)) return res.status(400).json({ message: 'Incorrect Email!', code: 'email_incorr' });
        if(password !== confirmPassword) return res.status(400).json({ message: 'Passwords don\'t match!', code: 'email_err' });
        const hashedPassord = await bcrypt.hash(password, 12);
        const result = await User.create({ password: hashedPassord, email, name });
        const token = jwt.sign({ email: result.email, id: result.id }, 'test', { expiresIn: '1h' });
        res.status(200).json({ result, token });
    } catch (err) {
        res.status(400).json({ message: err.message, code: 'err' });
    }
}

export const google = async (req, res) => {

    const { email, name, urlPic } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if(existingUser){
            const token = jwt.sign({ id: existingUser._id, email: existingUser.email }, 'test', { expiresIn: '1h' });
            return res.status(200).json({ result: existingUser, token });
        } else {
            const result = await User.create({ email, name, urlPic });
            const token = jwt.sign({ email: result.email, id: result.id }, 'test', { expiresIn: '1h' });
            res.status(201).json({ result, token });
        }
    } catch (err) {
        res.status(400).json({ message: err.message, code: 'err' });
    }
}

export const setPassword = async (req, res) => {

    const id = req.params.id;
    const { oldPassword, newPassword, confirmPassword } = req.body;

    try {
        const existingUser = await User.findById(id);
        if(!existingUser) return res.status(404).json({ message: 'User not found!', code: 'user_err' });
        if(existingUser.password) {
            if(validator.isEmpty(oldPassword) || validator.isEmpty(newPassword) || validator.isEmpty(confirmPassword)) return res.status(400).json({ message: 'Fields is requred!', code: 'user_fields' });
            if(newPassword !== confirmPassword) return res.status(400).json({ message: 'Passwords don\'t match!', code: 'email_err' });
            const isPasswordCorrect = await bcrypt.compare(oldPassword, existingUser.password);
            if(!isPasswordCorrect) return res.status(400).json({ message: 'Password incorrect!', code: 'pass_err' });
            const hashedPassord = await bcrypt.hash(newPassword, 12);
            const result = await User.findByIdAndUpdate(id, { $set: { password: hashedPassord } });
            res.status(201).json({ result });
        } else {
            if(validator.isEmpty(newPassword) || validator.isEmpty(confirmPassword)) return res.status(400).json({ message: 'Fields is requred!', code: 'user_fields' });
            if(newPassword !== confirmPassword) return res.status(400).json({ message: 'Passwords don\'t match!', code: 'email_err' });
            const hashedPassord = await bcrypt.hash(newPassword, 12);
            const result = await User.findByIdAndUpdate(id, { $set: { password: hashedPassord } });
            res.status(201).json({ result });
        }
    } catch (err) {
        res.status(400).json({ message: err.message, code: 'err' });
    }
}

export const getPassword = async (req, res) => {

    const _id = req.params.id;

    try {
        const existingUser = await User.findOne({ _id });
        res.status(200).json({ password: existingUser.password });
    } catch (err) {
        res.status(400).json({ message: err.message, code: 'err' });
    }
}