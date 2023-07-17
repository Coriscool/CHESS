import Bishop from './Bishop.js';
import {COLOUR, SIZE} from './constants.js';
import Pawn from './Pawn.js';
import Rook from './Rook.js';
import Knight from './Knight.js';
import King from './King.js';
import Queen from './Queen.js';
import CheckFinder from './CheckFinder.js';

export default class Board {

    constructor() {
        this.sizeOfSquare = SIZE / 8;
        this.tiles = this.createTiles();
        this.turn = COLOUR.WHITE;
        this.isInCheck = false;
    }

    createTiles() {
        let tiles = this.createEmptyBoard();

        for (let i = 0; i < 8; i++) { 
            tiles[i][1] = new Pawn(i, 1, COLOUR.BLACK, '♟', false);
            tiles[i][6] = new Pawn(i, 6, COLOUR.WHITE, '♙', false);
        }
        //♟♙♜♖♝♗♞♘♚♔♛♕
        tiles[0][0] = new Rook(0, 0, COLOUR.BLACK, '♜');
        tiles[7][0] = new Rook(7, 0, COLOUR.BLACK, '♜');
        tiles[0][7] = new Rook(0, 7, COLOUR.WHITE, '♖');
        tiles[7][7] = new Rook(7, 7, COLOUR.WHITE, '♖');

        tiles[2][0] = new Bishop(2, 0, COLOUR.BLACK, '♝');
        tiles[5][0] = new Bishop(5, 0, COLOUR.BLACK, '♝');
        tiles[2][7] = new Bishop(2, 7, COLOUR.WHITE, '♗');
        tiles[5][7] = new Bishop(5, 7, COLOUR.WHITE, '♗');


        tiles[1][0] = new Knight(1, 0, COLOUR.BLACK, '♞');
        tiles[6][0] = new Knight(6, 0, COLOUR.BLACK, '♞');
        tiles[1][7] = new Knight(1, 7, COLOUR.WHITE, '♘');
        tiles[6][7] = new Knight(6, 7, COLOUR.WHITE, '♘');

        tiles[4][0] = new King(4, 0, COLOUR.BLACK, '♚');
        tiles[4][7] = new King(4, 7, COLOUR.WHITE, '♔');

        tiles[3][0] = new Queen(3, 0, COLOUR.BLACK, '♛');
        tiles[3][7] = new Queen(3, 7, COLOUR.WHITE, '♕');

        return tiles;
    }
    
    createEmptyBoard() {
        let board = [];
        for (let i = 0; i < 8; i++) {
            board[i] = [];
            for (let j = 0; j < 8; j++) {
                board[i][j] = undefined;
            }
        }
        return board;
    }

    draw() {
        textAlign(CENTER, CENTER);
        textSize(80);
        rectMode(CENTER);
        for (let i = 0; i < 8; i++) {
            
            for (let j = 0; j < 8; j++) {
                const currentTile = this.tiles[i][j];
                const x =  this.getPos(i);
                const y = this.getPos(j);

                if ((i + j) % 2 != 0) {
                    push();
                    fill(181,136,99);
                    rect(x, y, this.sizeOfSquare, this.sizeOfSquare);
                    pop();
                } else {
                    push();
                    fill(240,217,181);
                    rect(x, y, this.sizeOfSquare, this.sizeOfSquare);
                    pop();
                }
                if (currentTile)  {
                    currentTile.draw(x, y);
                }
            }
        }
        this.displaySelected();
        if (this.isInCheck) {
            let moves = CheckFinder.findMovesForCheckedPlayer(this.tiles, this.turn);
            if (moves.length === 0) {
                console.log('Checkmate');
                fill(10,10,10);
                textFont('Arial');
                text('Checkmate',400,400,500,500);
                noLoop();
            }
        }
    }

    displaySelected() {
        if (this.selected) {
            const tile = this.tiles[this.selected.x][this.selected.y];
            if (tile) {
                push();
                fill(118,115,115,170);

                for (const move of this.legalMoves) {
                    push();
                    noStroke();
                    //rect(this.getPos(move.x), this.getPos(move.y), this.sizeOfSquare, this.sizeOfSquare);
                    circle(this.getPos(move.x), this.getPos(move.y), this.sizeOfSquare/4);
                    pop();
                }
                pop(); 
            }
        }
    }

    getPos(index) {
        let offset = this.sizeOfSquare/2;
        return index * this.sizeOfSquare + offset;
    }

    userClick(clientX, clientY) {
        const x = Math.floor(clientX / 100);
        const y = Math.floor(clientY / 100);
        if(this.turn === COLOUR.WHITE){
            this.select(x, y);
        }
        if(this.turn === COLOUR.BLACK){
            let willem = [];
            // let randomXValue = undefined;
            // let randomYValue = undefined;
            for(let i = 0; i<8; i++){
                for(let j = 0; j<8; j++){
                    if (this.tiles[i][j] != undefined && this.tiles[i][j].colour == COLOUR.BLACK){
                        willem.push({i,j});
                        console.log(willem);
                        console.log('hi');
                    }
                }
            }
            let a = willem[int(random(0,willem.length))];
            let c = round(random(0,7));
            let d = round(random(0,7));
            console.log(this.tiles);
            this.move(this.tiles[a.i][a.j], {x: c, y: d});
        }
    }

    select(x, y) {
        if (this.isOffBoard(x, y) ) {
            this.selected = undefined;
        } 
         //else if(this.tiles[x][y] && this.tiles[x][y].colour === this.turn && this.turn === COLOUR.BLACK){
        //     //console.log('hi');
               //this.selected = JSON.parse(JSON.stringify(this.tiles[0][0]));
             //this.makemoveforblack;
         //} 
        else if (this.tiles[x][y] && this.tiles[x][y].colour === this.turn) {
            this.selected = JSON.parse(JSON.stringify(this.tiles[x][y]));
            //this.selected = this.tiles[x][y];
            this.legalMoves = this.tiles[this.selected.x][this.selected.y].findLegalMoves(this.tiles);
        } 
        else if (this.selected) {
            const potentialMove = this.legalMoves.find(e => e.x == x && e.y == y);
            if (potentialMove) {
                this.move(this.selected, potentialMove);
            } else {
                this.selected = undefined;
            }
        } 
    }

    move(from, to) {
        for(let i = 0; i<8; i++){
            for(let j = 0; j<8; j++){
                if (this.tiles[i][j] != undefined){
                    if (this.tiles[i][j].sprite == '♟') {
                        if (this.tiles[i][j].flag && to.y == j-1) {
                            this.tiles[i][j] = undefined;
                            continue;
                        }
                        this.tiles[i][j].flag = false;
                    }
                    if (this.tiles[i][j].sprite == '♙') {
                        if (this.tiles[i][j].flag && to.y == j+1) {
                            this.tiles[i][j] = undefined;
                            continue;
                        }
                        this.tiles[i][j].flag = false;
                    }
                }
            }
        }
        if ((from.y - to.y == 2 || from.y - to.y == -2) && (from.sprite == '♟' || from.sprite == '♙')) {      
            this.tiles[from.x][from.y].flag = true;   
        }
        this.turn = this.turn === COLOUR.WHITE ? COLOUR.BLACK : COLOUR.WHITE;
        this.tiles[from.x][from.y].userMove(to.x, to.y, this.tiles);
        this.selected = undefined;

        this.isInCheck = CheckFinder.isCurrentPlayerInCheck(this.tiles, this.turn);

        if (this.isInCheck) {
            let moves = CheckFinder.findMovesForCheckedPlayer(this.tiles, this.turn);
            if (moves.length === 0) {
                fill(10,10,10);
                textFont('Arial');
                text('Checkmate',400,400,50,50);
                noLoop();
            }
        }
    }


    isOffBoard(x, y) {
        return x > 7 || x < 0 || y > 7 || y < 0;
    }

    makemoveforblack(values) {
        this.selected = JSON.parse(JSON.stringify(this.tiles[0][0]));
        console.log(this.tiles);
        this.tiles = [0][0];
        this.legalMoves = this.tiles[0][0].findLegalMoves(this.tiles);
        //this.legalMoves = this.tiles[this.selected.x][this.selected.y].findLegalMoves(this.tiles);
        //this.moves = this.tiles[1][1].findLegalMoves(this.tiles);
        this.tiles[0][0].userMove(2, 2, this.tiles);
    }


}