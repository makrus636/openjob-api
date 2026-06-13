import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class ApplicationsRepository {
  constructor() {
    this._pool = new Pool();
  }

  async createApplication({ user_id, job_id, status }) {
    const id = `application-${nanoid(16)}`;
    const created_at = new Date().toISOString();
    const updated_at = created_at;
    const query = `
      INSERT INTO applications (id, user_id, job_id, status, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id;
    `;
    const values = [id, user_id, job_id, status, created_at, updated_at];
    const result = await this._pool.query(query, values);
    return result.rows[0];
  }

  async getAllApplications() {
    const result = await this._pool.query('SELECT * FROM applications');
    return result.rows;
  }

  async getApplicationById(id) {
    const query = `
      SELECT *
      FROM applications
      WHERE id = $1;
    `;
    const values = [id];
    const result = await this._pool.query(query, values);
    return result.rows[0];
  }

  async getAllApplicationsByUserId(userId) {
    const query = {
      text: 'SELECT * FROM applications WHERE user_id = $1',
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async getAllApplicationsByJobId(jobId) {
    const query = {
      text: 'SELECT * FROM applications WHERE job_id = $1',
      values: [jobId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }

  async updateApplicationById(id, { status }) {
    const updated_at = new Date().toISOString();
    const query = {
      text: 'UPDATE applications SET status = $1, updated_at = $2 WHERE id = $3 RETURNING id',
      values: [status, updated_at, id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      return false;
    }
    return result.rows[0];
  }

  async deleteApplicationById(id) {
    const query = {
      text: 'DELETE FROM applications WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      return false;
    }
    return true;
  }
    
}

export default new ApplicationsRepository();