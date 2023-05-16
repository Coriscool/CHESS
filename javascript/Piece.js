import CheckFinder from "./CheckFinder.js";
export default class Piece {
    constructor(x, y, colour, sprite, type) {
        this.x = x;
        this.y = y;
        this.colour = colour;
        this.hasMoved = false;
        this.sprite = sprite;
        this.type = type;
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
        let x = 5;
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
        if (moves.length === 0) {
            console.log("Draw by stalemate");
            fill(10, 10, 10);
            textFont("Arial");
            text("Draw by stalemate", 400, 400, 500, 500);
            noLoop();
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
