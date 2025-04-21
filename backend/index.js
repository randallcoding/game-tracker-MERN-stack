import "dotenv/config";
import express from "express";
import mongoose from 'mongoose';
import gamesRoute from './routes/gamesRoute.js';
const app = express();

app.use(express.json());

app.get('/', (request, response) => {
 console.log(request)
 return response.status(234).send('TEST')
});

app.use('/games', gamesRoute);

mongoose
 .connect(process.env['mongoDBURL'])
 .then(() => {
 console.log('App connected to database');
 app.listen(process.env['PORT'], () => {
 console.log(`App is listening to port: ${process.env.PORT}`);
 });
 })
 .catch((error) => {
 console.log(error);
 });