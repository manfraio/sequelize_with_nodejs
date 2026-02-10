require('dotenv').config({ quiet: true });
const express = require('express');
const sequelize = require('./config/database');
const errorHandler = require('./utils/errorHandler');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use('/categories', require('./routes/categoryRoute'));
app.use('/products', require('./routes/productRoute'));

app.use(errorHandler);

sequelize.authenticate().then(() => {
    console.log('Database connected')

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})