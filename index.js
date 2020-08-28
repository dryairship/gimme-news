import express from 'express';
import bodyParser from 'body-parser';
import config from './config/config.js';
import router from './routes/router.js';

const app = express();

app.use(bodyParser.json());
app.use('/gimme', router);

app.listen(config.port, () => {
    console.log(`Server started. Listening on port ${config.port}.`);
});
