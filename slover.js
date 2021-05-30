class slover {
    slover(b) {
        //boarder 
        this.b = b;
    }

    sloveOne() {
        //first block the mines
        if (this.sloveMine()) return;
        //and then click safe cell
        if (this.sloveSafe()) return;
        //can't do it?? slove it in the hard way
        this.oneContainOne();
    }

    sloveMine() {
        for (let i = 0; i < b.w; i++)
            for (let j = 0; j < b.h; j++) {
                if (b.grid[i][j].probability.length != 0) {
                    let max = Math.max(...b.grid[i][j].probability);
                    if (max == 1.0 && !b.grid[i][j].block) {
                        console.log("block", b.grid[i][j].probability + " with index: " + i, j);
                        b.block(i, j);
                        return true;
                    }
                }
            }
        return false;
    }

    sloveSafe() {
        for (let i = 0; i < b.w; i++)
            for (let j = 0; j < b.h; j++) {
                if (b.grid[i][j].probability.length != 0) {
                    let min = Math.min(...b.grid[i][j].probability);
                    if (min == 0 && !b.grid[i][j].clicked) {
                        console.log("click", b.grid[i][j].probability + " with index: " + i, j);
                        b.click(i, j);
                        return true;
                    }
                }
            }
        return false;
    }


    oneContainOne() {
        for (let i = 0; i < b.w; i++)
            for (let j = 0; j < b.h; j++) {
                let c1 = b.grid[i][j];
                //check if cell has a 1 remain and clicked
                if (c1.clicked && c1.minesRemain == 1) {
                    //get c1 neighbors
                    let cn1 = b.getCellsAround(c1, 2, true);
                    //check if neighbor has a 1 remain
                    for (let ii = 0; ii < cn1.length; ii++) {
                        if (cn1[ii].minesRemain == 1) {
                            let c2 = cn1[ii];
                            if (c2.clicked && c2.minesRemain == 1)
                                if (this.contain(c1, c2)) {
                                    let cs = this.getUncross(c1, c2);
                                    for (let iii = 0; iii < cs.length; iii++) {
                                        b.click(cs[iii].Xindex, cs[iii].Yindex);
                                    }
                                }
                        }
                    }
                }
            }
    }

    //first cell contain second cell
    contain(c1, c2) {
        if (!b.equal(c1, c2)) {
            let cn1 = b.getCellsAround(c1, 1, false);
            let cn2 = b.getCellsAround(c2, 1, false);

            return cn2.every(el => cn1.indexOf(el) >= 0)
        }
        return false;
    }

    // getCross(c1, c2) {
    //     let temp = [];
    //     temp.push(...b.getCellsAround(c1, 1, false));
    //     temp.push(...b.getCellsAround(c2, 1, false));
    //     let cross = [];

    //     for (let i = 0; i < temp.length; i++)
    //         for (let j = i + 1; j < temp.length; j++) {
    //             if (b.equal(temp[i], temp[j])) {
    //                 cross.push(temp[i]);
    //             }
    //         }
    //     return cross;
    // }

    getUncross(c1, c2) {
        let temp = [];
        temp.push(...b.getCellsAround(c1, 1, false));
        temp.push(...b.getCellsAround(c2, 1, false));
        let unCross = [];

        for (let i = 0; i < temp.length; i++) {
            let ex = false;
            for (let j = 0; j < temp.length; j++) {
                if (i != j)
                    if (b.equal(temp[i], temp[j])) {
                        ex = true;
                    }
            }
            if (!ex) {
                unCross.push(temp[i]);
            }
        }
        return unCross;
    }
}