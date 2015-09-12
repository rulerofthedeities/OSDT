var express = require('express'),
    app = express(),
    config = require('./server/config');

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app = config(app);

var server = app.listen(app.get('port'), function() { 
    console.log('Server running: http://localhost:' + app.get('port'));
});
