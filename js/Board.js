import Bishop from './Bishop.js';
import {COLOUR, SIZE} from './constants.js';
import Pawn from './Pawn.js';
import Rook from './Rook.js';
import Knight from './Knight.js';
import King from './King.js';
import Queen from './Queen.js';
import CheckFinder from './CheckFinder.js';

export default class Board {

    constructor() {
        this.sizeOfSquare = SIZE / 8;
        this.tiles = this.createTiles();
        this.turn = COLOUR.WHITE;
        this.isInCheck = false;
    }

    createTiles() {
        let tiles = this.createEmptyBoard();

        for (let i = 0; i < 8; i++) { 
            tiles[i][1] = new Pawn(i, 1, COLOUR.BLACK, '♟', -1, false);
            tiles[i][6] = new Pawn(i, 6, COLOUR.WHITE, '♙', 1, false);
        }
        //♟♙♜♖♝♗♞♘♚♔♛♕
        tiles[0][0] = new Rook(0, 0, COLOUR.BLACK, '♜', -5);
        tiles[7][0] = new Rook(7, 0, COLOUR.BLACK, '♜', -5);
        tiles[0][7] = new Rook(0, 7, COLOUR.WHITE, '♖', 5);
        tiles[7][7] = new Rook(7, 7, COLOUR.WHITE, '♖', 5);

        tiles[2][0] = new Bishop(2, 0, COLOUR.BLACK, '♝', -3);
        tiles[5][0] = new Bishop(5, 0, COLOUR.BLACK, '♝', -3);
        tiles[2][7] = new Bishop(2, 7, COLOUR.WHITE, '♗', 3);
        tiles[5][7] = new Bishop(5, 7, COLOUR.WHITE, '♗', 3);


        tiles[1][0] = new Knight(1, 0, COLOUR.BLACK, '♞', -3);
        tiles[6][0] = new Knight(6, 0, COLOUR.BLACK, '♞', -3);
        tiles[1][7] = new Knight(1, 7, COLOUR.WHITE, '♘', 3);
        tiles[6][7] = new Knight(6, 7, COLOUR.WHITE, '♘', 3);

        tiles[4][0] = new King(4, 0, COLOUR.BLACK, '♚', -900);
        tiles[4][7] = new King(4, 7, COLOUR.WHITE, '♔', 900);

        tiles[3][0] = new Queen(3, 0, COLOUR.BLACK, '♛', -10);
        tiles[3][7] = new Queen(3, 7, COLOUR.WHITE, '♕', 10);

        return tiles;
    }
    
    createEmptyBoard() {
        let board = [];
        for (let i = 0; i < 8; i++) {
            board[i] = [];
            for (let j = 0; j < 8; j++) {
                board[i][j] = undefined;
            }
        }
        return board;
    }

    draw() {
        textAlign(CENTER, CENTER);
        textSize(80);
        rectMode(CENTER);
        for (let i = 0; i < 8; i++) {
            
            for (let j = 0; j < 8; j++) {
                const currentTile = this.tiles[i][j];
                const x =  this.getPos(i);
                const y = this.getPos(j);

                if ((i + j) % 2 != 0) {
                    push();
                    fill(181,136,99);
                    rect(x, y, this.sizeOfSquare, this.sizeOfSquare);
                    pop();
                } else {
                    push();
                    fill(240,217,181);
                    rect(x, y, this.sizeOfSquare, this.sizeOfSquare);
                    pop();
                }
                if (currentTile)  {
                    currentTile.draw(x, y);
                }
            }
        }
        this.displaySelected();
        if (this.isInCheck) {
            let moves = CheckFinder.findMovesForCheckedPlayer(this.tiles, this.turn);
            if (moves.length === 0) {
                console.log('Checkmate');
                fill(10,10,10);
                textFont('Arial');
                text('Checkmate',400,400,500,500);
                noLoop();
            }
        }
    }

    displaySelected() {
        if (this.selected) {
            const tile = this.tiles[this.selected.x][this.selected.y];
            if (tile) {
                push();
                fill(118,115,115,170);

                for (const move of this.legalMoves) {
                    push();
                    noStroke();
                    circle(this.getPos(move.x), this.getPos(move.y), this.sizeOfSquare/4);
                    pop();
                }
                pop(); 
            }
        }
    }

    getPos(index) {
        let offset = this.sizeOfSquare/2;
        return index * this.sizeOfSquare + offset;
    }

    userClick(clientX, clientY) {
        let calculating = false;
        const x = Math.floor(clientX / 100);
        const y = Math.floor(clientY / 100);
        if(!calculating){
            this.select(x,y);
            console.clear()
        }
        if(this.turn === COLOUR.BLACK){
            //const boardstate = _.cloneDeep(this.tiles);
            let allMoves1 = this.findAllMoves('BLACK');
            if (allMoves1.length === 0 && !this.isInCheck) {
                console.log("Draw by stalemate");
                fill(10, 10, 10);
                textFont("Arial");
                text("Draw by stalemate", 400, 400, 500, 500);
                noLoop();
            }
            if (allMoves1.length !== 0) {
                let bestMove = this.chessLooper(allMoves1, 4, 'BLACK', 0);
                console.log(bestMove);
                this.move(this.tiles[bestMove.from.i][bestMove.from.j], bestMove.to);
                // let maxMoveValue = -1000;
                // let bestMoveIndex = -1;
                // for(let j = 0; j < allMoves1.length; j++) {
                //     let valueOfWhitePiece = 0;
                //     if(this.tiles[allMoves1[j].to.x][allMoves1[j].to.y] !== undefined){
                //         valueOfWhitePiece = this.tiles[allMoves1[j].to.x][allMoves1[j].to.y].value;
                //     }
                //     this.move(this.tiles[allMoves1[j].from.i][allMoves1[j].from.j], allMoves1[j].to);
                //     let allMoves2 = this.findAllMoves('WHITE');
                //     let moveValue = 1;
                //     for (let i = 0; i < allMoves2.length; i++) {
                //         let valueOfBlackPiece = 0;
                //         if (this.tiles[allMoves2[i].to.x][allMoves2[i].to.y] !== undefined) {
                //             if (this.tiles[allMoves2[i].to.x][allMoves2[i].to.y].value < valueOfBlackPiece) {
                //                 valueOfBlackPiece = this.tiles[allMoves2[i].to.x][allMoves2[i].to.y].value;
                //             }
                //         }
                //         allMoves2[i].valueOfMove = valueOfWhitePiece + valueOfBlackPiece;
                //         if(allMoves2[i].valueOfMove <= moveValue){
                //             moveValue = allMoves2[i].valueOfMove;
                //         }
                //     }
                //     console.log(allMoves1[j].from, allMoves1[j].to, allMoves2);
                //     // Wanneer er meer depth --> .valueofmove moet pas aan het eind van alle calculations worden gewijzigd.

                //     // de evaluation lines zorgen ervoor dat ie alleen trade wanneer de eval gelijk is of in favour
                //     // let evaluation = this.evaluator();
                //     // if(evaluation <= 0){
                //         if (moveValue >= maxMoveValue) {
                //             maxMoveValue = moveValue;
                //             bestMoveIndex = j;
                //         }
                //     // }
                //     // if(evaluation > 0){
                //     //     if (moveValue > maxMoveValue) {
                //     //         maxMoveValue = moveValue;
                //     //         bestMoveIndex = j;
                //     //     }
                //     // }
                //     this.resetBoard(boardstate);
                // }
                // if (bestMoveIndex !== -1) {
                //     this.move(this.tiles[allMoves1[bestMoveIndex].from.i][allMoves1[bestMoveIndex].from.j], allMoves1[bestMoveIndex].to);
                //     console.log('No random move made', allMoves1[bestMoveIndex]);
                //     rMGActive = false;
                // }
            }
            this.turn = COLOUR.WHITE;
            calculating = false;
        }
    }

    select(x, y) {
        if (this.isOffBoard(x, y) ) {
            this.selected = undefined;
        }  
        else if (this.tiles[x][y] && this.tiles[x][y].colour === this.turn) {
            this.selected = JSON.parse(JSON.stringify(this.tiles[x][y]));
            this.legalMoves = this.tiles[this.selected.x][this.selected.y].findLegalMoves(this.tiles);
        } 
        else if (this.selected) {
            const potentialMove = this.legalMoves.find(e => e.x == x && e.y == y);
            if (potentialMove) {
                this.move(this.selected, potentialMove);
            } else {
                this.selected = undefined;
            }
        } 
    }

    move(from, to) {
        if(from.sprite == '♟' || from.sprite == '♙'){
            for(let i = 0; i<8; i++){
                for(let j = 0; j<8; j++){
                    if (this.tiles[i][j] != undefined){
                        if (this.tiles[i][j].sprite == '♟') {
                            if (this.tiles[i][j].flag && to.y == j-1 && to.x == i) {
                                this.tiles[i][j] = undefined;
                                continue;
                            }
                            this.tiles[i][j].flag = false;
                        }
                        if (this.tiles[i][j].sprite == '♙') {
                            if (this.tiles[i][j].flag && to.y == j+1 && to.x == i) {
                                this.tiles[i][j] = undefined;
                                continue;
                            }
                            this.tiles[i][j].flag = false;
                        }
                    }
                }
            }
        }
        if ((from.y - to.y == 2 || from.y - to.y == -2) && (from.sprite == '♟' || from.sprite == '♙')) {      
            this.tiles[from.x][from.y].flag = true;   
        }
        this.turn = this.turn === COLOUR.WHITE ? COLOUR.BLACK : COLOUR.WHITE;
        //DEZE IF STATEMENT WAS ER NIET EN OOK NIET WAT IN DE ELSE STAAT
        if(to.i === undefined){
            this.tiles[from.x][from.y].userMove(to.x, to.y, this.tiles);
        }
        else {
            this.tiles[from.x][from.y].userMove(to.i, to.j, this.tiles);
        }
        this.selected = undefined;

        this.isInCheck = CheckFinder.isCurrentPlayerInCheck(this.tiles, this.turn);

        if (this.isInCheck) {
            let moves = CheckFinder.findMovesForCheckedPlayer(this.tiles, this.turn);
            if (moves.length === 0) {
                fill(10,10,10);
                textFont('Arial');
                text('Checkmate',400,400,50,50);
                noLoop();
            }
        }
    }


    isOffBoard(x, y) {
        return x > 7 || x < 0 || y > 7 || y < 0;
    }


evaluator() {
    let evaluation = 0;
    for(let i = 0; i<8; i++){
        for(let j = 0; j<8; j++){
            if(this.tiles[i][j] != undefined){
                evaluation += this.tiles[i][j].value;
            }
        }
    }
    return evaluation;
}

findAllMoves (colour) {
    let possibleMovable = [];
    let possibleMove = [];
    for(let i = 0; i<8; i++){
        for(let j = 0; j<8; j++){
            if(colour === 'WHITE') {
                if (this.tiles[i][j] != undefined && this.tiles[i][j].colour == COLOUR.WHITE){
                    this.legalMoves = this.tiles[i][j].findLegalMoves(this.tiles);
                    if(this.legalMoves != 0){
                        possibleMovable.push ({i,j});
                    }
                }
            }
            if (colour === 'BLACK') {
                if (this.tiles[i][j] != undefined && this.tiles[i][j].colour == COLOUR.BLACK){
                    this.legalMoves = this.tiles[i][j].findLegalMoves(this.tiles);
                    if(this.legalMoves != 0){
                        possibleMovable.push ({i, j});
                    }
                }
            }
        }
    }
    for (let c = 0; c < possibleMovable.length; c++) {  
        let movesTo = this.tiles[possibleMovable[c].i][possibleMovable[c].j].findLegalMoves(this.tiles);
        for (let j = movesTo.length - 1; j >= 0; j--) {
            possibleMove.push({from: possibleMovable[c], to: movesTo[j], valueOfMove: undefined});
        }
    }
    return possibleMove;
}

resetBoard(BoardneedsToBecome) {
    this.tiles = _.cloneDeep(BoardneedsToBecome);
}

chessLooper (allMoves, depths, color, valueOfPreviousPiece) {
    if (allMoves.length !== 0) {
        let valueOfPreviousPieces = valueOfPreviousPiece;
        let colour = color;
        let depth = depths;
        const boardstate = _.cloneDeep(this.tiles);
        let allMoves1 = allMoves;
        let bestMoveIndex = -1;
        let bestMove = undefined;
        let maxMoveValue = undefined;
        if (colour == 'BLACK') {
            colour = 'WHITE';
            maxMoveValue = -1000;
        }
        else {
            colour = 'BLACK';
            maxMoveValue = 1000;
        }
        depth = depth - 1;
        console.log(allMoves, color);
        for (let j = 0; j < allMoves1.length; j++) {
            valueOfPreviousPieces = valueOfPreviousPiece;
            let valueOfPiece = 0;
            if (this.tiles[allMoves1[j].to.x][allMoves1[j].to.y] !== undefined) {
                valueOfPiece = this.tiles[allMoves1[j].to.x][allMoves1[j].to.y].value;
            }
            valueOfPreviousPieces += valueOfPiece;
            this.move(this.tiles[allMoves1[j].from.i][allMoves1[j].from.j], allMoves1[j].to);
            if (depth > 0) {
                bestMove = this.chessLooper(this.findAllMoves(colour), depth, colour, valueOfPreviousPieces);
                console.log(bestMove);
                allMoves1[j].valueOfMove = bestMove.valueOfMove;
                valueOfPreviousPieces += allMoves1[j].valueOfMove;
                console.log(allMoves1[j], bestMove);
            }
            else {
                allMoves1[j].valueOfMove = valueOfPreviousPieces;
            }
            console.log(valueOfPreviousPieces);
            if (color === 'BLACK'){
                console.log(valueOfPreviousPieces);
                if (valueOfPreviousPieces >= maxMoveValue) {
                    maxMoveValue = valueOfPreviousPieces;
                    bestMoveIndex = j;
                }
            }
            else {
                console.log(valueOfPreviousPieces, maxMoveValue);
                if (valueOfPreviousPieces <= maxMoveValue) {
                    maxMoveValue = valueOfPreviousPieces;
                    bestMoveIndex = j;
                    console.log(allMoves1[bestMoveIndex]);
                }
            }
            // let allMoves2 = this.findAllMoves('WHITE');
            // let moveValue = 1;
            // for (let i = 0; i < allMoves2.length; i++) {
            //     let valueOfBlackPiece = 0;
            //     if (this.tiles[allMoves2[i].to.x][allMoves2[i].to.y] !== undefined) {
            //         if (this.tiles[allMoves2[i].to.x][allMoves2[i].to.y].value < valueOfBlackPiece) {
            //             valueOfBlackPiece = this.tiles[allMoves2[i].to.x][allMoves2[i].to.y].value;
            //         }
            //     }
            //     allMoves2[i].valueOfMove = valueOfWhitePiece + valueOfBlackPiece;
            //     if(allMoves2[i].valueOfMove <= moveValue){
            //         moveValue = allMoves2[i].valueOfMove;
            //     }
            // }
            //console.log(allMoves1[j].from, allMoves1[j].to, allMoves2);

            // Wanneer er meer depth --> .valueofmove moet pas aan het eind van alle calculations worden gewijzigd.

            // de evaluation lines zorgen ervoor dat ie alleen trade wanneer de eval gelijk is of in favour
            // let evaluation = this.evaluator();
            // if(evaluation <= 0){
                // if (valueOfPreviousPieces >= maxMoveValue) {
                //     maxMoveValue = valueOfPreviousPieces;
                //     bestMoveIndex = j;
                // }
            // }
            // if(evaluation > 0){
            //     if (moveValue > maxMoveValue) {
            //         maxMoveValue = moveValue;
            //         bestMoveIndex = j;
            //     }
            // }
            this.resetBoard(boardstate);
        }
        console.log(allMoves1[bestMoveIndex], 'This is the best move for', color);
        return allMoves1[bestMoveIndex];
    }
    else {
        return 'draw';
    }
}

}
//♟♙♜♖♝♗♞♘♚♔♛♕
