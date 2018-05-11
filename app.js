var express = require("express");
var bodyParser = require("body-parser");
var app		=	express();
var mongoose = require("mongoose");
var DEFAULT_PORT = process.env.PORT || 3000;
var PREFIX_API = "/api/v1/";

const mongoLocal = 'mongodb://localhost/api_management';
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || mongoLocal);
var db = mongoose.connection;

var user = require("./routes/user.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
    const hosts = req.headers.host.split(".");
    if (hosts.length > 0) {
        const subdomain = hosts[0];
        req.subdomain = subdomain;
    }
    next();
});

app.use(PREFIX_API, [user]);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(() => {
    console.log('payload');
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.end(res.locals.message);
});

app.listen(3000, function(error) {
	console.log("Server host on port: localhost:"+DEFAULT_PORT);
});
