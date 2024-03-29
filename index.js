import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { auth, follows, posts, likes, comments, saves } from './routes/index.js';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/auth', auth);
app.use('/follow', follows);
app.use('/post', posts);
app.use('/like', likes);
app.use('/comment', comments);
app.use('/save', saves);

const CONNECTION_URL = process.env.DATABASE_CONNECTION_URL;
// const CONNECTION_URL = 'mongodb://localhost:27017/mern-blogdb?readPreference=primary&appname=MongoDB%20Compass&ssl=false';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`server start on port: ${PORT}`)))
    .catch(err => console.log(err.message));

mongoose.set('useFindAndModify', false);