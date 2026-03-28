import { Router } from 'express';
import {
  createCategory,
  getCategoryById,
  getAllCategories,
  updateCategoryById,
  deleteCategoryById
} from '../controller/categories-controller.js';
import validate from '../../../middlewares/validate.js';
import { CategoriesPayloadSchema, UpdateCategoriesPayloadSchema } from '../../../validator/schema.js';
import authenticateToken from '../../../middlewares/auth.js';

const router = Router();

router.post('/categories', authenticateToken, validate(CategoriesPayloadSchema), createCategory);
router.get('/categories/:id', getCategoryById);
router.get('/categories', getAllCategories);
router.put('/categories/:id', authenticateToken, validate(UpdateCategoriesPayloadSchema), updateCategoryById);
router.delete('/categories/:id', authenticateToken, deleteCategoryById);

export default router;