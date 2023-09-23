import CheckFinder from "./CheckFinder.js";

export default class Piece {
    constructor(x, y, colour, sprite, value) {
        this.x = x;
        this.y = y;
        this.colour = colour; //
        this.hasMoved = false;
        this.sprite = sprite;
        this.value = value;
    }

    userMove(toX, toY, tiles) {
        this.hasMoved = true;
        this.move(toX, toY, tiles);
    }

    move(toX, toY, tiles) {
        const fromX = this.x;
        const fromY = this.y;

        tiles[toX][toY] = this;

        this.x = toX;
        this.y = toY;

        tiles[fromX][fromY] = undefined;
    }

    findDefendingMoves(tiles) {
        let moves = this.getDefendingMoves(tiles);
        moves = moves
            .filter((n) => n)
            .map((m) => {
                let from = { i: this.x, j: this.y };
                return {
                    from,
                    to: m,
                    value: tiles[from.i][from.j].value,
                };
            });
        return moves;
    }

    findLegalMoves(tiles) {
        let moves = this.findMoves(tiles);
        for (let i = moves.length - 1; i >= 0; i--) {
            const currentMove = moves[i];
            if (
                CheckFinder.movePutsPlayerInCheck(
                    this.x,
                    this.y,
                    currentMove.x,
                    currentMove.y,
                    tiles,
                    this.colour
                )
            ) {
                moves.splice(i, 1);
            }
        }
        return moves;
    }

    isOffBoard(newX, newY) {
        return newX > 7 || newX < 0 || newY > 7 || newY < 0;
    }

    draw(x, y) {
        text(this.sprite, x, y);
        //Image(sprite,x,y);
    }
}

/* globals text */
