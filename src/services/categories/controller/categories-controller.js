import CategoriesRepositories from '../repositories/categories-repositories.js';
import response from '../../../utils/response.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';

export const createCategory = async (req, res, next) => {
  const { name } = req.body;

  const isNameExist = await CategoriesRepositories.verifyNewName(name);
  if (isNameExist) {
    return next(new InvariantError('Gagal menambahkan category. Name Sudah digunakan'));
  }

  const category = await CategoriesRepositories.createCategory({
    name,
  });

  if (!category) {
    return next(new InvariantError('Category gagal ditambahkan.'));
  }

  return response(res, 201, 'Category berhasil ditambahkan', { id: category });
};

export const getCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoriesRepositories.getCategoryById(id);
  if (!category) {
    return next(new NotFoundError('Category tidak ditemukan'));
  }
  return response(res, 200, 'Category berhasil ditampilkan', category);
};

export const getAllCategories = async (req, res) => {
  const categories = await CategoriesRepositories.getAllCategories();
  return response(res, 200, 'Categories berhasil ditampilkan', { categories });
};

export const updateCategoryById = async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category = await CategoriesRepositories.updateCategoryById(id, {
    name,
  });

  if (!category) {
    return next(new NotFoundError('Category tidak ditemukan'));
  }

  return response(res, 200, 'Category berhasil diperbarui');
};

export const deleteCategoryById = async (req, res, next) => {
  const { id } = req.params;

  const category = await CategoriesRepositories.deleteCategoryById(id);
  if (!category) {
    return next(new NotFoundError('Category tidak ditemukan'));
  }
  return response(res, 200, 'Category berhasil dihapus');
};