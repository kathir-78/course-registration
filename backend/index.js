const express = require('express');
const connectDb = require('./src/config/configdb');
const app = express();
var cors = require('cors');
require('dotenv').config();
var cookieParser = require('cookie-parser');
const adminRoute = require('./src/routes/adminRoute');
const authRoute = require('./src/routes/authRoute');
const staffRoute = require('./src/routes/staffRoute');
const studentRouter = require('./src/routes/studentRoute');

const corsOptions = {
    origin: 'http://localhost:4200', // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.use('/welcome', (req, res) => {
    res.status(200).send('welcome to the course registrarion');
});

app.use('/', authRoute);
app.use('/', staffRoute)
app.use('/', adminRoute);
app.use('/', studentRouter);

PORT = process.env.PORT || 3000
connectDb().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is started on port http://localhost:${PORT}`);
    });
}).catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
});