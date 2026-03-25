import { Router } from 'express';
import {
  createCompany,
  getCompanyById,
  getAllCompanies,
  updateCompanyById,
  deleteCompanyById
} from '../controller/companies-controller.js';
import validate from '../../../middlewares/validate.js';
import { CompaniesPayloadSchema, UpdateCompaniesPayloadSchema } from '../../../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

router.post('/companies', authenticateToken, validate(CompaniesPayloadSchema), createCompany);
router.get('/companies/:id', getCompanyById);
router.get('/companies', getAllCompanies);
router.put('/companies/:id', authenticateToken, validate(UpdateCompaniesPayloadSchema), updateCompanyById);
router.delete('/companies/:id', authenticateToken, deleteCompanyById);

export default router;