const { PORT } = require('./src/config/config');
const express = require('express');
const authRoutes = require('./src/routes/authRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const port = PORT;
const app = express();

app.use(express.json());

// endpoint for auth routes
app.use('/auth', authRoutes);



// Handles the error across our aplication
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Application is listening on port ${port}`);
});