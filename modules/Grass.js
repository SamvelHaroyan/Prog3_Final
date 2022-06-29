var LiveForm = require("./LiveForm.js");
var random = require("./random.js");


module.exports = class Grass extends LiveForm {
    constructor(x, y) {
        super(x, y);
    }

    // getNewCoordinates() {
    //     this.directions = [
    //         [this.x - 1, this.y - 1],
    //         [this.x, this.y - 1],
    //         [this.x + 1, this.y - 1],
    //         [this.x - 1, this.y],
    //         [this.x + 1, this.y],
    //         [this.x - 1, this.y + 1],
    //         [this.x, this.y + 1],
    //         [this.x + 1, this.y + 1]
    //     ];
    // }
    // chooseCell(character) {
    //     this.getNewCoordinates();
    //     return super.chooseCell(character);
    // }

    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.multiply >= 2) {
            let x = newCell[0];
            let y = newCell[1];
            Matrix[y][x] = 1;

            let grass = new Grass(x, y);
            grassArr.push(grass);
            this.multiply = 0;
        }
    }
}