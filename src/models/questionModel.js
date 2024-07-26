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
            const result = await pool.query(`
                SELECT q.id as question_id, q.question_text, o.id as option_id, o.option_text, o.is_correct 
                FROM quiz_questions q 
                LEFT JOIN options o ON q.id = o.question_id
            `);

            const questions = {};

            result.rows.forEach(row => {
                if (!questions[row.question_id]) {
                    questions[row.question_id] = {
                        question_id: row.question_id,
                        question_text: row.question_text,
                        options: []
                    };
                }
                questions[row.question_id].options.push({
                    option_id: row.option_id,
                    option_text: row.option_text,
                    is_correct: row.is_correct
                });
            });

            return Object.values(questions);
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    async fetchQuestionById(id) {
        try {
            const result = await pool.query(
                'SELECT * FROM quiz_questions WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    async fetchOptionById(id) {
        try {
            const result = await pool.query(
                'SELECT * FROM options WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    async deleteQuestionById(id) {
        try {
            await pool.query(
                'DELETE FROM options WHERE question_id = $1',
                [id]
            );
            await pool.query(
                'DELETE FROM quiz_questions WHERE id = $1',
                [id]
            );
            return { success: true, message: 'Question and its options deleted successfully' };
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }
}

module.exports = QuestionModel;
