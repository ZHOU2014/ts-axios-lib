const webpack = require('webpack');
const express = require('express');
const atob = require('atob');
const cookieParser = require('cookie-parser');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config');

const app = express();

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
        colors: true,
        chunks: false,
    }
}));

app.use(webpackHotMiddleware(compiler));

app.use(express.static(__dirname, {
  setHeaders(res) {
    res.cookie('XSRF-TOKEN-D', '1234abc');
  }
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
const router = express.Router();

router.get('/simple/get', function(req, res) {
    res.json({
        msg: 'hello world'
    });
});

router.get('/base/get', function(req, res) {
    res.json(req.query);
});

router.post('/base/post', function(req, res) {
    res.json(req.body);
});

router.post('/base/buffer', function(req, res) {
    let msg = [];

    req.on('data', (chunk) => {
        if (chunk) msg.push(chunk);
    });

    req.on('end', () => {
        const buf = Buffer.concat(msg);
        res.json(buf.toJSON());
    });
});

router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
        msg: 'hello world'
    });
  } else {
    res.status(500);
    res.end();
  }
});

router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
        msg: 'hello world'
    });
  }, 3000);
});

router.get('/extend/get', function(req, res) {
  res.json(req.query);
});

router.delete('/extend/delete', function(req, res) {
  res.json({
    msg: '/extend/delete'
  });
});
router.head('/extend/head', function(req, res) {
  res.json({
    msg: '/extend/head'
  });
  res.end();
});
router.options('/extend/options', function(req, res) {
  res.json({
    msg: '/extend/options'
  });
});
router.post('/extend/post', function(req, res) {
  res.json(req.body);
});
router.put('/extend/put', function(req, res) {
  res.json(req.body);
});
router.patch('/extend/patch', function(req, res) {
  res.json(req.body);
});

router.get('/extend/user', function(req, res) {
  res.json({
    code: 0,
    data: {
      name: 'lili',
      age: 25,
    },
    message: 'request is ok'
  });
});

router.get('/interceptor/get', function(req, res) {
  res.end('hello');
});

router.post('/config/post', function(req, res) {
  res.json(req.body);
});

router.get('/cancel/get', function(req, res) {
  setTimeout(() => {
    res.end('hello');
  }, 1000);
});

router.post('/cancel/post', function(req, res) {
  setTimeout(() => {
    res.json(req.body);
  }, 1000);
});

router.get('/more/get', function(req, res) {
  res.json(req.cookies);
});

router.post('/more/post', function(req, res) {
  const auth = req.headers.authorization;
  const [type, credentials] = auth.split(' ');

  const [username, password] = atob(credentials).split(':');

  if (type === 'Basic' && username === 'Yee' && password === '123456') {
    res.json(req.body);
  } else {
    res.status(401);
    res.end('UnAuthorization');
  }
});

router.get('/more/304', function(req, res) {
  res.status(304);
  res.end('not modified');
});

router.get('/more/A', function(req, res) {
  res.end('A');
});

router.get('/more/B', function(req, res) {
  res.end('B');
});

app.use(router);
const port = process.env.PORT || 8081;

module.exports = app.listen(port, () => {
    console.log(`Server listen on http://localhost:${port}, Ctrl+C to stop`);
});
