var express = require("express");
var bodyParser = require("body-parser");
var app		=	express();
var mongoose = require("mongoose");
var DEFAULT_PORT = process.env.PORT || 2018;
var STAGE = "/api/v1/";

const mongoLocal = "mongodb://sokha:76b16afb8783fecd803b737acaaed18d41b9aa86c6900eb6a0ac852be132805a@ds153380.mlab.com:53380/mock-server-api"; //
// const mongoLocal = 'mongodb://localhost/api_management';
mongoose.connect(process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || mongoLocal);
var db = mongoose.connection;

var user = require("./routes/user");
var workspace = require("./routes/workspace");
var resource = require("./routes/resource");
var method = require("./routes/method");
var deployment = require("./routes/deployment");

const registerRouters =  [user, workspace, resource, method];

var middleware = require("./middlewares/middleware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// app.use(middleware.checkSubDomainName);
/*
app.use((req, res, next) => {
    const hosts = req.headers.host.split(".");
    if (hosts.length > 0) {
        const subdomain = hosts[0];
        req.subDomain = subdomain;
    }
    next();
});
*/

// middleware deploy url
// app.use("/",  deployment);

app.use(STAGE, middleware.guardAuth,  registerRouters);


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

app.listen(DEFAULT_PORT, function(error) {
	console.log("Server host on port: localhost:"+DEFAULT_PORT);
});
