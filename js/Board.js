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

    playRandomMove(colour) {
        console.warn("did random move");
        const moveablePieces = this.findMoveablePieces(colour);
        const piece = moveablePieces[int(random(0, moveablePieces.length))];
        const legalMoves = this.tiles[piece.x][piece.y].findLegalMoves(
            this.tiles
        );
        const to = legalMoves[int(random(0, legalMoves.length))];
        this.move(this.tiles[piece.x][piece.y], to);
    }

    getValueAfterMove(move) {
        const attackedPieceValue = abs(this.tiles[move.to.x][move.to.y].value);
        const attackerValue = abs(this.tiles[move.from.x][move.from.y].value);
        return attackedPieceValue - attackerValue;
    }

    onClick(clientX, clientY) {
        const x = Math.floor(clientX / 100);
        const y = Math.floor(clientY / 100);
        this.update_selected(x, y);

        if (this.turn !== COLOUR.BLACK) {
            return;
        }

        // find attacking moves for ai (black)
        let attackingMovesAi = this.findAttackingMoves(COLOUR.BLACK);
        // if no attacking moves are found play safe move
        if (attackingMovesAi.length === 0) {
            this.playSafeMove(COLOUR.BLACK);
            return;
        }

        // find defending moves for player (white)
        const defendingMovesPlayer = this.findDefendingMoves(COLOUR.WHITE);

        // check if attackingMoves are defended and update attackingMoves[] value accordingly
        let i = 0;
        attackingMovesAi.forEach((aiMove) => {
            defendingMovesPlayer.forEach((playerMove) => {
                if (
                    aiMove.to.x === playerMove.to.x &&
                    aiMove.to.y === playerMove.to.y
                ) {
                    attackingMovesAi[i].valueAfterMove =
                        this.getValueAfterMove(aiMove);
                }
            });
            i++;
        });

        // sort attackingMoves so the best move is at the first index
        attackingMovesAi.sort(function (a, b) {
            return b.valueAfterMove - a.valueAfterMove;
        });

        let bestMove = attackingMovesAi[0];

        // play best attacking move if doesn't lose anything, otherwise play random move
        if (bestMove.valueAfterMove >= 0) {
            console.log(
                `attacking move from ${bestMove.from.x}, ${bestMove.from.y} to ${bestMove.to.x}, ${bestMove.to.y}`
            );
            // console.log("best value = " + bestMove.valueAfterMove);

            this.move(
                this.tiles[bestMove.from.x][bestMove.from.y],
                bestMove.to
            );
        } else {
            this.playSafeMove(COLOUR.BLACK);
        }
    }

    playSafeMove(colour) {
        let safeMove = this.findSafeMove(colour);
        if (safeMove) {
            console.log(
                `safe move from ${safeMove.from.x}, ${safeMove.from.y} to ${safeMove.to.x}, ${safeMove.to.y}`
            );
            this.move(
                this.tiles[safeMove.from.x][safeMove.from.y],
                safeMove.to
            );
        } else {
            this.playRandomMove(colour);
        }
    }

    findAllNonAttackingMoves(colour) {
        let allMoves = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let piece = this.tiles[i][j];
                if (piece === undefined || piece.colour !== colour) {
                    continue;
                }
                let legalMoves = piece.findLegalMoves(this.tiles);

                for (let c = legalMoves.length - 1; c >= 0; c--) {
                    let to = legalMoves[c];
                    if (this.tiles[to.x][to.y] === undefined) {
                        allMoves.push(to);
                    }
                }
            }
        }
        return allMoves;
    }

    findSafeMove(colour) {
        let opp_colour = COLOUR.WHITE;
        if (colour == COLOUR.WHITE) {
            opp_colour = COLOUR.BLACK;
        }
        const allMoves = this.findAllNonAttackingMoves(opp_colour);
        // console.log("lall moves length " + allMoves.length);
        let moveablePieces = this.findMoveablePieces(colour);

        while (moveablePieces.length > 0) {
            const index = int(random(0, moveablePieces.length));
            const from = moveablePieces[index];
            let legalMoves = this.tiles[from.x][from.y].findLegalMoves(
                this.tiles
            );

            while (legalMoves.length > 0) {
                const index = int(random(0, legalMoves.length));
                const to = legalMoves[index];

                let undefended = true;
                allMoves.forEach((move) => {
                    if (move.x === to.x && move.y === to.y) {
                        undefended = false;
                    }
                });
                if (undefended) {
                    /*console.log(
                        `move is ${move.from.x}, ${move.from.y} to ${move.to.x}, ${move.to.y}`
                    );*/
                    return { from, to };
                }
                legalMoves = legalMoves.slice(index + 1);
            }
            moveablePieces = moveablePieces.slice(index + 1);
        }
    }

    findMoveablePieces(colour) {
        let moveablePieces = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (
                    this.tiles[i][j] != undefined &&
                    this.tiles[i][j].colour === colour
                ) {
                    this.legalMoves = this.tiles[i][j].findLegalMoves(
                        this.tiles
                    );
                    if (this.legalMoves != 0) {
                        moveablePieces.push({ x: i, y: j });
                    }
                }
            }
        }
        return moveablePieces;
    }

    findAttackingMoves(colour) {
        let moveFound = false;
        let AttackingMoves = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let piece = this.tiles[i][j];
                if (piece === undefined || piece.colour !== colour) {
                    continue;
                }
                let legalMoves = piece.findLegalMoves(this.tiles);
                if (legalMoves.length > 0) {
                    moveFound = true;
                }

                for (let c = legalMoves.length - 1; c >= 0; c--) {
                    let to = legalMoves[c];
                    if (this.tiles[to.x][to.y]) {
                        AttackingMoves.push({
                            from: { x: i, y: j },
                            to: to,
                            valueAfterMove: this.tiles[to.x][to.y].value,
                        });
                    }
                }
            }
        }

        if (!moveFound) {
            if (!this.isInCheck) {
                this.Stalemate();
            }
        }
        return AttackingMoves;
    }

    findDefendingMoves(colour) {
        let defendingMoves = [];
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                let piece = this.tiles[i][j];
                if (piece && piece.colour === colour) {
                    defendingMoves.push(
                        ...piece.findDefendingMoves(this.tiles)
                    );
                }
            }
        }
        return defendingMoves;
    }

    Stalemate() {
        console.log("Draw by stalemate");
        fill(10, 10, 10);
        textFont("Arial");
        text("Draw by stalemate", 400, 400, 500, 500);
        noLoop();
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

        tiles[3][0] = new Queen(3, 0, COLOUR.BLACK, "♛", -9);
        tiles[3][7] = new Queen(3, 7, COLOUR.WHITE, "♕", 9);

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
        const offset = this.sizeOfSquare / 2;
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
            const moves = CheckFinder.findMovesForCheckedPlayer(
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
}

// Don't delete this, needed for p5 functions
/* globals textAlign CENTER textSize rectMode push fill rect pop textFont text noLoop noStroke circle int random abs */
