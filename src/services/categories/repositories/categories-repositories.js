import { Pool } from 'pg';

class CategoriesRepositories {
  constructor() {
    this._pool = new Pool();
  }

  async createCategory({ name }) {
    const id = `category-${Date.now()}`;
    const createAt = new Date().toISOString();
    const updateAt = createAt;
    const query = {
      text: 'INSERT INTO categories VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, name, createAt, updateAt],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      return false;
    }
    return result.rows[0].id;
  }

  async getAllCategories() {
    const query = {
      text: 'SELECT id, name FROM categories',
    };
    const result = await this._pool.query(query);

    return result.rows;
  }

  async getCategoryById(id) {
    const query = {
      text: 'SELECT id, name FROM categories WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async updateCategoryById(id, { name }) {
    const updateAt = new Date().toISOString();
    const query = {
      text: 'UPDATE categories SET name = $1, updated_at = $2 WHERE id = $3',
      values: [name, updateAt, id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      return false;
    }
    return result.rows;
  }

  async deleteCategoryById(id) {
    const query = {
      text: 'DELETE FROM categories WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rowCount) {
      return false;
    }
    return true;
  }

  async verifyNewName(name) {
    const query = {
      text: 'SELECT name FROM categories WHERE name = $1',
      values: [name],
    };

    const result = await this._pool.query(query);

    return result.rows.length > 0;
  }
}

export default new CategoriesRepositories();