var LivingCreature = require("./LivingCreature.js");
var random = require("./random.js");


module.exports = class Assassin extends LivingCreature {
    constructor(x, y) {
        super(x, y);
        this.energy = 100;
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

        var redCells = this.chooseCell(3);
        let newRedCell = random(redCells)

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
        } else if (newBlueCell) {

            Matrix[this.y][this.x] = 0;
            this.x = newBlueCell[0];
            this.y = newBlueCell[1];
            Matrix[this.y][this.x] = 7;

            for (let index1 = 0; index1 < GribArr.length; index1++) {
                if (GribArr[index1].x == this.x && GribArr[index1].y == this.y) {
                    GribArr.splice(index1, 1);
                    this.energy += 6;
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
                    this.energy += 6;
                    break;
                }
            }
        }
        


        else {
            this.move();
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
