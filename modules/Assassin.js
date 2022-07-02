var LivingCreature = require("./LivingCreature.js");
var random = require("./random.js");


module.exports = class Assassin extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 25;
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
        this.energy--;
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
        }
        else if (newGreenCell && this.energy >= 0) {
            var newX = newGreenCell[0];
            var newY = newGreenCell[1];
            Matrix[newY][newX] = Matrix[this.y][this.x]
            Matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
        }
        else {
            this.die()
        }
    }

    eat() {
        var greenCells = this.chooseCell(1);
        let newGreenCell = random(greenCells);
        var yellowCells = this.chooseCell(2);
        let newCell = random(yellowCells);
        var redCells = this.chooseCell(3);
        let newRedCell = random(redCells);
        var blueCells = this.chooseCell(4);
        let newBlueCell = random(blueCells);
        var blackCells = this.chooseCell(5);
        let newBlackCell = random(blackCells);
        var orangeCells = this.chooseCell(6);
        let newOrangeCell = random(orangeCells);

        if (newCell) {
            Matrix[this.y][this.x] = 0;
            this.x = newCell[0];
            this.y = newCell[1];
            Matrix[this.y][this.x] = 7;
            this.energy += 4;

            for (let index = 0; index < GrassEaterArr.length; index++) {
                if (GrassEaterArr[index].x == this.x && GrassEaterArr[index].y == this.y) {
                    GrassEaterArr.splice(index, 1);
                    break;
                }
            }
        }
        else if (newBlueCell) {
            Matrix[this.y][this.x] = 0;
            this.x = newBlueCell[0];
            this.y = newBlueCell[1];
            Matrix[this.y][this.x] = 7;

            for (let index1 = 0; index1 < VirusArr.length; index1++) {
                if (VirusArr[index1].x == this.x && VirusArr[index1].y == this.y) {
                    VirusArr.splice(index1, 1);
                    this.energy += 2;
                    break;
                }
            }
        }
        else if (newRedCell) {
            Matrix[this.y][this.x] = 0;
            this.x = newRedCell[0];
            this.y = newRedCell[1];
            Matrix[this.y][this.x] = 7;

            for (let index1 = 0; index1 < PredatorArr.length; index1++) {
                if (PredatorArr[index1].x == this.x && PredatorArr[index1].y == this.y) {
                    PredatorArr.splice(index1, 1);
                    this.energy += 2;
                    break;
                }
            }
        }
        else if (newBlackCell) {
            Matrix[this.y][this.x] = 0;
            this.x = newBlackCell[0];
            this.y = newBlackCell[1];
            Matrix[this.y][this.x] = 7;

            for (let index1 = 0; index1 < EnergetikArr.length; index1++) {
                if (EnergetikArr[index1].x == this.x && EnergetikArr[index1].y == this.y) {
                    EnergetikArr.splice(index1, 1);
                    this.energy += 2;
                    break;
                }
            }
        }
        else if (newOrangeCell) {
            Matrix[this.y][this.x] = 0;
            this.x = newOrangeCell[0];
            this.y = newOrangeCell[1];
            Matrix[this.y][this.x] = 7;

            for (let index1 = 0; index1 < KillerArr.length; index1++) {
                if (KillerArr[index1].x == this.x && KillerArr[index1].y == this.y) {
                    KillerArr.splice(index1, 1);
                    this.energy += 2;
                    break;
                }
            }
        }
        else if (newGreenCell) {
            Matrix[this.y][this.x] = 0;
            this.x = newGreenCell[0];
            this.y = newGreenCell[1];
            Matrix[this.y][this.x] = 7;

            for (let index1 = 0; index1 < GrassArr.length; index1++) {
                if (GrassArr[index1].x == this.x && GrassArr[index1].y == this.y) {
                    GrassArr.splice(index1, 1);
                    this.energy += 2;
                    break;
                }
            }
        }
        if (this.energy > 30) {
            this.mul()
        }
        else {
            this.move();
        }
    }

    mul() {
        var emptyCells = this.chooseCell(0);
        var emptyCellsGreen = this.chooseCell(1);
        var AllEmptyCells = emptyCells.concat(emptyCellsGreen);
        var AssassinNew = random(AllEmptyCells);

        if (AssassinNew) {
            Matrix[AssassinNew[1]][AssassinNew[0]] = 7;
            var AssassinNew = new Assassin(AssassinNew[0], AssassinNew[1]);
            AssassinArr.push(AssassinNew);
        }
    }

    die() {
        Matrix[this.y][this.x] = 0;
        for (let index = 0; index < AssassinArr.length; index++) {
            if (AssassinArr[index].x == this.x && AssassinArr[index].y == this.y) {
                AssassinArr.splice(index, 1);
                break;
            }
        }
    }
}
