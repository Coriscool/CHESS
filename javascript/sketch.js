import Board from "./Board.js";
import { SIZE } from "./constants.js";
let board;

function preload (){
    Wpawn = loadImage("BBishop.png");
    Wrook = loadImage("BBishop.png");
    Wbishop = loadImage("BBishop.png");
    Wknight = loadImage("BBishop.png");
    Wqueen = loadImage("BBishop.png");
    Wking = loadImage("BBishop.png");
    Bpawn = loadImage("BBishop.png");
    Brook = loadImage("BBishop.png");
    Bbishop = loadImage("BBishop.png");
    Bknight = loadImage("BBishop.png");
    Bqueen = loadImage("BBishop.png");
    Bking = loadImage("BBishop.png");
}

window.setup = () => {
    createCanvas(SIZE, SIZE);
    board = new Board();
};

window.draw = () => {
    background(220);
    board.draw();
};

window.onclick = function (evt) {
    const x = evt.clientX;
    const y = evt.clientY;
    board.userClick(x, y); 
};
