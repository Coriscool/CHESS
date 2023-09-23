import Piece from "./Piece.js";
export default class Rook extends Piece {
    constructor(x, y, colour, sprite, value) {
        super(x, y, colour, sprite, value);
    }

    getDefendingMoves(tiles) {
        return this.findDefendMoves(tiles);
    }

    findMoves(tiles) {
        let moves = [];

        moves.push(...this.findForwardMoves(tiles, this.colour));
        moves.push(...this.findBackwardMoves(tiles, this.colour));
        moves.push(...this.findRightMoves(tiles, this.colour));
        moves.push(...this.findLeftMoves(tiles, this.colour));
        return moves;
    }

    findDefendMoves(tiles) {
        let moves = [];
        for (let i = this.y + 1; i < 8; i++) {
            if (tiles[this.x][i] && tiles[this.x][i].colour === this.colour) {
                moves.push({ x: this.x, y: i });
                break;
            }
        }
        for (let i = this.y - 1; i >= 0; i--) {
            if (tiles[this.x][i] && tiles[this.x][i].colour === this.colour) {
                moves.push({ x: this.x, y: i });
                break;
            }
        }
        for (let i = this.x - 1; i >= 0; i--) {
            if (tiles[i][this.y] && tiles[i][this.y].colour === this.colour) {
                moves.push({ x: i, y: this.y });
                break;
            }
        }
        for (let i = this.x + 1; i < 8; i++) {
            if (tiles[i][this.y] && tiles[i][this.y].colour === this.colour) {
                moves.push({ x: i, y: this.y });
                break;
            }
        }
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
