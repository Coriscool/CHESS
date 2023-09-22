import Board from "./Board.js";
import { SIZE } from "./constants.js";
let board;

// function preload (){
//     //Wpawn = loadImage("BOMB.png");
//     //Wrook = loadImage("Pixel Square Bold10.ttf");
//     //Wbishop = loadImage("digital-7.ttf");
//     //Wknight = loadImage("explosion.jpg");
//     //Wqueen = loadImage("explosion.jpg");
//     //Wking = loadImage("explosion.jpg");
//     //Bpawn = loadImage("BOMB.png");
//     //Brook = loadImage("Pixel Square Bold10.ttf");
//     Bbishop = loadImage("BBishop.png");
//     //Bknight = loadImage("explosion.jpg");
//     //Bqueen = loadImage("explosion.jpg");
//     //Bking = loadImage("explosion.jpg");
// }

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
