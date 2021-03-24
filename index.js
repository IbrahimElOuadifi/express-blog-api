import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { posts, likes, comments, saves } from './routes/index.js';

const app = express();

app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use('/post', posts);
app.use('/like', likes);
app.use('/comment', comments);
app.use('/save', saves);

const CONNECTION_URL = 'mongodb+srv://root:toor@mern-blog-cluster.9m1r0.mongodb.net/database?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log(`server start on port: ${PORT}`)))
    .catch(err => console.log(err.message));

mongoose.set('useFindAndModify', false);