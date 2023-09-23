import Piece from "./Piece.js";
import Queen from "./Queen.js";
import { COLOUR } from "./constants.js";

export default class Pawn extends Piece {
    constructor(x, y, colour, sprite, value, flag) {
        super(x, y, colour, sprite, value, flag);
        this.direction = this.colour === COLOUR.BLACK ? 1 : -1;
    }

    getDefendingMoves(tiles) {
        return this.findAttacks(tiles);
    }

    findMoves(tiles) {
        let legalMoves = [];
        const forwardMove = { x: this.x, y: this.y + this.direction };
        if (!tiles[forwardMove.x][forwardMove.y]) {
            legalMoves.push(forwardMove);
            if (!this.hasMoved) {
                const twoSquareMove = {
                    x: this.x,
                    y: this.y + this.direction * 2,
                };
                if (!tiles[this.x][twoSquareMove.y]) {
                    legalMoves.push(twoSquareMove);
                }
            }
        }
        legalMoves.push(...this.findAttacks(tiles, this.colour));
        return legalMoves;
    }

    findDefends(tiles) {
        let attacks = [];
        if (this.x - 1 >= 0) {
            const diagonalLeft = tiles[this.x - 1][this.y + this.direction];
            if (diagonalLeft && diagonalLeft.colour === this.colour) {
                attacks.push({ x: this.x - 1, y: this.y + this.direction });
            }
        }

        if (this.x + 1 < 8) {
            const diagonalRight = tiles[this.x + 1][this.y + this.direction];
            if (diagonalRight && diagonalRight.colour === this.colour) {
                attacks.push({ x: this.x + 1, y: this.y + this.direction });
            }
        }
    }

    findAttacks(tiles, colour) {
        let attacks = [];
        if (this.x - 1 >= 0) {
            const diagonalLeft = tiles[this.x - 1][this.y + this.direction];
            if (diagonalLeft && diagonalLeft.colour !== colour) {
                attacks.push({ x: this.x - 1, y: this.y + this.direction });
            }
        }

        if (this.x + 1 < 8) {
            const diagonalRight = tiles[this.x + 1][this.y + this.direction];
            if (diagonalRight && diagonalRight.colour !== colour) {
                attacks.push({ x: this.x + 1, y: this.y + this.direction });
            }
        }

        if (this.x + 1 < 8) {
            if (tiles[this.x + 1][this.y] != undefined) {
                if (
                    tiles[this.x + 1][this.y].sprite == "♟" ||
                    tiles[this.x + 1][this.y].sprite == "♙"
                ) {
                    if (tiles[this.x + 1][this.y].flag) {
                        if (tiles[this.x + 1][this.y].colour !== colour) {
                            attacks.push({
                                x: this.x + 1,
                                y: this.y + this.direction,
                                z: "thisMoveIsEnpassant",
                            });
                        }
                    }
                }
            }
        }
        if (this.x - 1 > 0) {
            if (tiles[this.x - 1][this.y] != undefined) {
                if (
                    tiles[this.x - 1][this.y].sprite == "♟" ||
                    tiles[this.x - 1][this.y].sprite == "♙"
                ) {
                    if (tiles[this.x - 1][this.y].flag) {
                        if (tiles[this.x - 1][this.y].colour !== colour) {
                            attacks.push({
                                x: this.x - 1,
                                y: this.y + this.direction,
                                z: "thisMoveIsEnpassant",
                            });
                        }
                    }
                }
            }
        }
        return attacks;
    }

    move(x, y, tiles) {
        super.move(x, y, tiles);
        this.checkPromotion(y, tiles, x);
    }

    checkPromotion(y, tiles, x) {
        if (this.colour == COLOUR.BLACK && y == 7) {
            tiles[x][y] = new Queen(x, y, COLOUR.BLACK, "♛", -10);
        } else if (this.colour === COLOUR.WHITE && y === 0) {
            tiles[x][y] = new Queen(x, y, COLOUR.WHITE, "♕", 10);
        }
    }
}
