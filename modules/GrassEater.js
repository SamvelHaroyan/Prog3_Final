var LivingCreature = require("./LivingCreature");
var Killer = require("./KillerClass");
// var Energetik = require("./EnergetikClass");
var random = require("./random.js");



module.exports = class GrassEater extends LivingCreature {
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

    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            Matrix[y][x] = 2;
            // Matrix[newCell[1]][newCell[0]]=2
            let grassEater = new GrassEater(x, y);
            GrassEaterArr.push(grassEater);
            this.energy = 8;
        }
    }
    
    eat() {
        var greenCells = this.chooseCell(1);
        let EatenGreenCell = random(greenCells)
        var EnergetikCells = this.chooseCell(5);
        let EatenEnergetikCell = random(EnergetikCells)

        if (EatenEnergetikCell) {
            Matrix[this.y][this.x] = 0;
            this.x = EatenEnergetikCell[0];
            this.y = EatenEnergetikCell[1];

            for (let index1 = 0; index1 < EnergetikArr.length; index1++) {
                if (EnergetikArr[index1].x == this.x && EnergetikArr[index1].y == this.y) {
                    //removing eaten element
                    EnergetikArr.splice(index1, 1);
                    Matrix[this.y][this.x] = 2;
                    break;
                }
            }

            for (let index1 = 0; index1 < GrassEaterArr.length; index1++) {
                if (GrassEaterArr[index1].x == this.x && GrassEaterArr[index1].y == this.y) {
                    //removing eaten element
                    Matrix[this.y][this.x] = 6;
                    GrassEaterArr.splice(index1, 1);
                    var KillerElement = new Killer(this.x, this.y);
                    KillerArr.push(KillerElement);
                    break;
                }
            }
        }
        else if (EatenGreenCell) {
            Matrix[this.y][this.x] = 0;
            this.x = EatenGreenCell[0];
            this.y = EatenGreenCell[1];
            //Change eaten cell colour to yellow = 2
            Matrix[this.y][this.x] = 2;
            this.energy++;

            for (let index = 0; index < GrassArr.length; index++) {
                if (GrassArr[index].x == this.x && GrassArr[index].y == this.y) {
                    //removing eaten element
                    GrassArr.splice(index, 1);
                    break;
                }
            }
            //Yellow multiply
            if (this.energy > 20) {
                this.mul()
            }
        }
        else {
            this.move();
        }
    }


    move() {
        this.energy -= 2;
        let emptyCells = this.chooseCell(0);
        let newCell = random(emptyCells);

        if (newCell) {
            let x = newCell[0];
            let y = newCell[1];
            Matrix[y][x] = 2;
            Matrix[this.y][this.x] = 0;
            this.y = y;
            this.x = x;
        }
        if (this.energy < 0) {
            this.die();
        }
    }
    die() {
        Matrix[this.y][this.x] = 0;

        for (let i in GrassEaterArr) {
            if (GrassEaterArr[i].x == this.x && GrassEaterArr[i].y == this.y) {
                GrassEaterArr.splice(i, 1)
            }
        }
    }
}