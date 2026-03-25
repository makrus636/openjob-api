import express from 'express';
import validate from '../../../middlewares/validate.js';
import { createUser, getUserById } from '../controller/user-controller.js';
import { UsersPayloadSchema } from '../../../validator/schema.js';

const router = express.Router();

router.post('/users', validate(UsersPayloadSchema), createUser);
router.get('/users/:id', getUserById);

export default router;