import Bishop from "./Bishop.js";
import { COLOUR, SIZE } from "./constants.js";
import Pawn from "./Pawn.js";
import Rook from "./Rook.js";
import Knight from "./Knight.js";
import King from "./King.js";
import Queen from "./Queen.js";
import CheckFinder from "./CheckFinder.js";

export default class Board {
    constructor() {
        this.sizeOfSquare = SIZE / 8;
        this.tiles = this.createTiles();
        this.turn = COLOUR.WHITE;
        this.isInCheck = false;
    }

    onClick(clientX, clientY) {
        let calculating = false;
        const x = Math.floor(clientX / 100);
        const y = Math.floor(clientY / 100);
        this.update_selected(x, y);

        if (this.turn !== COLOUR.BLACK) {
            return;
        }
        // calculating = true;
        // let currentPosition = this.tiles; unused variable
        let possibleMovables = [];
        let movesTo = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (
                    this.tiles[i][j] != undefined &&
                    this.tiles[i][j].colour == COLOUR.BLACK
                ) {
                    this.legalMoves = this.tiles[i][j].findLegalMoves(
                        this.tiles
                    );
                    if (this.legalMoves != 0) {
                        possibleMovables.push({ i, j });
                    }
                }
            }
        }

        if (possibleMovables.length === 0 && !this.isInCheck) {
            console.log("Draw by stalemate");
            fill(10, 10, 10);
            textFont("Arial");
            text("Draw by stalemate", 400, 400, 500, 500);
            noLoop();
        }

        if (possibleMovables.length === 0) {
            return;
        }

        let rngActive = true;
        let AttackingMoves = [];
        for (let c = 0; c < possibleMovables.length; c++) {
            let legalMoves = this.tiles[possibleMovables[c].i][
                possibleMovables[c].j
            ].findLegalMoves(this.tiles);

            for (let j = legalMoves.length - 1; j >= 0; j--) {
                if (
                    this.tiles[legalMoves[j].x][legalMoves[j].y] !== undefined
                ) {
                    AttackingMoves.push({
                        from: possibleMovables[c],
                        to: legalMoves[j],
                    });

                    /*console.log(
                        this.tiles[possibleMovables[c].i][possibleMovables[c].j]
                    );*/
                }
            }
        }
        // console.log(validAttackingMoves.length);
        if (AttackingMoves.length !== 0) {
            AttackingMoves = this.sortArray(AttackingMoves);
        }

        let bestMove = AttackingMoves[0];
        if (bestMove !== undefined) {
            while (calculating) {
                console.log("Dfs");
                // let valueOfAttackedSquare =
                //  this.tiles[bestMove.to.x][bestMove.to.y].value; this variable was unused
                rngActive = false;

                //HIER WORDT VOOR WHITE
                let possibleMovables2 = [];
                for (let i = 0; i < 8; i++) {
                    for (let j = 0; j < 8; j++) {
                        if (
                            this.tiles[i][j] != undefined &&
                            this.tiles[i][j].colour == COLOUR.WHITE
                        ) {
                            this.legalMoves = this.tiles[i][j].findLegalMoves(
                                this.tiles
                            );
                            if (this.legalMoves != 0) {
                                possibleMovables2.push({ i, j });
                            }
                        }
                    }
                }

                let validAttackingMoves2 = [];
                for (let c = 0; c < possibleMovables2.length; c++) {
                    let movesTo2 = this.tiles[possibleMovables2[c].i][
                        possibleMovables2[c].j
                    ].findLegalMoves(this.tiles);
                    for (let j = movesTo2.length - 1; j >= 0; j--) {
                        if (
                            this.tiles[movesTo2[j].x][movesTo2[j].y] !==
                            undefined
                        ) {
                            validAttackingMoves2.push({
                                from: possibleMovables2[c],
                                to: movesTo2[j],
                            });
                        }
                    }
                }

                //dit sorteert de array validAttackingMoves2
                validAttackingMoves2 = this.sortArray(validAttackingMoves2);
                let bestMove2 = validAttackingMoves2[0];
                if (bestMove2 != undefined) {
                    //value hieronder is van black
                    //console.log(this.tiles[bestMove2.to.x][bestMove2.to.y].value);
                    //value hieronder is van white
                    //console.log(valueOfAttackedSquare);
                    /*if (
                                this.tiles[bestMove2.to.x][bestMove2.to.y]
                                    .value <= valueOfAttackedSquare
                            ) {
                            }*/
                }
                // TOT AAN HIER
                this.move(
                    this.tiles[bestMove.from.i][bestMove.from.j],
                    bestMove.to
                );
                calculating = false;
            }
        }

        if (rngActive) {
            let a = possibleMovables[int(random(0, possibleMovables.length))];
            movesTo = this.tiles[a.i][a.j].findLegalMoves(this.tiles);
            let b = movesTo[int(random(0, movesTo.length))];
            this.move(this.tiles[a.i][a.j], b);
        }
    }

    update_selected(x, y) {
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
                this.move(this.selected, potentialMove);
            } else {
                this.selected = undefined;
            }
        }
    }

    createTiles() {
        let tiles = this.createEmptyBoard();

        for (let i = 0; i < 8; i++) {
            tiles[i][1] = new Pawn(i, 1, COLOUR.BLACK, "♟", -1, false);
            tiles[i][6] = new Pawn(i, 6, COLOUR.WHITE, "♙", 1, false);
        }
        //♟♙♜♖♝♗♞♘♚♔♛♕
        tiles[0][0] = new Rook(0, 0, COLOUR.BLACK, "♜", -5);
        tiles[7][0] = new Rook(7, 0, COLOUR.BLACK, "♜", -5);
        tiles[0][7] = new Rook(0, 7, COLOUR.WHITE, "♖", 5);
        tiles[7][7] = new Rook(7, 7, COLOUR.WHITE, "♖", 5);

        tiles[2][0] = new Bishop(2, 0, COLOUR.BLACK, "♝", -3);
        tiles[5][0] = new Bishop(5, 0, COLOUR.BLACK, "♝", -3);
        tiles[2][7] = new Bishop(2, 7, COLOUR.WHITE, "♗", 3);
        tiles[5][7] = new Bishop(5, 7, COLOUR.WHITE, "♗", 3);

        tiles[1][0] = new Knight(1, 0, COLOUR.BLACK, "♞", -3);
        tiles[6][0] = new Knight(6, 0, COLOUR.BLACK, "♞", -3);
        tiles[1][7] = new Knight(1, 7, COLOUR.WHITE, "♘", 3);
        tiles[6][7] = new Knight(6, 7, COLOUR.WHITE, "♘", 3);

        tiles[4][0] = new King(4, 0, COLOUR.BLACK, "♚", -900);
        tiles[4][7] = new King(4, 7, COLOUR.WHITE, "♔", 900);

        tiles[3][0] = new Queen(3, 0, COLOUR.BLACK, "♛", -10);
        tiles[3][7] = new Queen(3, 7, COLOUR.WHITE, "♕", 10);

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
                if (currentTile) {
                    currentTile.draw(x, y);
                }
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
                    //rect(this.getPos(move.x), this.getPos(move.y), this.sizeOfSquare, this.sizeOfSquare);
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

    move(from, to) {
        if (from.sprite == "♟" || from.sprite == "♙") {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    if (this.tiles[i][j] != undefined) {
                        if (this.tiles[i][j].sprite == "♟") {
                            if (
                                this.tiles[i][j].flag &&
                                to.y == j - 1 &&
                                to.x == i
                            ) {
                                this.tiles[i][j] = undefined;
                                continue;
                            }
                            this.tiles[i][j].flag = false;
                        }
                        if (this.tiles[i][j].sprite == "♙") {
                            if (
                                this.tiles[i][j].flag &&
                                to.y == j + 1 &&
                                to.x == i
                            ) {
                                this.tiles[i][j] = undefined;
                                continue;
                            }
                            this.tiles[i][j].flag = false;
                        }
                    }
                }
            }
        }
        if (
            (from.y - to.y == 2 || from.y - to.y == -2) &&
            (from.sprite == "♟" || from.sprite == "♙")
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

    evaluator() {
        let evaluation = 0;
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (this.tiles[i][j] != undefined) {
                    evaluation += this.tiles[i][j].value;
                }
            }
        }
        // if(wherePieceMovesTo != undefined && this.tiles[wherePieceMovesTo.x][wherePieceMovesTo.y] != undefined){
        //     evaluation -= this.tiles[wherePieceMovesTo.x][wherePieceMovesTo.y].value;
        // }
        return evaluation;
    }
    //♟♙♜♖♝♗♞♘♚♔♛♕

    sortArray(array) {
        array = array.map((value) =>
            abs(this.tiles[value.to.x][value.to.y].value)
        );
        array = array.sort(function (a, b) {
            return a - b;
        });
        return array;
    }
}

/* globals textAlign CENTER textSize rectMode push fill rect pop textFont text noLoop noStroke circle int random abs */
