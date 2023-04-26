import { COLOUR } from './constants.js';
import Knight from './Knight.js';
import Piece from './Piece.js';
import Queen from './Queen.js';
export default class Pawn extends Piece {
    constructor(x, y, colour, sprite, flag) {
        super(x, y, colour, sprite, flag);
        this.direction = this.colour === COLOUR.BLACK ? 1 : -1;
        //this.hasDone2Moves = flag;
    }


    findMoves(tiles) {
        let legalMoves = [];
        const forwardMove = { x: this.x, y: this.y + this.direction};
        if (!tiles[forwardMove.x][forwardMove.y]) {
            legalMoves.push(forwardMove);
            if (!this.hasMoved) {
                const twoSquareMove = {x: this.x, y: this.y + (this.direction*2)};
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
            const diagonalLeft = tiles[this.x-1][this.y + this.direction];
            if (diagonalLeft && diagonalLeft.colour !== this.colour) {
                attacks.push({x: this.x-1, y: this.y + this.direction});
            }
        }

        if (this.x + 1 < 8) {
            const diagonalRight = tiles[this.x+1][this.y + this.direction];
            if (diagonalRight && diagonalRight.colour !== this.colour) {
                attacks.push({x: this.x+1, y: this.y + this.direction});
            }
        }
        
        //Notes: om te verwijderen= remove alle pawns met flag=true
        //in de if-statement moet ie checken of pawn ernaast een flag met true heeft
        if(this.x + 1 < 8 && this.colour == 'white' && this.y == 3) {
            if (tiles[this.x+1][this.y] != undefined) {
                if (tiles[this.x+1][this.y].sprite == '♟') {
                    if (tiles[this.x+1][this.y].flag) {
                        if (tiles[this.x+1][this.y].colour !== this.colour) {
                            attacks.push({x: this.x+1, y: this.y + this.direction});
                        }
                    }
                }
            }
            
        }
        if(this.x + 1 < 8 && this.colour == 'black' && this.y == 4 && this.flag == true) {
            const adjacentRight = tiles[this.x+1][this.y];
            if (adjacentRight && adjacentRight.colour !== this.colour) {
                attacks.push({x: this.x+1, y: this.y + this.direction});
                //attacks.push({x: this.x, y: this.y + 1});
            }
        }


        if (this.x - 1 >= 0 && this.colour == 'white' && this.y == 3 && this.flag == true){
            const adjacentLeft = tiles[this.x-1][this.y];
            if (adjacentLeft && adjacentLeft.colour !== this.colour) {
                attacks.push({x: this.x-1, y: this.y + this.direction});
                //attacks.push({x: this.x, y: this.y - 1});
            }
        }
        if(this.x - 1 >= 0 && this.colour == 'black' && this.y == 4 && this.flag == true){
            const adjacentLeft = tiles[this.x-1][this.y];
            if (adjacentLeft && adjacentLeft.colour !== this.colour) {
                attacks.push({x: this.x-1, y: this.y + this.direction});
                //attacks.push({x: this.x, y: this.y + 1});
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
            tiles[x][y] = new Queen(x, y, COLOUR.BLACK, '♛');
        } else if (this.colour === COLOUR.WHITE && y === 0) {
            tiles[x][y] = new Queen(x, y, COLOUR.WHITE, '♕');
        }
    }
}