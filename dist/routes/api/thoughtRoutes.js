import { Router } from 'express';
const router = Router();
import { getAllThoughts, getThoughtById, createThought, deleteThought, addReaction, updateThought, removeReaction, } from '../../controllers/thoughtController.js';
// /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);
router.route('/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);
router.route('/:thoughtId/reactions').post(addReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
export { router as studentRouter };
