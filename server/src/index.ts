import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

import routes from './routes';

import { checkUserExistOrCreate } from './middlewares/session';

// Load environment variables from the .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


// Setup express-session
app.use(session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json());

// Setup app middleware
app.use(checkUserExistOrCreate);

// Setup app routes
app.use('/', routes);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
}

export default app;