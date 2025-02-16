import { Router } from 'express';
import { userRouter } from './userRoutes.js';
import { studentRouter } from './thoughtRoutes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/thoughts', studentRouter);

export default router;
