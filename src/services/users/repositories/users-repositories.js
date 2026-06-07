import { Pool } from 'pg';
import { nanoid } from 'nanoid';
import bcrypt from 'bcrypt';

class UsersRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createUser({ name, email, password, role }) {
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createAt = new Date().toISOString();
    const updateAt = createAt;
    const query = {
      text: 'INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, name, hashedPassword, email, role, createAt, updateAt],
    };
    const result = await this._pool.query(query);

    return result.rows[0].id;
  }

  async verifyNewName(name) {
    const query = {
      text: 'SELECT name FROM users WHERE name = $1',
      values: [name],
    };

    const result = await this._pool.query(query);

    return result.rows.length > 0;
  }

  async getUserById(id) {
    const query = {
      text: 'SELECT name FROM users WHERE id = $1',
      values: [id]
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async verifyUserCredential(email, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE email = $1',
      values: [email],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      return null;
    }

    const { id, password: hashedPassword } = result.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      return null;
    }

    return id;
  }

}

export default new UsersRepositories();