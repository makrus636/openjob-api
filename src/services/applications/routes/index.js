import { Router } from 'express';
import {
  createApplication,
  getAllApplications,
  getApplicationById,
  getAllApplicationsByUserId,
  getAllApplicationsByJobId,
  updateApplicationById,
  deleteApplicationById,
} from '../controllers/applications-controllers.js';
import validate from '../../../middlewares/validate.js';
import { ApplicationsPayloadSchema, UpdateApplicationsPayloadSchema } from '../../../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

router.post('/applications', authenticateToken, validate(ApplicationsPayloadSchema), createApplication);
router.get('/applications', authenticateToken, getAllApplications);
router.get('/applications/:id', authenticateToken, getApplicationById);
router.get('/applications/user/:id', authenticateToken, getAllApplicationsByUserId);
router.get('/applications/job/:id', authenticateToken, getAllApplicationsByJobId);
router.put('/applications/:id', authenticateToken, validate(UpdateApplicationsPayloadSchema), updateApplicationById);
router.delete('/applications/:id', authenticateToken, deleteApplicationById);

export default router;