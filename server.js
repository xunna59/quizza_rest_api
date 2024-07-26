const { PORT } = require('./src/config/config');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./src/routes/authRoutes');
const categoryRoutes = require('./src/routes/categoryRoutes');
const questionRoutes = require('./src/routes/questionRoutes');
const answerRoutes = require('./src/routes/answerRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const port = PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Endpoint for auth routes
app.use('/auth', authRoutes);

// Endpoint for category routes
app.use('/category', categoryRoutes);

// Endpoint for question routes
app.use('/question', questionRoutes);

// Endpoint for answer routes
app.use('/answer', answerRoutes);


// Handles the error across our aplication
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Application is listening on port ${port}`);
});