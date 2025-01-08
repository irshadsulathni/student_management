import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
// import connectDB from './config/db';
import studentRoutes from './routes/studentRoute';

dotenv.config();

// connectDB();

const app = express();

app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', studentRoutes);

export default app;
