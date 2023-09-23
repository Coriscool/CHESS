import Piece from "./Piece.js";
import { COLOUR } from "./constants.js";

export default class Knight extends Piece {
    constructor(x, y, colour, sprite, value) {
        super(x, y, colour, sprite, value);
    }

    findDefendingMoves(tiles) {
        let moves = [];
        let colour = COLOUR.WHITE;
        if (this.colour === COLOUR.WHITE) {
            colour = COLOUR.BLACK;
        }

        moves.push(this.getMove(2, -1, tiles, colour));
        moves.push(this.getMove(1, -2, tiles, colour));
        moves.push(this.getMove(-1, -2, tiles, colour));
        moves.push(this.getMove(-2, -1, tiles, colour));
        moves.push(this.getMove(-2, 1, tiles, colour));
        moves.push(this.getMove(-1, 2, tiles, colour));
        moves.push(this.getMove(1, 2, tiles, colour));
        moves.push(this.getMove(2, 1, tiles, colour));

        return moves.filter((n) => n);
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
