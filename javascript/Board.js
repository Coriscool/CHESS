import Bishop from "./Bishop.js";
import { COLOUR, SIZE } from "./constants.js";
import Pawn from "./Pawn.js";
import Rook from "./Rook.js";
import Knight from "./Knight.js";
import King from "./King.js";
import Queen from "./Queen.js";
import CheckFinder from "./CheckFinder.js";
import Pieces from "./constants.js";


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
            tiles[i][1] = new Pawn(i, 1, COLOUR.BLACK, Pieces.BPawn, false
            );
            tiles[i][6] = new Pawn(i, 6, COLOUR.WHITE, Pieces.WPawn, false
            );
        }
        //♟♙♜♖♝♗♞♘♚♔♛♕

        tiles[0][0] = new Rook(0, 0, COLOUR.BLACK, Pieces.BRook);
        tiles[7][0] = new Rook(7, 0, COLOUR.BLACK, Pieces.BRook);
        tiles[0][7] = new Rook(0, 7, COLOUR.WHITE, Pieces.WRook);
        tiles[7][7] = new Rook(7, 7, COLOUR.WHITE, Pieces.WRook);

        tiles[2][0] = new Bishop(2, 0, COLOUR.BLACK, Pieces.BBishop);
        tiles[5][0] = new Bishop(5, 0, COLOUR.BLACK, Pieces.BBishop);
        tiles[2][7] = new Bishop(2, 7, COLOUR.WHITE, Pieces.WBishop);
        tiles[5][7] = new Bishop(5, 7, COLOUR.WHITE, Pieces.WBishop);

        tiles[1][0] = new Knight(1, 0, COLOUR.BLACK, Pieces.BKnight);
        tiles[6][0] = new Knight(6, 0, COLOUR.BLACK, Pieces.BKnight);
        tiles[1][7] = new Knight(1, 7, COLOUR.WHITE, Pieces.WKnight);
        tiles[6][7] = new Knight(6, 7, COLOUR.WHITE, Pieces.WKnight);

        tiles[4][0] = new King(4, 0, COLOUR.BLACK, Pieces.BKing);
        tiles[4][7] = new King(4, 7, COLOUR.WHITE, Pieces.WKing);

        tiles[3][0] = new Queen(3, 0, COLOUR.BLACK, Pieces.BQueen);
        tiles[3][7] = new Queen(3, 7, COLOUR.WHITE, Pieces.WQueen);

        return tiles;
    }

    createEmptyBoard() {
        let board = [];
        for (let i = 0; i < 8; i++) {
            board[i] = [];
            for (let j = 0; j < 8; j++) {
                //board[i][j] = new this.createEmptyBoard();
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
                const x = this.getPos(i);
                const y = this.getPos(j);

                if ((i + j) % 2 != 0) {
                    push();
                    fill(181, 136, 99);
                    rect(x, y, this.sizeOfSquare, this.sizeOfSquare);
                    pop();
                } else {
                    push();
                    fill(240, 217, 181);
                    rect(x, y, this.sizeOfSquare, this.sizeOfSquare);
                    pop();
                }
                if(currentTile) {
                    currentTile.draw(x, y);
                }
                // if (currentTile.type != Pieces.Empty) {
                //     currentTile.draw(x, y);
                // }
            }
        }
        this.displaySelected();
        if (this.isInCheck) {
            let moves = CheckFinder.findMovesForCheckedPlayer(
                this.tiles,
                this.turn
            );
            if (moves.length === 0) {
                console.log("Checkmate");
                fill(10, 10, 10);
                textFont("Arial");
                text("Checkmate", 400, 400, 500, 500);
                noLoop();
            }
        }
    }

    displaySelected() {
        if (this.selected) {
            const tile = this.tiles[this.selected.x][this.selected.y];
            if (tile) {
                push();
                fill(118, 115, 115, 170);

                for (const move of this.legalMoves) {
                    push();
                    noStroke();
                    circle(
                        this.getPos(move.x),
                        this.getPos(move.y),
                        this.sizeOfSquare / 4
                    );
                    pop();
                }
                pop();
            }
        }
    }

    getPos(index) {
        let offset = this.sizeOfSquare / 2;
        return index * this.sizeOfSquare + offset;
    }

    userClick(clientX, clientY) {
        const x = Math.floor(clientX / 100);
        const y = Math.floor(clientY / 100);
        if (this.tiles[y][x] != undefined) {
            this.select(x, y);
        }
    }

    select(x, y) {
        if (this.isOffBoard(x, y)) {
            this.selected = undefined;
        } else if (this.tiles[x][y] && this.tiles[x][y].colour === this.turn) {
            this.selected = JSON.parse(JSON.stringify(this.tiles[x][y]));
            this.legalMoves = this.tiles[this.selected.x][
                this.selected.y
            ].findLegalMoves(this.tiles);
        } else if (this.selected) {
            const potentialMove = this.legalMoves.find(
                (e) => e.x == x && e.y == y
            );
            if (potentialMove) {
                this.movePiece(this.selected, potentialMove);
            } else {
                this.selected = undefined;
            }
        }
    }

    movePiece(from, to) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.tiles[i][j] != undefined && this.tiles[i][j].type == Pieces.BPawn) {
                    if (this.tiles[i][j].flag && to.y == j - 1) {
                        this.tiles[i][j] = undefined;
                        continue;
                    }
                    this.tiles[i][j].flag = false;
                }
                if (this.tiles[i][j] != undefined && this.tiles[i][j].type == Pieces.WPawn) {
                    if (this.tiles[i][j].flag && to.y == j + 1) {
                        this.tiles[i][j] = undefined;
                        continue;
                    }
                    this.tiles[i][j].flag = false;
                }
            }
        }
        if (
            (from.y - to.y == 2 || from.y - to.y == -2) &&
            (from.type == Pieces.BPawn || from.type == Pieces.WPawn)
        ) {
            this.tiles[from.x][from.y].flag = true;
        }
        this.turn = this.turn === COLOUR.WHITE ? COLOUR.BLACK : COLOUR.WHITE;
        this.tiles[from.x][from.y].userMove(to.x, to.y, this.tiles);
        this.selected = undefined;

        this.isInCheck = CheckFinder.isCurrentPlayerInCheck(
            this.tiles,
            this.turn
        );

        if (this.isInCheck) {
            let moves = CheckFinder.findMovesForCheckedPlayer(
                this.tiles,
                this.turn
            );
            if (moves.length === 0) {
                fill(10, 10, 10);
                textFont("Arial");
                text("Checkmate", 400, 400, 50, 50);
                noLoop();
            }
        }
    }



    isOffBoard(x, y) {
        return x > 7 || x < 0 || y > 7 || y < 0;
    }
}
