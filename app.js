var app = require("./config/express")();

var httpServer = require("http").Server(app);;

var io = require("socket.io")(httpServer);

app.set('io',io);

var porta = process.env.PORT || 3000;
var server = httpServer.listen(porta, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});