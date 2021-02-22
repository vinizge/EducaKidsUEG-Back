const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')

//Load env vars
dotenv.config({ path: __dirname + '/config/config.env' });

const app = express();

//Cookie Parser
app.use(cookieParser())

app.use(cors());

const routes = require('./routes');

require('./app/database')

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
//File upload
app.use(fileUpload());
app.use(express.json());


app.use(routes);

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});


