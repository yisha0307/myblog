var express = require('express');
var app = express();
var bodyParser = require('body-parser')
const routes = require('./routes/index')

app.use(bodyParser.json())

//注册路由

// const all = require('./routes/all')

routes(app)

// routes(app)
var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
