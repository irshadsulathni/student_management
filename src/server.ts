import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import studentRoutes from './routes/studentRoute';
// import methodOverride from 'method-override';

// Load environment variables from .env file
dotenv.config();

// Create an instance of the Express app
const app = express();


// app.use(methodOverride('_method'));


// MongoDB connection function
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect('mongodb://localhost:27017/student_management');
    console.log('MongoDB Connected...');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};


// Connect to the database
connectDB();

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for serving static files and parsing form data
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define routes for students
app.use('/', studentRoutes);

// Handle 404 errors (not found)
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
