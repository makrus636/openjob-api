/* eslint-disable camelcase */
import jobRepositories from '../repositories/job-repositories.js';
import response from '../../../utils/response.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';

export const createJob = async (req, res, next) => {
  const {
    company_id, category_id, title, description, job_type, experience_level,
    location_type, location_city, salary_min, salary_max, is_salary_visible, status,
  } = req.body;

  const job = await jobRepositories.createJob({
    companyId: company_id, categoryId: category_id, title, description, jobType: job_type, experienceLevel: experience_level,
    locationType: location_type, locationCity: location_city, salaryMin: salary_min, salaryMax: salary_max, isSalaryVisible: is_salary_visible, status,
  });

  if (!job) {
    return next(new InvariantError('Job gagal ditambahkan.'));
  }

  return response(res, 201, 'Job berhasil ditambahkan', { id: job });
};

export const getJobById = async (req, res, next) => {
  const { id } = req.params;
  const job = await jobRepositories.getJobById(id);
  if (!job) {
    return next(new NotFoundError('Job tidak ditemukan'));
  }
  return response(res, 200, 'Job berhasil ditampilkan', job);
};

export const getJobByCompanyId = async (req, res) => {
  const { id } = req.params;
  const job = await jobRepositories.getJobByCompanyId(id);
  return response(res, 200, 'Job berhasil ditampilkan', { jobs: job });
};

export const getJobByCategoryId = async (req, res) => {
  const { id } = req.params;
  const job = await jobRepositories.getJobByCategoryId(id);
  return response(res, 200, 'Job berhasil ditampilkan', { jobs: job });
};

export const getAllJobs = async (req, res) => {
  const { title, 'company-name': companyName } = req.query;
  const jobs = await jobRepositories.getAllJobs({ title, companyName });
  return response(res, 200, 'Jobs berhasil ditampilkan', { jobs });
};

export const updateJobById = async (req, res, next) => {
  const { id } = req.params;
  const {
    title, description, salary_max
  } = req.body;

  const job = await jobRepositories.updateJobById(id, {
    title, description, salaryMax: salary_max
  });

  if (!job) {
    return next(new NotFoundError('Job tidak ditemukan'));
  }

  return response(res, 200, 'Job berhasil diperbarui');
};

export const deleteJobById = async (req, res, next) => {
  const { id } = req.params;

  const job = await jobRepositories.deleteJobById(id);

  if (!job) {
    return next(new NotFoundError('Job tidak ditemukan'));
  }

  return response(res, 200, 'Job berhasil dihapus');
};
