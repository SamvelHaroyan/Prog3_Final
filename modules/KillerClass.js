var LivingCreature = require("./LivingCreature.js");
var random = require("./random.js");


module.exports = class Killer extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 20;
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

    move() {
        this.energy -= 2
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        var emptyCells1 = this.chooseCell(1);
        var GreenCell = random(emptyCells1);
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            Matrix[newY][newX] = Matrix[this.y][this.x]
            Matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else if (GreenCell && this.energy >= 0) {
            var newX = GreenCell[0];
            var newY = GreenCell[1];
            Matrix[newY][newX] = Matrix[this.y][this.x]
            Matrix[this.y][this.x] = 1
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }
    eat() {
        var RedCells = this.chooseCell(3);
        let redCell = random(RedCells)
        if (redCell) {
            Matrix[this.y][this.x] = 0;
            this.x = redCell[0];
            this.y = redCell[1];
            Matrix[this.y][this.x] = 6;

            this.energy += 5;

            for (let index = 0; index < PredatorArr.length; index++) {
                if (PredatorArr[index].x == this.x && PredatorArr[index].y == this.y) {
                    PredatorArr.splice(index, 1);
                    break;
                }
            }
            if (this.energy > 30) {
                this.mul()
            }
        }
        else {
            this.move();
        }
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var emptyCellsGreen = this.chooseCell(1);
        var AllEmptyCells = emptyCells.concat(emptyCellsGreen);
        var KillerNew = random(AllEmptyCells);

        if (KillerNew) {
            Matrix[KillerNew[1]][KillerNew[0]] = 6;
            var KillerNew = new Killer(KillerNew[0], KillerNew[1]);
            KillerArr.push(KillerNew);
        }
    }
    die() {
        Matrix[this.y][this.x] = 0;
        for (let index = 0; index < KillerArr.length; index++) {
            if (KillerArr[index].x == this.x && KillerArr[index].y == this.y) {
                KillerArr.splice(index, 1);
                break;
            }
        }
    }
}
