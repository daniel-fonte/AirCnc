import 'module-alias/register';
import dotenv from 'dotenv';
import express from "express";
import mongoose from 'mongoose';
import routes from '@Routes';

const app = express();

dotenv.config({path: './src/Config/.env'})

mongoose.connect(`mongodb+srv://oministack:${process.env.DB_PASSWORD}@oministack-t883u.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(routes);

app.listen(3333);