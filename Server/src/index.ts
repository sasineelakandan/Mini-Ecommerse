import dotenv from 'dotenv';
dotenv.config();
import express, { Application, } from 'express';


import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
const session= require('express-session')
;
import bodyParser from 'body-parser';
import { DATABASE_URL,PORT,ORIGIN } from './utils/config';
import AuthRoute from './Route/UserRoutes';
import AdminRoute from './Route/AdminRoute';


const app: Application = express();
const port: number = Number(PORT) || 3001;

mongoose.connect((DATABASE_URL))
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error: Error) => {
    console.error('Error connecting to MongoDB:', error);
  });


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
  origin:String([ORIGIN]) ,
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],
  credentials: true
}));
app.use(cookieParser());
app.use(express.json())
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(AuthRoute)
app.use(AdminRoute)

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

server.on('error', (error: Error) => {
  console.error('Server error:', error);
});

