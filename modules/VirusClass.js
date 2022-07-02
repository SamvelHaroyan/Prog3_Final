var LivingCreature = require("./LivingCreature.js");
var random = require("./random.js");


module.exports = class Virus extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.directions.push([this.x, this.y]);
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }

    mul() {
        this.multiply++;
        var Mul1 = this.chooseCell(0);
        var Mul2 = this.chooseCell(1);
        var CellsForMul = Mul1.concat(Mul2);
        var MulCell = random(CellsForMul);
        if (MulCell && this.multiply >= 10) {
            var newX = MulCell[0];
            var newY = MulCell[1];
            Matrix[newY][newX] = 4;
            var newVirus = new Virus(newX, newY);
            VirusArr.push(newVirus);
            this.multiply = 0;
        }
    }
} 