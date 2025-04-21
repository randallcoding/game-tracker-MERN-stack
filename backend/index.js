import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Game } from './models/gameModel.js'
import gamesRoute from './routes/gamesRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy

// app.use(
    // cors({
        // origin: 'http://localhost:5500',
        // methods: ['GET', 'POST', 'PUT', 'DELETE'],
        // allowedHeaders: ['Content-Type'],

    // })
// );


app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('TEST')
});

app.use('/games', gamesRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });