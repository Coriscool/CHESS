import { COLOUR } from "./constants.js";
import Piece from "./Piece.js";
import Queen from "./Queen.js";
import Pieces from "./constants.js";

export default class Pawn extends Piece {
    constructor(x, y, colour, sprite, flag) {
        super(x, y, colour, sprite, flag);
        this.direction = this.colour === COLOUR.BLACK ? 1 : -1;
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
        legalMoves.push(...this.findAttacks(tiles));
        return legalMoves;
    }

    findAttacks(tiles) {
        let attacks = [];
        if (this.x - 1 >= 0) {
            const diagonalLeft = tiles[this.x - 1][this.y + this.direction];
            if (diagonalLeft && diagonalLeft.colour !== this.colour) {
                attacks.push({ x: this.x - 1, y: this.y + this.direction });
            }
        }

        if (this.x + 1 < 8) {
            const diagonalRight = tiles[this.x + 1][this.y + this.direction];
            if (diagonalRight && diagonalRight.colour !== this.colour) {
                attacks.push({ x: this.x + 1, y: this.y + this.direction });
            }
        }

        //Notes: om te verwijderen= remove alle pawns met flag=true
        //in de if-statement moet ie checken of pawn ernaast een flag met true heeft
        if (this.x + 1 < 8) {
            let square_on_right = tiles[this.x + 1][this.y];
            if (square_on_right != undefined) {
                if (
                    square_on_right.type === Pieces.WPawn ||
                    square_on_right.type === Pieces.BPawn
                ) {
                    if (square_on_right.flag) {
                        if (square_on_right.colour !== this.colour) {
                            attacks.push({
                                x: this.x + 1,
                                y: this.y + this.direction,
                            });
                        }
                    }
                }
            }
        }
        if (this.x - 1 > 0) {
            let square_on_left = tiles[this.x - 1][this.y];
            if (square_on_left != undefined) {
                if (
                    square_on_left.type === Pieces.WPawn ||
                    square_on_left.type === Pieces.BPawn
                ) {
                    if (square_on_left.flag) {
                        if (square_on_left.colour !== this.colour) {
                            attacks.push({
                                x: this.x - 1,
                                y: this.y + this.direction,
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
            tiles[x][y] = new Queen(x, y, COLOUR.BLACK, "♛");
        } else if (this.colour === COLOUR.WHITE && y === 0) {
            tiles[x][y] = new Queen(x, y, COLOUR.WHITE, "♕");
        }
    }
}
