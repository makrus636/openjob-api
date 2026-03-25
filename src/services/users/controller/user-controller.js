import UsersRepositories from '../repositories/users-repositories.js';
import response from '../../../utils/response.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';

export const createUser = async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const isNameExist = await UsersRepositories.verifyNewName(name);
  if (isNameExist) {
    return next(new InvariantError('Gagal menambahkan user. Name Sudah digunakan'));
  }

  const user = await UsersRepositories.createUser({
    name,
    email,
    password,
    role,
  });

  if (!user) {
    return next(new InvariantError('User gagal ditambahkan.'));
  }

  return response(res, 201, 'User berhasil ditambahkan', { id: user });
};

export const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await UsersRepositories.getUserById(id);
  if (!user) {
    return next(new NotFoundError('User tidak ditemukan'));
  }
  return response(res, 200, 'User berhasil ditampilkan', user);
};
