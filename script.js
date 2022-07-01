var socket = io();

//! Setup function fires automatically
function setup() {
    var weath = 'winter'
    var side = 15;
    var Matrix = [];
    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');
    let PredatorCountElement = document.getElementById('PredatorCount');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);
    socket.on("weather", function (data) {
        weath = data;
    })
    function drawCreatures(data) {
        //! after getting data pass it to Matrix variable
        Matrix = data.Matrix;
        grassCountElement.innerText = data.grassCounter;
        grassEaterCountElement.innerText = data.grassEaterCounter;
        PredatorCountElement.innerText = data.PredatorCounter;


        createCanvas(Matrix[0].length * side, Matrix.length * side)
        background('#acacac');

        for (var i = 0; i < Matrix.length; i++) {
            for (var j = 0; j < Matrix[i].length; j++) {
                if (Matrix[i][j] == 1) {
                    if (weath == "spring") {
                        fill("lime")
                    }
                    else if (weath == "summer") {
                        fill("green");
                    }
                    else if (weath == "winter") {
                        fill("white")
                    }
                    else if (weath == "autumn") {
                        fill("braun")
                    }
                } 
                else if (Matrix[i][j] == 2) {
                    fill("yellow");
                } 
                else if (Matrix[i][j] == 0) {
                    fill('#acacac');
                } 
                else if (Matrix[i][j] == 3) {
                    fill('red');
                } 
                else if (Matrix[i][j] == 4) {
                    fill('blue');
                } 
                else if (Matrix[i][j] == 5) {
                    fill('black');
                }
                else if (Matrix[i][j] == 6) {
                    fill("orange");
                }
                else if (Matrix[i][j] == 7) {
                    fill("aqua");
                }
                rect(j * side, i * side, side, side);
            }
        }
    }
}

function kill() {
    socket.emit("kill")
}
function arenaCloser() {
    socket.emit("arenaCloser")
}