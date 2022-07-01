var LivingCreature = require("./LivingCreature.js");
var random = require("./random.js");


module.exports = class Predator extends LivingCreature {
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
        this.energy -= 1
        var emptyCells = this.chooseCell(0);
        var newCell = random(emptyCells);
        var emptyGreenCells = this.chooseCell(1);
        var newGreenCell = random(emptyGreenCells);

        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            Matrix[newY][newX] = Matrix[this.y][this.x]
            Matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        } else if (newGreenCell && this.energy >= 0) {
            var newX = newGreenCell[0];
            var newY = newGreenCell[1];
            Matrix[newY][newX] = Matrix[this.y][this.x]
            Matrix[this.y][this.x] = 1
            this.x = newX
            this.y = newY
        } else {
            this.die()
        }
    }
    eat() {
        var yellowCells = this.chooseCell(2);
        let newCell = random(yellowCells)
        var blueCells = this.chooseCell(4);
        let newBlueCell = random(blueCells)

        if (newCell) {
            Matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            Matrix[this.y][this.x] = 3;
            this.energy += 4;

            for (let index = 0; index < GrassEaterArr.length; index++) {
                if (GrassEaterArr[index].x == this.x && GrassEaterArr[index].y == this.y) {
                    GrassEaterArr.splice(index, 1);
                    break;
                }
            }
        } else if (newBlueCell) {

            Matrix[this.y][this.x] = 0;
            this.x = newBlueCell[0];
            this.y = newBlueCell[1];
            Matrix[this.y][this.x] = 3;

            for (let index1 = 0; index1 < GribArr.length; index1++) {
                if (GribArr[index1].x == this.x && GribArr[index1].y == this.y) {
                    GribArr.splice(index1, 1);
                    this.energy += 6;
                    break;
                }
            }
        }
        else {
            this.move();
        }
        if (this.energy > 30) {
            this.mul()
        }
    }
    mul() {
        var emptyCells = this.chooseCell(0);
        var emptyCellsGreen = this.chooseCell(1);
        var AllEmptyCells = emptyCells.concat(emptyCellsGreen);
        var PredatorNew = random(AllEmptyCells);

        if (PredatorNew) {
            Matrix[PredatorNew[1]][PredatorNew[0]] = 3;
            var PredatorNew = new Predator(PredatorNew[0], PredatorNew[1]);
            PredatorArr.push(PredatorNew);
        }
    }
    die() {
        Matrix[this.y][this.x] = 0;
        for (let index = 0; index < PredatorArr.length; index++) {
            if (PredatorArr[index].x == this.x && PredatorArr[index].y == this.y) {
                PredatorArr.splice(index, 1);
                break;
            }
        }
    }
}
