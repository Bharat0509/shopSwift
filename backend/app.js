import app from './server.js';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import ErrorHandlerMiddleware from './middlewares/error.js';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// if(process.env.NODE_ENV!=="PRODUCTION"){
dotenv.config({ path: './backend/config/config.env' });
// }
// Handling Uncaught Error

process.on('uncaughtException', (err) => {
    console.log(`Error:${err.message}`);
    console.log('Shutting Down the Server Due to Uncaught Error ');
    process.exit(1);
});

// MongoDb Imports
import MongoServer from './config/database.js';

// Routes Imports
import product from './routes/productRoute.js';
import user from './routes/userRoute.js';
import order from './routes/orderRoute.js';
import payment from './routes/paymentRoute.js';

//Cors Options
const productionOrigin = [];
const corsOptions = {
    origin: [
        'http://localhost:4000',
        'http://localhost:3000',
        'https://shop-swift.onrender.com/',
        'https://shop-swift.onrender.com',
        'https://shop-swift-blond.vercel.app/',
        'https://shop-swift-blond.vercel.app'
    ],
    optionsSuccessStatus: 200,
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

// Connecting to DB

// cloudinary.config({
//   cloud_name: `${process.env.CLOUDINARY_NAME}`,
//   api_key: `${process.env.CLOUDINARY_API_KEY}`,
// api_secret: `${process.env.CLOUDINARY_SECRET_KEY}`
// })

// Configuration

cloudinary.config({
    cloud_name: 'dbhf7xh4q',
    api_key: '887173712287675',
    api_secret: 'T8bjOinQ4NWc7mphFRuVA9PDifY'
});

// Rotes
// ********Product Route*********** */
app.use('/api/v1', product);

// ********User Route*********** */
app.use('/api/v1', user);

// ********Order Route*********** */
app.use('/api/v1', order);

// ********Payment Route*********** */
app.use('/api/v1', payment);

// ********Error Handler Route*********** */
app.use(ErrorHandlerMiddleware);

const server = app.listen(process.env.PORT, async () => {
    await MongoServer();
    console.log(`server started http://localhost:${process.env.PORT}`);
});

process.on('unhandledRejection', (err) => {
    console.log(`Error:${err.message}`);
    console.log('Shutting down the Server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    });
});
