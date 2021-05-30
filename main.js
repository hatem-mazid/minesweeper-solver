let b;
let s;

//play setting
let wid = 20;
let hei = 20;
let mines = 70;
let cellSize = 25;
let boardX = 0;
let boardY = 0;

function setup() {
    createCanvas(500, 500);

    console.log("mines ratio: " + mines / (wid * hei) * 100 + "%")

    b = new board(wid, hei, mines, cellSize);
    b.boardX = boardX;
    b.boardY = boardY;
    s = new slover(b);

    this.oncontextmenu = function(e) {
        e.preventDefault();
    };

    display();

}

function display() {
    background(200);
    b.display();
}

function draw() {
    background(200);

    if (keyIsDown(65)) {
        s.sloveOne();
    }
    b.display();
}

//control section

function keyPressed() {
    if (key == 'r' || key == 'R') {
        b = new board(wid, hei, mines, cellSize);
        s = new slover(b);
        b.boardX = boardX;
        b.boardY = boardY;
    }
    display();
}

function mousePressed(e) {
    if (b.status == 2) {
        let s = b.grid[0][0].size;
        if (mouseX < (b.w * s) + boardX && mouseY < (b.h * s) + boardY &&
            mouseX > boardX && mouseY > boardY) {
            let x = floor((mouseX - boardX) / s);
            let y = floor((mouseY - boardY) / s);
            if (mouseButton == LEFT) {
                b.click(x, y);
            } else if (mouseButton == RIGHT) {
                b.block(x, y);
            }
        }
    }

    display();
}

function doubleClicked(event) {
    let s = b.cellSize;
    if (mouseX < (b.w * s) + boardX && mouseY < (b.h * s) + boardY &&
        mouseX > boardX && mouseY > boardY) {
        let x = floor((mouseX - boardX) / s);
        let y = floor((mouseY - boardY) / s);
        if (mouseButton == LEFT) {
            b.click(x - 1, y - 1);
            b.click(x, y - 1);
            b.click(x + 1, y - 1);
            b.click(x - 1, y);
            b.click(x + 1, y);
            b.click(x - 1, y + 1);
            b.click(x, y + 1);
            b.click(x + 1, y + 1);
        }
    }
    display();
}