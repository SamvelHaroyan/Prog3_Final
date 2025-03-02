//!Setting weather

weath = "winter"

//! Requiring modules  --  START

var Grass = require("./modules/Grass.js");
var GrassEater = require("./modules/GrassEater.js");
var Predator = require("./modules/PredatorClass.js");
var Energetik = require("./modules/EnergetikClass.js");
var Killer = require("./modules/KillerClass.js");
var Virus = require("./modules/VirusClass.js");
var Assassin = require("./modules/Assassin.js");
let random = require('./modules/random.js');
var fs = require('fs');
//! Requiring modules  --  END

//! Setting global arrays --  START

var n = 50;
var gr = 50;
var GrEat = 30;
var Predat = 15;
var virus = 5;
var energetik = 20;
var assassin = 4;

GrassArr = [];
GrassEaterArr = [];
PredatorArr = [];
VirusArr = [];
EnergetikArr = [];
KillerArr = [];
Matrix = [];
AssassinArr = [];

//! Setting global arrays  -- END

//! Creating Matrix -- START
function generate(matLen, gr, GrEat, Predat, virus, energetik, assassin) {
    // let Matrix = [];
    for (let i = 0; i < matLen; i++) {
        Matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            Matrix[i][j] = 0
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (Matrix[y][x] == 0) {
            Matrix[y][x] = 1
        }
    }
    for (let i = 0; i < GrEat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (Matrix[y][x] == 0) {
            Matrix[y][x] = 2
        }
    }
    for (let i = 0; i < Predat; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (Matrix[y][x] == 0) {
            Matrix[y][x] = 3
        }
    }
    for (let i = 0; i < virus; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (Matrix[y][x] == 0) {
            Matrix[y][x] = 4
        }
    }
    for (let i = 0; i < energetik; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (Matrix[y][x] == 0) {
            Matrix[y][x] = 5
        }
    }
    for (let i = 0; i < assassin; i++) {
        let x = Math.floor(Math.random() * matLen)
        let y = Math.floor(Math.random() * matLen)
        if (Matrix[y][x] == 0) {
            Matrix[y][x] = 7
        }
    }
    return Matrix;
}
Matrix = generate(n, gr, GrEat, Predat, virus, energetik, assassin)

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
setInterval(weather, 3000);

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
                GrassEaterArr.push(grassEater);
            }
            else if (Matrix[y][x] == 1) {
                var grass = new Grass(x, y);
                GrassArr.push(grass);
            }
            else if (Matrix[y][x] == 3) {
                var PredatorElement = new Predator(x, y);
                PredatorArr.push(PredatorElement);
            }
            else if (Matrix[y][x] == 4) {
                var virus = new Virus(x, y);
                VirusArr.push(virus);
            }
            else if (Matrix[y][x] == 5) {
                var energetik = new Energetik(x, y);
                EnergetikArr.push(energetik);
            }
            else if (Matrix[y][x] == 7) {
                var newAssassin = new Assassin(x, y);
                AssassinArr.push(newAssassin);
            }
        }
    }
}

function game() {
    if (GrassArr[0] !== undefined) {
        if (weath != 'autumn') {
            for (var i in GrassArr) {
                GrassArr[i].mul();
            }
        }
    }
    if (GrassEaterArr[0] !== undefined) {
        for (var i in GrassEaterArr) {
            GrassEaterArr[i].eat();
        }
    }
    if (PredatorArr[0] !== undefined) {
        for (var i in PredatorArr) {
            PredatorArr[i].eat();
        }
    }
    if (VirusArr[0] !== undefined) {
        for (var i in VirusArr) {
            VirusArr[i].mul();
        }
    }
    if (EnergetikArr[0] !== undefined) {
        for (var i in EnergetikArr) {
            EnergetikArr[i].mul();
        }
    }
    if (KillerArr[0] !== undefined) {
        for (var i in KillerArr) {
            KillerArr[i].eat();
        }
    }

    //! Object to send
    let sendData = {
        Matrix: Matrix,
        grassCounter: GrassArr.length,
        grassEaterCounter: GrassEaterArr.length,
        PredatorCounter: PredatorArr.length,
        VirusCounter: VirusArr.length,
        EnergetikCounter: EnergetikArr.length,
        KillerCounter: KillerArr.length,
        AssassinCounter: AssassinArr.length
    }

    //! Send data over the socket to clients who listens "data"
    io.sockets.emit("data", sendData);
}

setInterval(game, 100)

//// Add event 1

function kill1() {
    GrassArr = [];
    GrassEaterArr = [];
    PredatorArr = [];
    EnergetikArr = [];
    VirusArr = [];
    KillerArr = [];
    AssassinArr = [];


    for (var y = 0; y < Matrix.length; y++) {
        for (var x = 0; x < Matrix[y].length; x++) {
            Matrix[y][x] = 0;
        }
    }
}

//// Add event 2

function arenaCloser1() {
    for (var i in AssassinArr) {
        AssassinArr[i].eat();
    }
}
////Setting speed
function interval() {
    setInterval(arenaCloser1, 100);

}

io.on('connection', function (socket) {
    creatingObjects();
    socket.on("kill", kill1);
    socket.on("arenaCloser", arenaCloser1);
    socket.on("interval", interval);
});


////   Create static Json
var statistics = {};

setInterval(function () {
    statistics.grass = GrassArr.length;
    statistics.grassEater = GrassEaterArr.length;
    statistics.Predator = PredatorArr.length;
    statistics.Virus = VirusArr.length;
    statistics.Energetik = EnergetikArr.length;
    statistics.Killer = KillerArr.length;
    statistics.Assassin = AssassinArr.length;


    fs.writeFile("statistics.json", JSON.stringify(statistics), function () {
    })
}, 1000)