class cell {
    constructor(x, y, s) {
        //number who display on cell
        this.marker = 0;

        //cell status
        this.clicked = false;
        this.mine = false;
        this.block = false;

        //posision of cell
        this.pos = createVector(x, y);

        //size squere of cell 
        this.size = s;

        //slove section
        //0 safe
        //1 mine
        this.probability = [];

        //how many mine discoverd around cell
        //if marker larger than 0
        this.minesRemain;
    }

    display() {
        //fill according to status
        if (this.block) {
            fill(0, 0, 255);
        } else if (!this.clicked) {
            fill(0, 125, 125);
        } else if (this.mine) {
            fill(255, 0, 0);
        } else if (this.clicked) {
            fill(200);
        }

        //draw and alignment
        rect(this.pos.x, this.pos.y, this.size, this.size);
        textAlign(CENTER, CENTER);
        textSize(this.size / 2);
        fill(0);
        //set cell content
        if (this.marker == -1 && this.clicked) {
            text("*", this.pos.x + this.size / 2, this.pos.y + this.size / 2);
        } else if (this.clicked && this.marker != 0) {
            text(this.marker, this.pos.x + this.size / 2, this.pos.y + this.size / 2);
        } else if (!this.clicked) {
            textSize(this.size / 4);
            fill(255);
        }
    }

    click() {
        if (!this.block) {
            this.clicked = true;
        }
    }

    setAsMine() {
        this.mine = true;
        this.marker = -1;
    }
}