const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const router = express.Router();

const cor = {
  'Access-Control-Allow-Origin': 'http://127.0.0.1:8081',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

router.post('/more/server2', function(req, res) {
    res.set(cor);
    res.json(req.cookies);
});

router.options('/more/server2', function(req, res) {
  res.set(cor);
  res.end();
});

app.use(router);
const port = process.env.PORT || 8082;

module.exports = app.listen(port, () => {
    console.log(`Server listen on http://localhost:${port}, Ctrl+C to stop`);
});
