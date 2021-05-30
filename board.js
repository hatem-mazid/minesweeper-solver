class board {
    constructor(w, h, m, cs) {
        // w * h cells
        this.w = w;
        this.h = h;

        //mines count
        this.mines = m;

        //cell size
        this.cellSize = cs;

        //setup the grid
        this.grid = [];

        //count of clicked safe cells
        this.covered = this.w * this.h - this.mines;

        //board status
        //0 loss
        //1 win
        //2 playing
        this.status = 2;
        this.firstClick = true;

        //board poisition
        this.boardX = 0;
        this.boardY = 0;

        //cells setup 
        for (let i = 0; i < this.w; i++) {
            this.grid.push([])
            for (let j = 0; j < this.h; j++) {
                this.grid[i].push(new cell(i * this.cellSize, j * this.cellSize, this.cellSize));
                this.grid[i][j].Xindex = i;
                this.grid[i][j].Yindex = j;
            }
        }
    }
    distripute(x1, y1) {

        // mines distripute
        for (let i = 0; i < mines;) {
            let x = floor(random(0, this.w));
            let y = floor(random(0, this.h));

            if (!this.grid[x][y].mine &&
                //first click safe (with marker 0)
                (x != x1 - 1 || y != y1 - 1) &&
                (x != x1 - 1 || y != y1) &&
                (x != x1 - 1 || y != y1 + 1) &&
                (x != x1 || y != y1 - 1) &&
                (x != x1 || y != y1) &&
                (x != x1 || y != y1 + 1) &&
                (x != x1 + 1 || y != y1 - 1) &&
                (x != x1 + 1 || y != y1) &&
                (x != x1 + 1 || y != y1 + 1)

            ) {
                this.grid[x][y].setAsMine();
                i++;
            }
        }
        //marker setup
        for (let i = 0; i < this.w; i++)
            for (let j = 0; j < this.h; j++) {
                if (!this.grid[i][j].mine) {
                    let b = this.getCellsAround(this.grid[i][j], 1, true);

                    for (let ii = 0; ii < b.length; ii++) {
                        if (b[ii].mine) {
                            this.grid[i][j].marker++;
                        }
                    }
                    this.grid[i][j].minesRemain = this.grid[i][j].marker;
                }
            }
    }
    display() {
        translate(this.boardX, this.boardY);
        //loss
        if (this.status == 0) {
            background(255, 0, 0);
            this.showAll();

            fill(255, 0, 0);
            textSize(72);
            text("YOU LOSS!!", width / 2, height / 2);
        }
        //win
        else if (this.status == 1) {
            background(255);
            this.showAll();

            fill(0);
            textSize(72);
            text("YOU WIN!!", width / 2, height / 2);
        }
        //playing
        else if (this.status == 2) {

            for (let i = 0; i < this.w; i++)
                for (let j = 0; j < this.h; j++) {
                    this.grid[i][j].display();
                }
        }
    }

    click(x, y) {
        if (this.firstClick) {
            this.distripute(x, y);
            this.firstClick = false;
        }
        //not out of board
        //not clicked
        //not blocked
        if (x >= 0 && x < this.w &&
            y >= 0 && y < this.h &&
            !this.grid[x][y].clicked && !this.grid[x][y].block)
        //check if its not mine
            if (!this.grid[x][y].mine) {
                //click !!
                this.grid[x][y].click();
                //reduce covered
                this.covered--;
                //check if win
                if (this.covered == 0) this.status = 1;

                //if cell is empty (marker == 0)
                //click all neighbors
                if (this.grid[x][y].marker == 0) {
                    let b = this.getCellsAround(this.grid[x][y], 1, true);
                    for (let ii = 0; ii < b.length; ii++) {
                        this.click(b[ii].Xindex, b[ii].Yindex);
                    }
                }
            }
            //if clicked was mine LOSS!!
            else this.status = 0;


        this.setProbability();
    }

    block(i, j) {
        //not out of board
        //not clicked
        if (i >= 0 && j < this.w &&
            i >= 0 && j < this.h &&
            !this.grid[i][j].clicked) {
            //reverse block state
            this.grid[i][j].block = !this.grid[i][j].block;


            let around = this.getCellsAround(this.grid[i][j], 1, true);
            if (this.grid[i][j].block) {
                for (let ii = 0; ii < around.length; ii++) {
                    if (around[ii].marker > 0) {
                        around[ii].minesRemain--;
                    }
                }
            }
            if (!this.grid[i][j].block) {
                for (let ii = 0; ii < around.length; ii++) {
                    if (around[ii].marker > 0) {
                        around[ii].minesRemain++;
                    }
                }
            }

            this.setProbability();
        }
    }

    showAll() {
        //show all cell
        //only in loss or win
        for (let i = 0; i < this.w; i++)
            for (let j = 0; j < this.h; j++) {
                this.grid[i][j].clicked = true;
                this.grid[i][j].display();
            }
    }

    setProbability() {
        //clear all probability 
        for (let i = 0; i < b.w; i++)
            for (let j = 0; j < b.h; j++) {
                b.grid[i][j].probability = [];
            }
        for (let i = 0; i < b.w; i++)
            for (let j = 0; j < b.h; j++) {
                let c = b.grid[i][j];

                //get clicked markers 
                if (c.marker > 0 && c.clicked) {
                    //get only non clicked and non blocked nieghbors
                    let around = b.getCellsAround(c, 1, false);

                    //set the probabilities
                    for (let p = 0; p < around.length; p++) {
                        around[p].probability.push((float)(c.minesRemain) / around.length);
                    }
                }
            }
    }

    getCellsAround(c, step, clicked) {
        let around = [];
        let i = c.Xindex;
        let j = c.Yindex;
        //clicked
        //true: get all
        //false : get non clicked and non blocked
        for (let i1 = -step; i1 <= step; i1++)
            for (let j1 = -step; j1 <= step; j1++) {
                //not cell it self
                if (!(i1 == 0 && j1 == 0)) {
                    //not out of index
                    if (i + i1 >= 0 && j + j1 >= 0 &&
                        i + i1 < this.w && j + j1 < this.h)
                    //want clicked??
                        if (!clicked) {
                            //chick if not clicked and not blocked
                            if (!this.grid[i + i1][j + j1].clicked && !this.grid[i + i1][j + j1].block)
                                around.push(this.grid[i + i1][j + j1]);
                        }
                        //no??
                        else
                            around.push(this.grid[i + i1][j + j1]);
                }
            }
        return around;
    }

    //compair two cell
    equal(c1, c2) {
        return c1.Xindex == c2.Xindex && c1.Yindex == c2.Yindex;
    }
}