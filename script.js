var socket = io();

//! Setup function fires automatically
function setup() {
    var weath = 'winter'

    var side = 30;

    var Matrix = [];

    //! Getting DOM objects (HTML elements)
    let grassCountElement = document.getElementById('grassCount');
    let grassEaterCountElement = document.getElementById('grassEaterCount');

    //! adding socket listener on "data" <-- name, after that fire 'drawCreatures' function 

    socket.on("data", drawCreatures);
    socket.on("weather", function (data) {
        weath = data;
    })
    function drawCreatures(data) {
        //! after getting data pass it to Matrix variable
        Matrix = data.Matrix;
        grassCountElement.innerText = data.grassCounter;
        //! Every time it creates new Canvas woth new Matrix size
        createCanvas(Matrix[0].length * side, Matrix.length * side)
        //! clearing background by setting it to new grey color
        background('#acacac');
        //! Draw grassCount and grassEaterCount to HTML (use DOM objects to update information, yes, and use .innerText <- function)

        //! Drawing and coloring RECTs
        for (var i = 0; i < Matrix.length; i++) {
            for (var j = 0; j < Matrix[i].length; j++) {
                if (Matrix[i][j] == 1) {
                    if (weath == "spring") {
                        fill("green")
                    }
                    else if (weath == "summer") {
                        fill("black");
                    }
                    else if (weath == "winter") {
                        fill("white")
                    }
                    else if (weath == "autumn") {
                        fill("#4dffa6")
                    }
                    rect(j * side, i * side, side, side);
                } else if (Matrix[i][j] == 2) {
                    fill("orange");
                    rect(j * side, i * side, side, side);
                } else if (Matrix[i][j] == 0) {
                    fill('#acacac');
                    rect(j * side, i * side, side, side);
                } else if (Matrix[i][j] == 3) {
                    fill('red');
                    rect(j * side, i * side, side, side);
                } else if (Matrix[i][j] == 4) {
                    fill('blue');
                    rect(j * side, i * side, side, side);
                } else if (Matrix[i][j] == 5) {
                    fill('yellow');
                    rect(j * side, i * side, side, side);
                }
            }
        }
    }
}

function kill() {
    socket.emit("kill")
}