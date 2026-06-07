import AuthenticationsReposiories from '../repositories/authentications-repositories.js';
import UserRepositories from '../../users/repositories/users-repositories.js';
import TokenManager from '../../../security/token-manager.js';
import response from '../../../utils/response.js';
import { InvariantError, AuthenticationsError } from '../../../exceptions/index.js';

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const userId = await UserRepositories.verifyUserCredential(email, password);

  if (!userId) {
    return next(new AuthenticationsError('Kredensial yang diberikan salah'));
  }

  const accessToken = TokenManager.generateAccessToken({ id: userId });
  const refreshToken = TokenManager.generateRefreshToken({ id: userId });

  await AuthenticationsReposiories.addRefreshToken(refreshToken);

  return response(res, 200, 'Authentication berhasil ditambahkan', {
    accessToken,
    refreshToken,
  });
};

export const refreshToken = async (req, res, next) => {
  const { refreshToken } = req.body;

  const result = await AuthenticationsReposiories.verifyRefreshToken(refreshToken);

  if (!result) {
    return next(new InvariantError('Refresh Token tidak valid'));
  }

  const { id } = TokenManager.verifyRefreshToken(refreshToken);
  const accessToken = TokenManager.generateAccessToken({ id });

  return response(res, 200, 'Access token berhasil diperbarui', { accessToken });
};

export const logout = async (req, res, next) => {
  const { refreshToken } = req.body;

  const result = await AuthenticationsReposiories.verifyRefreshToken(refreshToken);

  if (!result) {
    return next(new InvariantError('Refresh Token tidak valid'));
  }

  await AuthenticationsReposiories.deleteRefreshToken(refreshToken);

  return response(res, 200, 'Refresh token berhasil dihapus');
};
