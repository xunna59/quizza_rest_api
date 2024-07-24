const pool = require('../config/db_config');

class UserModel {
    // Create a new user
    async createUser(first_name, last_name, email, password) {
        try {
            const result = await pool.query(
                'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *',
                [first_name, last_name, email, password]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    // Find a user by email
    async findUserByEmail(email) {
        try {
            const result = await pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );
            return result.rows[0];
        } catch (error) {
            console.error('Error finding user by email:', error);
            throw error;
        }
    }
}

module.exports = UserModel;