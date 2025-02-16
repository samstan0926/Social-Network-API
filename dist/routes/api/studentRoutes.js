import { Router } from 'express';
const router = Router();
import { getAllThoughts, getThoughtById, createThought, deleteStudent, addAssignment, removeAssignment, } from '../../controllers/thoughtController.js';
// /api/students
router.route('/').get(getAllThoughts).post(createThought);
// /api/students/:studentId
router.route('/:studentId').get(getThoughtById).delete(deleteStudent);
// /api/students/:studentId/assignments
router.route('/:studentId/assignments').post(addAssignment);
// /api/students/:studentId/assignments/:assignmentId
router.route('/:studentId/assignments/:assignmentId').delete(removeAssignment);
export { router as studentRouter };
