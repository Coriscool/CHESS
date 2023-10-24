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

    // createTiles() {
    //     let tiles = this.createEmptyBoard();

    //     for (let i = 0; i < 8; i++) { 
    //         tiles[i][1] = new Pawn(i, 1, COLOUR.BLACK, '♟', -1, false);
    //         tiles[i][6] = new Pawn(i, 6, COLOUR.WHITE, '♙', 1, false);
    //     }
    //     //♟♙♜♖♝♗♞♘♚♔♛♕
    //     tiles[0][0] = new Rook(0, 0, COLOUR.BLACK, '♜', -5);
    //     tiles[7][0] = new Rook(7, 0, COLOUR.BLACK, '♜', -5);
    //     tiles[0][7] = new Rook(0, 7, COLOUR.WHITE, '♖', 5);
    //     tiles[7][7] = new Rook(7, 7, COLOUR.WHITE, '♖', 5);

    //     tiles[2][0] = new Bishop(2, 0, COLOUR.BLACK, '♝', -3);
    //     tiles[5][0] = new Bishop(5, 0, COLOUR.BLACK, '♝', -3);
    //     tiles[2][7] = new Bishop(2, 7, COLOUR.WHITE, '♗', 3);
    //     tiles[5][7] = new Bishop(5, 7, COLOUR.WHITE, '♗', 3);


    //     tiles[1][0] = new Knight(1, 0, COLOUR.BLACK, '♞', -3);
    //     tiles[6][0] = new Knight(6, 0, COLOUR.BLACK, '♞', -3);
    //     tiles[1][7] = new Knight(1, 7, COLOUR.WHITE, '♘', 3);
    //     tiles[6][7] = new Knight(6, 7, COLOUR.WHITE, '♘', 3);

    //     tiles[4][0] = new King(4, 0, COLOUR.BLACK, '♚', -200);
    //     tiles[4][7] = new King(4, 7, COLOUR.WHITE, '♔', 200);

    //     tiles[3][0] = new Queen(3, 0, COLOUR.BLACK, '♛', -10);
    //     tiles[3][7] = new Queen(3, 7, COLOUR.WHITE, '♕', 10);

    //     return tiles;
    // }

    createTiles() {
        //for specific board positions
        let tiles = this.createEmptyBoard();

        // for (let i = 0; i < 8; i++) { 
        //     tiles[i][1] = new Pawn(i, 1, COLOUR.BLACK, '♟', -1, false);
        //     tiles[i][6] = new Pawn(i, 6, COLOUR.WHITE, '♙', 1, false);
        // }
        //♟♙♜♖♝♗♞♘♚♔♛♕
        tiles[0][0] = new Rook(0, 0, COLOUR.BLACK, '♜', -5);
        tiles[7][0] = new Rook(7, 0, COLOUR.BLACK, '♜', -5);
        tiles[0][7] = new Rook(0, 7, COLOUR.WHITE, '♖', 5);
        tiles[7][7] = new Rook(7, 7, COLOUR.WHITE, '♖', 5);

        //tiles[2][0] = new Bishop(2, 0, COLOUR.BLACK, '♝', -3);
        //tiles[5][0] = new Bishop(5, 0, COLOUR.BLACK, '♝', -3);
        //tiles[2][7] = new Bishop(2, 7, COLOUR.WHITE, '♗', 3);
        //tiles[5][7] = new Bishop(5, 7, COLOUR.WHITE, '♗', 3);


        //tiles[1][0] = new Knight(1, 0, COLOUR.BLACK, '♞', -3);
        //tiles[6][0] = new Knight(6, 0, COLOUR.BLACK, '♞', -3);
        //tiles[1][7] = new Knight(1, 7, COLOUR.WHITE, '♘', 3);
        //tiles[6][7] = new Knight(6, 7, COLOUR.WHITE, '♘', 3);

        tiles[4][0] = new King(4, 0, COLOUR.BLACK, '♚', -200);
        tiles[4][7] = new King(4, 7, COLOUR.WHITE, '♔', 200);

        //tiles[3][0] = new Queen(3, 0, COLOUR.BLACK, '♛', -10);
        //tiles[3][7] = new Queen(3, 7, COLOUR.WHITE, '♕', 10);

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
        const Aicolour = COLOUR.BLACK;
        const PlayerColour = COLOUR.WHITE;
        if(!calculating){
            // if (this.isInCheck) {
            //     let moves = CheckFinder.findMovesForCheckedPlayer(this.tiles, this.turn);
            //     if (moves.length === 0) {
            //         console.log('Checkmate');
            //         fill(10,10,10);
            //         textFont('Arial');
            //         text('Checkmate',400,400,500,500);
            //         noLoop();
            //     }
            // }
            // else{
                this.select(x,y);
            //}
            //console.clear();
        }
        if(this.turn === Aicolour){
            calculating = true;
            let allMoves1 = this.findAllMoves(Aicolour, this.tiles);
            if (allMoves1.length === 0 && !this.isInCheck) {
                console.log("Draw by stalemate");
                fill(10, 10, 10);
                textFont("Arial");
                text("Draw by stalemate", 400, 400, 500, 500);
                //noLoop();
            }
            if (allMoves1.length !== 0) {
                const boardstate = _.cloneDeep(this.tiles);
                let bestMove = this.chessLooper(allMoves1, 3, Aicolour, boardstate);
                this.move(this.tiles[bestMove.from.i][bestMove.from.j], bestMove.to, this.tiles);
            }
            this.turn = PlayerColour;
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
                this.move(this.selected, potentialMove, this.tiles);
            } else {
                this.selected = undefined;
            }
        } 
    }

    move(from, to, board) {
        if(from.sprite == '♟' || from.sprite == '♙'){
            for(let i = 0; i<8; i++){
                for(let j = 0; j<8; j++){
                    if (board[i][j] != undefined){
                        if (board[i][j].sprite == '♟') {
                            if (board[i][j].flag && to.y == j-1 && to.x == i) {
                                board[i][j] = undefined;
                                continue;
                            }
                            board[i][j].flag = false;
                        }
                        if (board[i][j].sprite == '♙') {
                            if (board[i][j].flag && to.y == j+1 && to.x == i) {
                                board[i][j] = undefined;
                                continue;
                            }
                            board[i][j].flag = false;
                        }
                    }
                }
            }
        }
        if ((from.y - to.y == 2 || from.y - to.y == -2) && (from.sprite == '♟' || from.sprite == '♙')) {      
            board[from.x][from.y].flag = true;   
        }
        this.turn = this.turn === COLOUR.WHITE ? COLOUR.BLACK : COLOUR.WHITE;
        //DEZE IF STATEMENT WAS ER NIET EN OOK NIET WAT IN DE ELSE STAAT
        if(to.i === undefined){
            board[from.x][from.y].userMove(to.x, to.y, board);
        }
        else {
            board[from.x][from.y].userMove(to.i, to.j, board);
        }
        this.selected = undefined;

        this.isInCheck = CheckFinder.isCurrentPlayerInCheck(board, this.turn);

        if (this.isInCheck) {
            let moves = CheckFinder.findMovesForCheckedPlayer(board, this.turn);
            if (moves.length === 0) {
                fill(10,10,10);
                textFont('Arial');
                text('Checkmate',400,400,50,50);
                //noLoop();
            }
        }
    }


    isOffBoard(x, y) {
        return x > 7 || x < 0 || y > 7 || y < 0;
    }

    findAllMoves (colour, tiles) {
        let possibleMovable = [];
        let possibleMove = [];
        for(let i = 0; i<8; i++){
            for(let j = 0; j<8; j++){
                if(colour === COLOUR.WHITE) {
                    if (tiles[i][j] != undefined && tiles[i][j].colour == COLOUR.WHITE){
                        this.legalMoves = tiles[i][j].findLegalMoves(tiles);
                        if(this.legalMoves != 0){
                            possibleMovable.push ({i,j});
                        }
                    }
                }
                if (colour === COLOUR.BLACK) {
                    if (tiles[i][j] != undefined && tiles[i][j].colour == COLOUR.BLACK){
                        this.legalMoves = tiles[i][j].findLegalMoves(tiles);
                        if(this.legalMoves != 0){
                            possibleMovable.push ({i,j});
                        }
                    }
                }
            }
        }
        for (let c = 0; c < possibleMovable.length; c++) {  
            let movesTo = tiles[possibleMovable[c].i][possibleMovable[c].j].findLegalMoves(tiles);
            for (let j = movesTo.length - 1; j >= 0; j--) {
                possibleMove.push({from: possibleMovable[c], to: movesTo[j], valueOfMove: undefined});
            }
        }
        return possibleMove;
    }

    evaluator() {
        let evaluation = 0;
        let numberOfQueens = 0;
        let numberOfRooks = 0;
        let numberOfBishops = 0;
        let numberOfPieces = 0;
        let numberOfKnights = 0;
        for(let i = 0; i<8; i++){
            for(let j = 0; j<8; j++){
                if(this.tiles[i][j] != undefined){
                    evaluation += this.tiles[i][j].value;
                    numberOfPieces++;
                }
                if(this.tiles[i][j] == '♕' || this.tiles[i][j] == '♛'){
                    numberOfQueens++;
                }
                if(this.tiles[i][j] == '♜' || this.tiles[i][j] == '♖'){
                    numberOfRooks++;
                }
                if(this.tiles[i][j] == '♝' || this.tiles[i][j] == '♗'){
                    numberOfBishops++;
                }
                if(this.tiles[i][j] == '♞' || this.tiles[i][j] == '♘'){
                    numberOfKnights++;
                }
                //♟♙♜♖♝♗♞♘♚♔♛♕
            }
        }
        return {evaluation, numberOfPieces, numberOfQueens, numberOfRooks, numberOfBishops, numberOfKnights};
    }

    resetBoard(BoardNeedsToBecome) {
        this.tiles = _.cloneDeep(BoardNeedsToBecome);
    }

    shouldITrade (color, moveValue, maxMoveValue) {
        if (color === COLOUR.BLACK) {
            return moveValue <= maxMoveValue;
        }
        return moveValue >= maxMoveValue;
    }

    chessLooper (allMoves1, depth, color, boardstate) {
        if (allMoves1.length === 0) {
            this.isInCheck = CheckFinder.isCurrentPlayerInCheck(boardstate, this.turn);
            if (this.isInCheck) {
                return 'checkmate';
            }
            if (!this.isInCheck) {
                return 'draw';
            }
        }
        let colour = color;
        let bestMoveIndex = -1;
        let bestMove = undefined;
        let maxMoveValue = undefined;
        let evaluation = this.evaluator();

        if (colour == COLOUR.BLACK) {
            colour = COLOUR.WHITE;
            maxMoveValue = 500;
        }
        else {
            colour = COLOUR.BLACK;
            maxMoveValue = -500;
        }

        depth --;
        // if (evaluation.numberOfPieces == 10 || evaluation.numberOfPieces == 11){
        //     depth = 4;
        // }

        for (let j = 0; j < allMoves1.length; j++) {
            this.move(this.tiles[allMoves1[j].from.i][allMoves1[j].from.j], allMoves1[j].to, this.tiles);

            if (evaluation.numberOfPieces == 3 && evaluation.numberOfQueens == 1){
                return this.checkMateForQueen();
                //allMoves1[bestMoveIndex]
            }

            if (depth > 0) {
                let copyOfTiles = _.cloneDeep(this.tiles);
                bestMove = this.chessLooper(this.findAllMoves(colour, this.tiles), depth, colour, copyOfTiles);
                if  (bestMove == 'draw')    {
                    allMoves1[j].valueOfMove = 0;
                }
                if  (bestMove == 'checkmate')   {
                    if (colour == COLOUR.BLACK) {
                        allMoves1[j].valueOfMove = 500;
                        console.log(allMoves1[j].valueOfMove);
                    }
                    else {
                        allMoves1[j].valueOfMove = -500;
                        console.log(allMoves1[j].valueOfMove);
                    }
                }
                else    {
                    allMoves1[j].valueOfMove = bestMove.valueOfMove;
                }
            }
            else {
                allMoves1[j].valueOfMove = evaluation.evaluation;
            }

            if (this.shouldITrade(color, allMoves1[j].valueOfMove, maxMoveValue)) {
                maxMoveValue = allMoves1[j].valueOfMove;
                bestMoveIndex = j;
            }
            this.resetBoard(boardstate);
        }
        console.log('calculating...');
        return allMoves1[bestMoveIndex];
    }

    checkMateForQueen(){
        
    }

    //Dit hieronder is mijn poging om minder _.deepclone() the gebruiken...

    // evaluator(boardToEvaluate) {
    //     let evaluation = 0;
    //     for(let i = 0; i<8; i++){
    //         for(let j = 0; j<8; j++){
    //             if(boardToEvaluate[i][j] != undefined){
    //                 evaluation += boardToEvaluate[i][j].value;
    //             }
    //         }
    //     }
    //     console.log(boardToEvaluate);
    //     return evaluation;
    // }

    // resetBoard(boardstate, boardToReset){
    //     boardToReset[boardstate.from.x][boardstate.from.y] = _.cloneDeep(boardstate.from);
    //     if (boardstate.to === undefined) {
    //         boardToReset[boardstate.toX][boardstate.toY] = undefined;
    //     }
    //     else {
    //         boardToReset[boardstate.toX][boardstate.toY] = _.cloneDeep(boardstate.to);
    //     }
    // }

    // chessLooper (allMoves1, depth, color, boardImput) {
    //     if (allMoves1.length === 0) {
    //         this.isInCheck = CheckFinder.isCurrentPlayerInCheck(boardImput, this.turn);
    //         console.log(this.isInCheck, 'hi');
    //         if (this.isInCheck) {
    //             console.log('could be checkmate');
    //             return 'checkmate';
    //         }
    //         if (!this.isInCheck) {
    //             console.log('could be draw');
    //             return 'draw';
    //         }
    //     }
        
    //     let colour = color;
    //     //const boardstate = _.cloneDeep(this.tiles);
    //     let bestMoveIndex = -1;
    //     let bestMove = undefined;
    //     let maxMoveValue = undefined;

    //     if (colour == COLOUR.BLACK) {
    //         colour = COLOUR.WHITE;
    //         maxMoveValue = 1000;
    //     }
    //     else {
    //         colour = COLOUR.BLACK;
    //         maxMoveValue = -1000;
    //     }

    //     depth --;

    //     for (let j = 0; j < allMoves1.length; j++) {
    //         let boardstate = undefined;
    //         if(boardImput[allMoves1[j].to.x][allMoves1[j].to.y] == undefined){
    //             //boardstate = {from: JSON.parse(JSON.stringify(this.tiles[allMoves1[j].from.i][allMoves1[j].from.j])), to: undefined, toX: allMoves1[j].to.x, toY: allMoves1[j].to.y};
    //             let pieceIMovedFrom = _.cloneDeep(boardImput[allMoves1[j].from.i][allMoves1[j].from.j]);
    //             boardstate = {from: pieceIMovedFrom, to: undefined, toX: allMoves1[j].to.x, toY: allMoves1[j].to.y};
    //         }
    //         else{
    //             //boardstate = {from: JSON.parse(JSON.stringify(this.tiles[allMoves1[j].from.i][allMoves1[j].from.j])), to: JSON.parse(JSON.stringify(this.tiles[allMoves1[j].to.x][allMoves1[j].to.y])), toX: JSON.parse(JSON.stringify(allMoves1[j].to.x)), toY: JSON.parse(JSON.stringify(allMoves1[j].to.y))};
    //             let pieceIMovedFrom = _.cloneDeep(boardImput[allMoves1[j].from.i][allMoves1[j].from.j]);
    //             boardstate = {from: pieceIMovedFrom, to: boardImput[allMoves1[j].to.x][allMoves1[j].to.y], toX: allMoves1[j].to.x, toY: allMoves1[j].to.y}
    //         }

    //         this.move(boardImput[allMoves1[j].from.i][allMoves1[j].from.j], allMoves1[j].to, boardImput);
            
    //         if (depth > 0) {
    //             bestMove = this.chessLooper(this.findAllMoves(colour, boardImput), depth, colour, boardImput);
    //             if  (bestMove == 'draw')    {
    //                  console.log(bestMove, 'draw');
    //                  allMoves1[j].valueOfMove = 0;
    //              }
    //              if  (bestMove == 'checkmate')   {
    //                  console.log(bestMove, 'checkmate');
    //                  allMoves1[j].valueOfMove = -1*maxMoveValue;
    //              }
    //              else    {
    //                  allMoves1[j].valueOfMove = bestMove.valueOfMove;
    //              }
    //         }
    //         else {
    //             console.log('calculating...');
    //             allMoves1[j].valueOfMove = this.evaluator(boardImput);
    //         }

    //         if (this.shouldITrade(color, allMoves1[j].valueOfMove, maxMoveValue)) {
    //             maxMoveValue = allMoves1[j].valueOfMove;
    //             bestMoveIndex = j;
    //         }
    //         this.resetBoard(boardstate, boardImput);
    //     }
    //     return allMoves1[bestMoveIndex];
    // }
}
//♟♙♜♖♝♗♞♘♚♔♛♕
