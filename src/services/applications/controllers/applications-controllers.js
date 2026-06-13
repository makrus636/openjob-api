import ApplicationsRepositories from '../repositories/applications-repositories.js';
import response from '../../../utils/response.js';
import { InvariantError } from '../../../exceptions/index.js';

export const  createApplication = async (req, res, next) => {
  const { user_id, job_id, status } = req.body;

  const result = await ApplicationsRepositories.createApplication({
    user_id,
    job_id,
    status,
  });

  if (!result) {
    return next(new InvariantError('Application gagal ditambahkan.'));
  }

  return response(res, 201, 'Application berhasil ditambahkan', result );
};

export const getAllApplications = async (req, res) => {
  const result = await ApplicationsRepositories.getAllApplications();
  return response(res, 200, 'Applications berhasil ditampilkan', { applications: result } );
};

export const getApplicationById = async (req, res, next) => {
  const { id } = req.params;
  const result = await ApplicationsRepositories.getApplicationById(id);
  if (!result) {
    return next(new NotFoundError('Application tidak ditemukan'));
  }
  return response(res, 200, 'Application berhasil ditampilkan', result);
};

export const getAllApplicationsByUserId = async (req, res) => {
  const { id } = req.params;
  const result = await ApplicationsRepositories.getAllApplicationsByUserId(id);
  return response(res, 200, 'Application berhasil ditampilkan', { applications: result });
};

export const getAllApplicationsByJobId = async (req, res) => {
  const { id } = req.params;
  const result = await ApplicationsRepositories.getAllApplicationsByJobId(id);
  return response(res, 200, 'Application berhasil ditampilkan', { applications: result });
};

export const updateApplicationById = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;
  const result = await ApplicationsRepositories.updateApplicationById(id, { status });
  if (!result) {
    return next(new InvariantError('Application gagal diupdate.'));
  }
  return response(res, 200, 'Application berhasil diupdate', result);
};

export const deleteApplicationById = async (req, res, next) => {
  const { id } = req.params;
  const result = await ApplicationsRepositories.deleteApplicationById(id);
  if(!result) {
    return next(new InvariantError('Application gagal dihapus.'));
  }
  return response(res, 200, 'Application berhasil dihapus', result);
};

