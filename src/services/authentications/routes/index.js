import { Router } from 'express';
import { login, refreshToken, logout } from '../controller/authentications-controller.js';
import validate from '../../../middlewares/validate.js';
import {
  PostAuthenticationsPayloadSchema,
  PutAuthenticationsPayloadSchema,
  DeleteAuthenticationsPayloadSchema
} from '../../../validator/schema.js';

const router = Router();

router.post('/authentications', validate(PostAuthenticationsPayloadSchema), login);
router.put('/authentications', validate(PutAuthenticationsPayloadSchema), refreshToken);
router.delete('/authentications', validate(DeleteAuthenticationsPayloadSchema), logout);

export default router;