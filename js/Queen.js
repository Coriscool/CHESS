import Piece from "./Piece.js";
import { COLOUR } from "./constants.js";
export default class Queen extends Piece {
    constructor(x, y, colour, sprite, value) {
        super(x, y, colour, sprite, value);
    }

    getDefendingMoves(tiles) {
        let moves = [];
        let colour = COLOUR.WHITE;
        if (this.colour === COLOUR.WHITE) {
            colour = COLOUR.BLACK;
        }

        moves.push(...this.findAllMoves(1, -1, tiles, colour));
        moves.push(...this.findAllMoves(-1, -1, tiles, colour));
        moves.push(...this.findAllMoves(1, 1, tiles, colour));
        moves.push(...this.findAllMoves(-1, 1, tiles, colour));
        moves.push(...this.findAllMoves(1, 0, tiles, colour));
        moves.push(...this.findAllMoves(0, -1, tiles, colour));
        moves.push(...this.findAllMoves(-1, 0, tiles, colour));
        moves.push(...this.findAllMoves(0, 1, tiles, colour));
        return moves;
    }

    findMoves(tiles) {
        let moves = [];
        moves.push(...this.findAllMoves(1, -1, tiles, this.colour));
        moves.push(...this.findAllMoves(-1, -1, tiles, this.colour));
        moves.push(...this.findAllMoves(1, 1, tiles, this.colour));
        moves.push(...this.findAllMoves(-1, 1, tiles, this.colour));
        moves.push(...this.findAllMoves(1, 0, tiles, this.colour));
        moves.push(...this.findAllMoves(0, -1, tiles, this.colour));
        moves.push(...this.findAllMoves(-1, 0, tiles, this.colour));
        moves.push(...this.findAllMoves(0, 1, tiles, this.colour));
        return moves;
    }

    findAllMoves(xDir, yDir, tiles, colour) {
        let moves = [];
        for (let i = 1; i < 8; i++) {
            let newX = this.x + xDir * i;
            let newY = this.y + yDir * i;

            if (this.isOffBoard(newX, newY)) {
                return moves;
            }

            if (tiles[newX][newY]) {
                if (tiles[newX][newY].colour !== colour) {
                    moves.push({ x: newX, y: newY });
                }
                return moves;
            }
            moves.push({ x: newX, y: newY });
        }
        return moves;
    }
}
