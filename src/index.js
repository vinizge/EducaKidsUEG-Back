const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//Load env vars
dotenv.config({ path: __dirname + '/config/config.env' });

const app = express();

//Cookie Parser
app.use(cookieParser())

app.use(cors());

const routes = require('./routes');

require('./app/database')


app.use(express.json());


app.use(routes);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});


