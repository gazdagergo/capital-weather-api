require('dotenv').config();
const express = require('express');
const path = require('path');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api', (req, res) => {
	res.json({ version: '1'})
});

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || '1337';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));
