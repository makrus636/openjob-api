import ClientError from './client-error.js';

class AuthenticationsError extends ClientError {
  constructor(message) {
    super(message, 401);
    this.name = 'AuthenticationsError';
  }
}

export default AuthenticationsError;