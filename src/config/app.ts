

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import { CLIENT_URL, SESSION_SECRET } from './index';
import routes from '../routes';
import errorHandler from '../middleware/errorHandler';
const app = express();

const corsOptions = {
    origin: CLIENT_URL,
    method: "GET,POST,PUT,DELETE",
    credentials: true,
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router 
app.use("/api/v1", routes);

app.use(
    session({
      secret: SESSION_SECRET!,
      resave: false,
      saveUninitialized: true,
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  

app.use(
    session({
        secret: SESSION_SECRET!,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7,
        },
    })
);

// app.use(errorHandler);



export default app;