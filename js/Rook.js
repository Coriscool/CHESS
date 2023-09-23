import Piece from "./Piece.js";
import { COLOUR } from "./constants.js";
export default class Rook extends Piece {
    constructor(x, y, colour, sprite, value) {
        super(x, y, colour, sprite, value);
    }

    findDefendingMoves(tiles) {
        let moves = [];
        let colour = COLOUR.WHITE;
        if (this.colour === COLOUR.WHITE) {
            colour = COLOUR.BLACK;
        }

        moves.push(...this.findForwardMoves(tiles, colour));
        moves.push(...this.findBackwardMoves(tiles, colour));
        moves.push(...this.findRightMoves(tiles, colour));
        moves.push(...this.findLeftMoves(tiles, colour));
        return moves;
    }

    findMoves(tiles) {
        let moves = [];

        moves.push(...this.findForwardMoves(tiles, this.colour));
        moves.push(...this.findBackwardMoves(tiles, this.colour));
        moves.push(...this.findRightMoves(tiles, this.colour));
        moves.push(...this.findLeftMoves(tiles, this.colour));
        return moves;
    }

    findForwardMoves(tiles, colour) {
        let moves = [];
        for (let i = this.y + 1; i < 8; i++) {
            if (tiles[this.x][i]) {
                if (tiles[this.x][i].colour !== colour) {
                    moves.push({ x: this.x, y: i });
                }
                return moves;
            }
            moves.push({ x: this.x, y: i });
        }
        return moves;
    }

    findBackwardMoves(tiles, colour) {
        let moves = [];
        for (let i = this.y - 1; i >= 0; i--) {
            if (tiles[this.x][i]) {
                if (tiles[this.x][i].colour !== colour) {
                    moves.push({ x: this.x, y: i });
                }
                return moves;
            }
            moves.push({ x: this.x, y: i });
        }
        return moves;
    }

    findLeftMoves(tiles, colour) {
        let moves = [];
        for (let i = this.x - 1; i >= 0; i--) {
            if (tiles[i][this.y]) {
                if (tiles[i][this.y].colour !== colour) {
                    moves.push({ x: i, y: this.y });
                }
                return moves;
            }
            moves.push({ x: i, y: this.y });
        }
        return moves;
    }

    findRightMoves(tiles, colour) {
        let moves = [];
        for (let i = this.x + 1; i < 8; i++) {
            if (tiles[i][this.y]) {
                if (tiles[i][this.y].colour !== colour) {
                    moves.push({ x: i, y: this.y });
                }
                return moves;
            }
            moves.push({ x: i, y: this.y });
        }
        return moves;
    }
}
