import express, { Express } from 'express'

import * as Routes from './app/routes';

import cors from 'cors'


require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
});

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use("/user", Routes.userRouter);
app.use("/property", Routes.propertyRouter)

export default app;
