import CompaniesRepositories from '../repositories/companies-repositories.js';
import response from '../../../utils/response.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';

export const createCompany = async (req, res, next) => {
  const { name, location, description } = req.body;

  const isNameExist = await CompaniesRepositories.verifyNewName(name);
  if (isNameExist) {
    return next(new InvariantError('Gagal menambahkan company. Name Sudah digunakan'));
  }

  const company = await CompaniesRepositories.createCompany({
    name,
    location,
    description,
  });

  if (!company) {
    return next(new InvariantError('Company gagal ditambahkan.'));
  }

  return response(res, 201, 'Company berhasil ditambahkan', { id: company });
};

export const getCompanyById = async (req, res, next) => {
  const { id } = req.params;
  const company = await CompaniesRepositories.getCompanyById(id);
  if (!company) {
    return next(new NotFoundError('Company tidak ditemukan'));
  }
  return response(res, 200, 'Company berhasil ditampilkan', company);
};

export const getAllCompanies = async (req, res) => {
  const companies = await CompaniesRepositories.getAllCompanies();
  return response(res, 200, 'Companies berhasil ditampilkan', { companies });
};

export const updateCompanyById = async (req, res, next) => {
  const { id } = req.params;
  const { name, location, description } = req.body;

  const company = await CompaniesRepositories.updateCompanyById(id, {
    name,
    location,
    description,
  });

  if (!company) {
    return next(new NotFoundError('Company tidak ditemukan'));
  }

  return response(res, 200, 'Company berhasil diperbarui');
};

export const deleteCompanyById = async (req, res, next) => {
  const { id } = req.params;

  const company = await CompaniesRepositories.deleteCompanyById(id);
  if (!company) {
    return next(new NotFoundError('Company tidak ditemukan'));
  }

  return response(res, 200, 'Company berhasil dihapus');
};