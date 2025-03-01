import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import livereload from 'livereload';
import path from 'path';

import { databaseMiddleware } from '@middleware/db.middleware';
import { responsesMiddleware } from '@middleware/responses.middleware';


import routes from './routes';
import { JsonDb } from './db/json.db';

// Load environment variables from the .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || "development";

if (env.includes('dev')) {
    const liveReloadServer = livereload.createServer();
    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });
}

// Setup express-session
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Setup App middleware
app.use(databaseMiddleware(new JsonDb()));
app.use(responsesMiddleware);

// Setup app routes
app.use(routes);

if (env !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

export default app;