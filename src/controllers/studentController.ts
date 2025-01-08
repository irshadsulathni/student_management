import { Request, Response } from 'express';
import Student from '../models/Student';

// helper function for email validation
const isValidEmail = (email: string) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.render('index', { students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Server Error');
  }
};

export const addStudent = async (req: Request, res: Response) => {
  try {
    let { name, age, grade, email } = req.body;

    name = name.trim();
    email = email.trim();

    if (!name || !age || !grade || !email) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }
    
    if (isNaN(age) || Number(age) <= 4) {
      return res.status(400).json({ success: false, message: 'Invalid age.' });
    }
    
    const validGrades = ['A+', 'A', 'B+', 'B', 'C+', 'C'];
    if (!validGrades.includes(grade)) {
      return res.status(400).json({ success: false, message: 'Invalid grade.' });
    }
    
    const student = new Student({ name, age, grade, email });
    await student.save();

    return res.json({ success: true, message: 'Student added successfully' });  // Send success message
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).send('Server Error');
  }
};


export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).send('Student Not Found');
    }

    res.redirect('/');
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).send('Server Error');
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    let { name, age, grade, email } = req.body;
    console.log('hy hello');
    console.log('body', req.body);

    name = name.trim();
    email = email.trim();

    if (!name || !age || !grade || !email) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    
    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format.' });
    }
    
    if (isNaN(age) || Number(age) <= 4) {
      return res.status(400).json({ success: false, message: 'Invalid age.' });
    }
    
    const validGrades = ['A+', 'A', 'B+', 'B', 'C+', 'C'];
    if (!validGrades.includes(grade)) {
      return res.status(400).json({ success: false, message: 'Invalid grade.' });
    }
    

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { name, age, grade, email },
      { new: true }
    );

    console.log('student:', student);

    if (!student) {
      return res.status(404).json({ success: false, message: 'Student Not Found' });
    }

    res.json({ success: true, student });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
