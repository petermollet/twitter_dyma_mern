const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const port = process.env.PORT || 4000;
const index = require('./routes');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public/assets')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short'));
app.use(index);


app.listen(port, () => console.log(`server is up and running on port ${port}`));