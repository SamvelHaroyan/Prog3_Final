var LivingCreature = require("./LivingCreature.js");
var random = require("./random.js");


module.exports = class Grib extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.directions.push([this.x, this.y]);
    }

    mul() {
        this.multiply++;
        var Mul1 = this.chooseCell(0);
        var Mul2 = this.chooseCell(1);
        var CellsForMul = Mul1.concat(Mul2);
        var MulCell = random(CellsForMul);
        if (MulCell && this.multiply >= 3) {
            var newX = MulCell[0];
            var newY = MulCell[1];
            Matrix[newY][newX] = 4;
            var newGrib = new Grib(newX, newY);
            GribArr.push(newGrib);
            this.multiply = 0;
        }
    }
} 

//10