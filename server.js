var express = require('express');
var compression = require('compression');

// Create our app
var app = express();
const PORT = process.env.PORT || 3000;

// compress all responses
app.use(compression());

app.use((req, res, next) => {
  const appUrls = ['/consumer', '/mortage', '/car'];
  if(appUrls.findIndex((val) => { return req.url === val; }) >= 0)
    res.redirect('http://' + req.hostname + ':' + PORT == '3000' ? PORT : '' + '/');
  else
    next();
});

app.use(function (req, res, next){
    if (req.headers['x-forwarded-proto'] === 'https') {
      res.redirect('http://' + req.hostname + req.url);
    } else {
      next();
    }
});

app.use(express.static('public'));

app.listen(PORT, function () {
  console.log('Express server is up on port ' + PORT);
});
