const pool = require('../config/db_config');

class CategoryModel {
    async createCategory(category_name) {
        try {
            const result = await pool.query(
                'INSERT INTO quiz_category (category_name) VALUES ($1) RETURNING *',
                [category_name]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    async getAllCategories() {
        try {
            const result = await pool.query(
                'SELECT * FROM quiz_category'
            );
            return result.rows;
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }
    
    async deleteCategory(category_id) {
        try {
            const result = await pool.query(
                'DELETE FROM quiz_category WHERE id = $1 RETURNING *',
                [category_id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(`${error.message}`);
        }
    }


}

module.exports = CategoryModel;
