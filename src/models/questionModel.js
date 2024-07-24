const pool = require('../config/db_config');

class QuestionModel {
    async createQuestion(category_id, question_text) {
        try {
            const result = await pool.query(
                'INSERT INTO quiz_questions (category_id, question_text) VALUES ($1, $2) RETURNING *',
                [category_id, question_text]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    async createOption(question_id, option_text, is_correct) {
        try {
            const result = await pool.query(
                'INSERT INTO options (question_id, option_text, is_correct) VALUES ($1, $2, $3) RETURNING *',
                [question_id, option_text, is_correct]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    async fetchQuestions() {
        try {
            const result = await pool.query('SELECT * FROM quiz_questions');
            return result.rows;
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }
}

module.exports = QuestionModel;
