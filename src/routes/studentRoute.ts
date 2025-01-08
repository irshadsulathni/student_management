import express from 'express';
import { getStudents, addStudent, deleteStudent, updateStudent } from '../controllers/studentController';


const router = express.Router();

// Get all students
router.get('/', async (req, res) => {
  try {
    await getStudents(req, res);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).send('Error fetching students.');
  }
});

// Add a student
router.post('/add', async (req, res) => {
  try {
    await addStudent(req, res);
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).send('Error adding student.');
  }
});

// Delete a student by ID
router.get('/delete/:id', async (req, res) => {
  try {
    await deleteStudent(req, res);
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).send('Error deleting student.');
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    await updateStudent(req, res);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).send('Error updating student.');
  }
});


export default router;
