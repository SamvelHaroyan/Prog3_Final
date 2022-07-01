var LivingCreature = require("./LivingCreature.js");
var random = require("./random.js");


module.exports = class Energetik extends LivingCreature {
    constructor(x, y) {
        super(x, y);
    }
    mul() {
        this.multiply++;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell && this.multiply >= 4) {
            let x = newCell[0];
            let y = newCell[1];
            Matrix[y][x] = 5;

            let ener = new Energetik(x, y);
            EnergetikArr.push(ener);
            this.multiply = 0;
        }
    }
}

//14
