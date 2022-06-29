// 
weath = "winter"
//! Requiring modules  --  START
var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
let random = require('./modules/random.js');
var fs = require('fs');

//! Requiring modules  --  END


//! Setting global arrays  --  START
grassArr = [];
grassEaterArr = [];
Matrix = [];
//! Setting global arrays  -- END




//! Creating Matrix -- START
function MatrixGenerator(MatrixSize, grass, grassEater, grassEaterEater, waterArr, fireArr) {
    for (let i = 0; i < MatrixSize; i++) {
        Matrix[i] = [];
        for (let o = 0; o < MatrixSize; o++) {
            Matrix[i][o] = 0;
        }
    }
    for (let i = 0; i < grass; i++) {
        let customX = Math.floor(random(MatrixSize)); // 0-9
        let customY = Math.floor(random(MatrixSize)); // 4
        Matrix[customY][customX] = 1;
    }
    for (let i = 0; i < grassEater; i++) {
        let customX = Math.floor(random(MatrixSize));
        let customY = Math.floor(random(MatrixSize));
        Matrix[customY][customX] = 2;
    }
    for (let i = 0; i < grassEaterEater; i++) {
        let customX = Math.floor(random(MatrixSize));
        let customY = Math.floor(random(MatrixSize));
        Matrix[customY][customX] = 3;
    }
    for (let i = 0; i < waterArr; i++) {
        let customX = Math.floor(random(MatrixSize));
        let customY = Math.floor(random(MatrixSize));
        Matrix[customY][customX] = 4;
    }
    for (let i = 0; i < fireArr; i++) {
        let customX = Math.floor(random(MatrixSize));
        let customY = Math.floor(random(MatrixSize));
        Matrix[customY][customX] = 5;
    }
}
MatrixGenerator(20, 1, 1);
//! Creating Matrix -- END

function weather() {
    if (weath == "winter") {
        weath = "spring"
    }
    else if (weath == "spring") {
        weath = "summer"
    }
    else if (weath == "summer") {
        weath = "autumn"
    }
    else if (weath == "autumn") {
        weath = "winter"
    }
    io.sockets.emit('weather', weath)
}
setInterval(weather, 5000);

//! SERVER STUFF  --  START
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require("socket.io")(server);
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);
//! SERVER STUFF END  --  END



function creatingObjects() {
    for (var y = 0; y < Matrix.length; y++) {
        for (var x = 0; x < Matrix[y].length; x++) {
            if (Matrix[y][x] == 2) {
                var grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            } else if (Matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                grassArr.push(grass);
            }
        }
    }
}

function game() {
    if (grassArr[0] !== undefined) {
        if (weath != 'autumn') {
            for (var i in grassArr) {
                grassArr[i].mul();
            }
        }

    }
    if (grassEaterArr[0] !== undefined) {
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        Matrix: Matrix,
        grassCounter: grassArr.length
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}



setInterval(game, 1000)

//// Add event
function kill1() {
    grassArr = [];
    grassEaterArr = []
    for (var y = 0; y < Matrix.length; y++) {
        for (var x = 0; x < Matrix[y].length; x++) {
            Matrix[y][x] = 0;
        }
    }
}
io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill1);
});
////   Create static Json
var statistics = {};

setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)
