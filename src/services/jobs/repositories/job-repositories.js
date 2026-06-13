import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class JobsRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createJob({
    companyId, categoryId, title, description, jobType, experienceLevel,
    locationType, locationCity, salaryMin, salaryMax, isSalaryVisible, status,
  }) {
    const id = `job-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const query = {
      text: 'INSERT INTO jobs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING id',
      values: [id, companyId, categoryId, title, description, jobType,
        experienceLevel, locationType, locationCity,
        salaryMin, salaryMax, isSalaryVisible,
        status, createdAt, updatedAt],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      return false;
    }
    return result.rows[0].id;
  }

  async getJobById(id) {
    const query = {
      text: 'SELECT * FROM jobs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      return false;
    }
    return result.rows[0];
  }

  async getJobByCompanyId(id) {
    const query = {
      text: 'SELECT * FROM jobs WHERE company_id = $1 ',
      values: [id]
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getJobByCategoryId(id) {
    const query = {
      text: 'SELECT * FROM jobs WHERE category_id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getAllJobs({ title, companyName }) {

    let text = 'SELECT j.*, c.name AS company_name FROM jobs j INNER JOIN companies c ON j.company_id = c.id';

    const conditions = [];
    const values = [];
    if (title && title.trim() !== '') {
      conditions.push(`j.title ILIKE $${  values.length + 1}`);
      values.push(`%${title}%`);
    }
    if (companyName && companyName.trim() !== '') {
      conditions.push(`c.name ILIKE $${  values.length + 1}`);
      values.push(`%${companyName}%`);
    }

    if (conditions.length > 0) {
      text += ` WHERE ${conditions.join(' AND ')}`;
    }

    const result = await this._pool.query({ text, values });

    return result.rows;
  }

  async updateJobById(id, {
    title, description, salaryMax
  }) {
    const updateAt = new Date().toISOString();
    const query = {
      text: 'UPDATE jobs SET title = $1, description = $2, salary_max = $3, updated_at = $4 WHERE id = $5',
      values: [title, description, salaryMax, updateAt, id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      return false;
    }
    return result.rows;
  }

  async deleteJobById(id) {
    const query = {
      text: 'DELETE FROM jobs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      return false;
    }
    return true;
  }
}

export default new JobsRepositories();
