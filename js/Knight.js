import Piece from "./Piece.js";

export default class Knight extends Piece {
    constructor(x, y, colour, sprite, value) {
        super(x, y, colour, sprite, value);
    }

    getDefendingMoves(tiles) {
        let moves = [];
        moves.push(this.getDefend(2, -1, tiles));
        moves.push(this.getDefend(1, -2, tiles));
        moves.push(this.getDefend(-1, -2, tiles));
        moves.push(this.getDefend(-2, -1, tiles));
        moves.push(this.getDefend(-2, 1, tiles));
        moves.push(this.getDefend(-1, 2, tiles));
        moves.push(this.getDefend(1, 2, tiles));
        moves.push(this.getDefend(2, 1, tiles));

        return moves;
    }

    findMoves(tiles) {
        let moves = [];

        moves.push(this.getMove(2, -1, tiles, this.colour));
        moves.push(this.getMove(1, -2, tiles, this.colour));
        moves.push(this.getMove(-1, -2, tiles, this.colour));
        moves.push(this.getMove(-2, -1, tiles, this.colour));
        moves.push(this.getMove(-2, 1, tiles, this.colour));
        moves.push(this.getMove(-1, 2, tiles, this.colour));
        moves.push(this.getMove(1, 2, tiles, this.colour));
        moves.push(this.getMove(2, 1, tiles, this.colour));

        return moves.filter((n) => n);
    }

    getDefend(xDir, yDir, tiles) {
        let newX = this.x + xDir;
        let newY = this.y + yDir;
        if (this.isOffBoard(newX, newY)) {
            return;
        }
        if (tiles[newX][newY] && tiles[newX][newY].colour === this.colour) {
            return { x: newX, y: newY };
        }
    }

    getMove(xDir, yDir, tiles, colour) {
        let newX = this.x + xDir;
        let newY = this.y + yDir;
        if (this.isOffBoard(newX, newY)) {
            return;
        }

        if (tiles[newX][newY]) {
            if (tiles[newX][newY].colour !== colour) {
                return { x: newX, y: newY };
            }
        } else {
            return { x: newX, y: newY };
        }
    }
}
