import { readdir } from 'fs';
import express from 'express';
import config from './config.js';
import cors from 'cors';

const app = express();

// app.use(express.static(join('public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

readdir('routes', (err, files) => {
    files.forEach(async file => {
        const routing = (await import('./routes/' + file)).default;
        app.use(routing.route, routing.router);
    });
});

app.listen(config.PORT, () => {
    console.log('SERVER RUNNING ON: http://localhost:' + config.PORT);
});
