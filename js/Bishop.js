import Piece from "./Piece.js";

export default class Bishop extends Piece {
    constructor(x, y, colour, sprite, value) {
        super(x, y, colour, sprite, value);
    }

    getDefendingMoves(tiles) {
        let moves = [];

        moves.push(this.findPartDefendingMove(1, -1, tiles));
        moves.push(this.findPartDefendingMove(-1, -1, tiles));
        moves.push(this.findPartDefendingMove(1, 1, tiles));
        moves.push(this.findPartDefendingMove(-1, 1, tiles));

        return moves;
    }

    findMoves(tiles) {
        let moves = [];
        moves.push(...this.findAllMoves(1, -1, tiles));
        moves.push(...this.findAllMoves(-1, -1, tiles));
        moves.push(...this.findAllMoves(1, 1, tiles));
        moves.push(...this.findAllMoves(-1, 1, tiles));

        return moves;
    }

    findPartDefendingMove(xDir, yDir, tiles) {
        for (let i = 1; i < 8; i++) {
            let newX = this.x + xDir * i;
            let newY = this.y + yDir * i;

            if (this.isOffBoard(newX, newY)) {
                return;
            }
            if (tiles[newX][newY]) {
                if (tiles[newX][newY].colour === this.colour) {
                    return { x: newX, y: newY };
                }
            }
        }
    }

    findAllMoves(xDir, yDir, tiles) {
        let moves = [];
        for (let i = 1; i < 8; i++) {
            let newX = this.x + xDir * i;
            let newY = this.y + yDir * i;

            if (this.isOffBoard(newX, newY)) {
                return moves;
            }

            if (tiles[newX][newY]) {
                if (tiles[newX][newY].colour !== this.colour) {
                    moves.push({ x: newX, y: newY });
                }
                return moves;
            }
            moves.push({ x: newX, y: newY });
        }
        return moves;
    }
}
