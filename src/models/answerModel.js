const pool = require('../config/db_config');

class AnswerModel {
    async createUserAnswer(user_id, question_id, option_id) {
        try {
            const result = await pool.query(
                'INSERT INTO user_answers (user_id, question_id, option_id) VALUES ($1, $2, $3) RETURNING *',
                [user_id, question_id, option_id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    async fetchUserAnswers(user_id) {
        try {
            const result = await pool.query(
                'SELECT * FROM user_answers WHERE user_id = $1',
                [user_id]
            );
            return result.rows;
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }
}

module.exports = AnswerModel;
