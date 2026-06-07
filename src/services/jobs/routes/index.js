import { Router } from 'express';
import authenticateToken from '../../../middlewares/auth.js';
import validate from '../../../middlewares/validate.js';
import { JobPayloadSchema, UpdateJobPayloadSchema } from '../../../validator/schema.js';
import { createJob, deleteJobById, getAllJobs, getJobByCategoryId, getJobByCompanyId, getJobById, updateJobById } from '../controller/job-controller.js';

const router = Router();

router.post('/jobs', authenticateToken, validate(JobPayloadSchema), createJob);
router.get('/jobs/:id', getJobById);
router.get('/jobs', getAllJobs);
router.put('/jobs/:id', authenticateToken, validate(UpdateJobPayloadSchema), updateJobById);
router.delete('/jobs/:id', authenticateToken, deleteJobById);
router.get('/jobs/company/:id', getJobByCompanyId);
router.get('/jobs/category/:id', getJobByCategoryId);

export default router;
