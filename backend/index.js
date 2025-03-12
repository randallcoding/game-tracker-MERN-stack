import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Game } from './models/gameModel.js'

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('TEST')
});

// Route for saving a new Game
app.post('/games', async (request, response) => {
    try {      
        if (
            !request.body.title ||
            !request.body.console ||
            !request.body.publishYear 
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, console, publishYear '
            });
        }
        const newGame = {
            title: request.body.title,
            console: request.body.console,
            publishYear: request.body.publishYear
        };

        const game = await Game.create(newGame);

        return response.status(201).send(game);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
    });

// Route for getting all games from database
app.get('/games', async (request, response) => {
    try {
        const games = await Game.find({});

        return response.status(200).json({
            count: games.length,
            data: games
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message });
    }
});

// Route for getting one game from database by id
app.get('/games/:id', async (request, response) => {
    try {

        const { id } = request.params;

        const game = await Game.findById(id);

        return response.status(200).json(game);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

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