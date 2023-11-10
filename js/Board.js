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
    //         tiles[i][1] = new Pawn(i, 1, COLOUR.BLACK, '♟', -100, false);
    //         tiles[i][6] = new Pawn(i, 6, COLOUR.WHITE, '♙', 100, false);
    //     }
    //     //♟♙♜♖♝♗♞♘♚♔♛♕
    //     tiles[0][0] = new Rook(0, 0, COLOUR.BLACK, '♜', -525);
    //     tiles[7][0] = new Rook(7, 0, COLOUR.BLACK, '♜', -525);
    //     tiles[0][7] = new Rook(0, 7, COLOUR.WHITE, '♖', 525);
    //     tiles[7][7] = new Rook(7, 7, COLOUR.WHITE, '♖', 525);

    //     tiles[2][0] = new Bishop(2, 0, COLOUR.BLACK, '♝', -350);
    //     tiles[5][0] = new Bishop(5, 0, COLOUR.BLACK, '♝', -350);
    //     tiles[2][7] = new Bishop(2, 7, COLOUR.WHITE, '♗', 350);
    //     tiles[5][7] = new Bishop(5, 7, COLOUR.WHITE, '♗', 350);


    //     tiles[1][0] = new Knight(1, 0, COLOUR.BLACK, '♞', -350);
    //     tiles[6][0] = new Knight(6, 0, COLOUR.BLACK, '♞', -350);
    //     tiles[1][7] = new Knight(1, 7, COLOUR.WHITE, '♘', 350);
    //     tiles[6][7] = new Knight(6, 7, COLOUR.WHITE, '♘', 350);

    //     tiles[4][0] = new King(4, 0, COLOUR.BLACK, '♚', -10000);
    //     tiles[4][7] = new King(4, 7, COLOUR.WHITE, '♔', 10000);

    //     tiles[3][0] = new Queen(3, 0, COLOUR.BLACK, '♛', -1000);
    //     tiles[3][7] = new Queen(3, 7, COLOUR.WHITE, '♕', 1000);

    //     return tiles;
    // }

    createTiles() {
        //for specific board positions
        let tiles = this.createEmptyBoard();

        for (let i = 0; i < 8; i++) { 
            tiles[i][1] = new Pawn(i, 1, COLOUR.BLACK, '♟', -100, false);
            tiles[i][6] = new Pawn(i, 6, COLOUR.WHITE, '♙', 100, false);
        }
        //♟♙♜♖♝♗♞♘♚♔♛♕
        tiles[0][0] = new Rook(0, 0, COLOUR.BLACK, '♜', -525);
        tiles[7][0] = new Rook(7, 0, COLOUR.BLACK, '♜', -525);
        tiles[0][7] = new Rook(0, 7, COLOUR.WHITE, '♖', 525);
        tiles[7][7] = new Rook(7, 7, COLOUR.WHITE, '♖', 525);

        tiles[2][0] = new Bishop(2, 0, COLOUR.BLACK, '♝', -350);
        tiles[5][0] = new Bishop(5, 0, COLOUR.BLACK, '♝', -350);
        tiles[2][7] = new Bishop(2, 7, COLOUR.WHITE, '♗', 350);
        tiles[5][7] = new Bishop(5, 7, COLOUR.WHITE, '♗', 350);


        tiles[1][0] = new Knight(1, 0, COLOUR.BLACK, '♞', -350);
        tiles[6][0] = new Knight(6, 0, COLOUR.BLACK, '♞', -350);
        tiles[1][7] = new Knight(1, 7, COLOUR.WHITE, '♘', 350);
        tiles[6][7] = new Knight(6, 7, COLOUR.WHITE, '♘', 350);

        tiles[4][0] = new King(4, 0, COLOUR.BLACK, '♚', -10000);
        tiles[4][7] = new King(4, 7, COLOUR.WHITE, '♔', 10000);

        tiles[3][0] = new Queen(3, 0, COLOUR.BLACK, '♛', -1000);
        tiles[3][7] = new Queen(3, 7, COLOUR.WHITE, '♕', 1000);

        return tiles;
    }

    valueOfPieces(){
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if(this.tiles[i][j] !== undefined){
                    if(this.tiles[i][j].colour == COLOUR.WHITE){
                        this.tiles[i][j].value += this.arrayValueChanger(this.tiles[i][j].sprite)[j][i];
                    }
                    if(this.tiles[i][j].colour == COLOUR.BLACK){
                        this.tiles[i][j].value -= this.arrayValueChanger(this.tiles[i][j].sprite)[j][i];
                    }
                }
                    // if(this.tiles[i][j].sprite == '♜'){
                    //     this.tiles[i][j].value = -525;
                    //     this.tiles[i][j].value -= this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
                    // }
                    // if(this.tiles[i][j].sprite == '♖'){
                    //     this.tiles[i][j].value = 525;
                    //     this.tiles[i][j].value += this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
                    // }
                    // if(this.tiles[i][j].sprite == '♝'){
                    //     this.tiles[i][j].value = -350;
                    //     this.tiles[i][j].value -= this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
                    // }
                    // if(this.tiles[i][j].sprite == '♗'){
                    //     this.tiles[i][j].value = 350;
                    //     this.tiles[i][j].value += this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
                    // }
                    // if(this.tiles[i][j].sprite == '♞'){
                    //     this.tiles[i][j].value = -350;
                    //     this.tiles[i][j].value -= this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
                    // }
                    // if(this.tiles[i][j].sprite == '♘'){
                    //     this.tiles[i][j].value = 350;
                    //     this.tiles[i][j].value += this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
                    // }
                    // if(this.tiles[i][j].sprite == '♚'){
                    //     this.tiles[i][j].value = -10000;
                    //     this.tiles[i][j].value -= this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
                    // }
                    // if(this.tiles[i][j].sprite == '♔'){
                    //     this.tiles[i][j].value = 10000;
                    //     this.tiles[i][j].value += this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
                    // }
                    // if(this.tiles[i][j].sprite == '♛'){
                    //     this.tiles[i][j].value = -1000;
                    //     this.tiles[i][j].value -= this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
                    // }
                    // if(this.tiles[i][j].sprite == '♕'){
                    //     this.tiles[i][j].value = 1000;
                    //     this.tiles[i][j].value += this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
                    // }
                    // if(this.tiles[i][j].sprite == '♜'){
                    //     this.tiles[i][j].value = 525;
                    //     this.tiles[i][j].value += this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
                    // }
                    // if(this.tiles[i][j].sprite == '♟'){
                    //     this.tiles[i][j].value = -100;
                    //     this.tiles[i][j].value -= this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
                    // }
                    // if(this.tiles[i][j].sprite == '♙'){
                    //     this.tiles[i][j].value = 100;
                    //     this.tiles[i][j].value += this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
                    // }
            }
        }
    }

    arrayValueChanger(piece){
        if(piece == '♜'){
            let blackRookArray = [
                [0,0,0,50,50,50,0,0],
                [-50,0,0,0,0,0,0,-50],
                [-50,0,0,0,0,0,0,-50],
                [-50,0,0,0,0,0,0,-50],
                [-50,0,0,0,0,0,0,-50],
                [-50,0,0,0,0,0,0,-50],
                [50,100,100,100,100,100,100,50],
                [0,0,0,0,0,0,0,0]
            ];
            return blackRookArray;
        }
        if(piece == '♖'){
            let whiteRookArray = [
                [0,0,0,50,50,0,0,0],
                [50,100,100,100,100,100,100,50],
                [-50,0,0,0,0,0,0,-50],
                [-50,0,0,0,0,0,0,-50],
                [-50,0,0,0,0,0,0,-50],
                [-50,0,0,0,0,0,0,-50],
                [-50,0,0,0,0,0,0,-50],
                [0,0,0,50,50,50,0,0]
            ];
            return whiteRookArray;
        }
        if(piece == '♞'){
            let blackHorseArray = [
                [-500,-400,-300,-300,-300,-300,-400,-500],
                [-400,-200,0,50,50,0,-200,-400],
                [-300,50,100,150,150,100,50,-300],
                [-300,0,150,200,200,150,0,-300],
                [-300,50,150,200,200,150,50,-300],
                [-300,0,100,150,150,100,0,-300],
                [-400,-200,0,0,0,0,-200,-400],
                [-500,-400,-300,-300,-300,-300,-400,-500]
            ];
            return blackHorseArray;
        }
        if(piece == '♘'){
            let whiteHorseArray = [
                [-500,-400,-300,-300,-300,-300,-400,-500],
                [-400,-200,0,0,0,0,-200,-400],
                [-300,0,100,150,150,100,0,-300],
                [-300,50,150,200,200,150,50,-300],
                [-300,0,150,200,200,150,0,-300],
                [-300,50,100,150,150,100,50,-300],
                [-400,-200,0,50,50,0,-200,-400],
                [-500,-400,-300,-300,-300,-300,-400,-500]
            ];
            return whiteHorseArray;
        }
        if(piece == '♗'){
            let whiteBishopArray = [
                [-200,-100,-100,-100,-100,-100,-100,-200],
                [-100,0,0,0,0,0,0,-100],
                [-100,0,50,100,100,50,0,-100],
                [-100,100,50,100,100,50,100,-100],
                [-100,0,100,100,100,100,0,-100],
                [-100,100,100,0,0,100,100,-100],
                [-100,50,0,0,0,0,50,-100],
                [-200,-100,-100,-100,-100,-100,-100,-200]
            ];
            return whiteBishopArray;
        }
        if(piece == '♝'){
            let blackBishopArray = [
                [-200,-100,-100,-100,-100,-100,-100,-200],
                [-100,50,0,0,0,0,50,-100],
                [-100,100,100,0,0,100,100,-100],
                [-100,0,100,100,100,100,0,-100],
                [-100,100,50,100,100,50,100,-100],
                [-100,0,50,100,100,50,0,-100],
                [-100,0,0,0,0,0,0,-100],
                [-200,-100,-100,-100,-100,-100,-100,-200]
            ];
            return blackBishopArray;
        }
        if(piece == '♕'){
            let whiteQueenArray = [
                [-200,-100,-100,-50,-50,-100,-100,-200],
                [-100,0,0,0,0,0,0,-100],
                [-100,0,50,50,50,50,0,-100],
                [-50,0,50,50,50,50,0,-50],
                [-50,0,50,50,50,50,0,-50],
                [-100,0,50,50,50,50,0,-100],
                [-100,0,0,0,0,0,0,-100],
                [-200,-100,-100,-50,-50,-100,-100,-200]
            ];
            return whiteQueenArray;
        }
        if(piece == '♛'){
            let blackQueenArray = [
                [-200,-100,-100,-50,-50,-100,-100,-200],
                [-100,0,0,0,0,50,0,-100],
                [-100,0,50,50,50,50,0,-100],
                [-50,0,50,50,50,50,0,-50],
                [-50,0,50,50,50,50,0,-50],
                [-100,0,50,50,50,50,0,-100],
                [-100,0,0,0,0,0,0,-100],
                [-200,-100,-100,-50,-50,-100,-100,-200]
            ];
            return blackQueenArray;
        }
        if(piece == '♔'){
            let whiteKingArray = [
                [-300,-400,-400,-500,-500,-400,-400,-300],
                [-300,-400,-400,-500,-500,-400,-400,-300],
                [-300,-400,-400,-500,-500,-400,-400,-300],
                [-300,-400,-400,-500,-500,-400,-400,-300],
                [-200,-300,-300,-400,-400,-300,-300,-200],
                [-100,-200,-200,-200,-200,-200,-200,-100],
                [200,200,0,0,0,0,200,200],
                [200,300,0,0,0,0,300,200]
            ];
            return whiteKingArray;
        }
        if(piece == '♚'){
            let blackKingArray = [
                [200,300,0,0,0,0,300,200],
                [200,200,0,0,0,0,200,200],
                [-100,-200,-200,-200,-200,-200,-200,-100],
                [-200,-300,-300,-400,-400,-300,-300,-200],
                [-300,-400,-400,-500,-500,-400,-400,-300],
                [-300,-400,-400,-500,-500,-400,-400,-300],
                [-300,-400,-400,-500,-500,-400,-400,-300],
                [-300,-400,-400,-500,-500,-400,-400,-300]
            ];
            return blackKingArray;
        }
        if(piece == '♙'){
            let whitePawnArray = [
                [0,0,0,0,0,0,0,0],
                [500, 500, 500, 500, 500, 500, 500, 500],
                [100,100,200,300,300,200,100,100],
                [50,50,100,250,250,100,50,50],
                [0,0,0,200,200,0,0,0],
                [50,-50,-100,0,0,-100,-50,50],
                [50,100,100,-200,-200,100,100,50],
                [0,0,0,0,0,0,0,0]
            ];
            return whitePawnArray;
        }
        if(piece == '♟'){
            let blackPawnArray = [
                [0,0,0,0,0,0,0,0],
                [50,100,100,-200,-200,100,100,50],
                [50,-50,-100,0,0,-100,-50,50],        
                [0,0,0,200,200,0,0,0],
                [50,50,100,250,250,100,50,50],
                [100,100,200,300,300,200,100,100],
                [500, 500, 500, 500, 500, 500, 500, 500],
                [0,0,0,0,0,0,0,0]
            ];
            return blackPawnArray;
        }
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
        const Aicolour = COLOUR.WHITE;
        const playerColour = COLOUR.WHITE;
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
            // if(this.turn !== playerColour){
            //     console.log('hi');
            //     let allMoves1 = this.findAllMoves(playerColour, this.tiles);
            //     if (allMoves1.length === 0 && !this.isInCheck) {
            //         console.log("Draw by stalemate");
            //         fill(10, 10, 10);
            //         textFont("Arial");
            //         text("Draw by stalemate", 400, 400, 500, 500);
            //         //noLoop();
            //     }
            //     if (allMoves1.length !== 0) {
            //         //const boardstate = _.cloneDeep(this.tiles);
            //         let alpha = -20000;
            //         let beta = 20000;
            //         //let bestMove = this.chessLooper(allMoves1, 3, Aicolour, boardstate, alpha, beta);
            //         let isMaximizingPlayer = false;
            //         let bestMove = this.chessLooper(3, this.tiles, playerColour, alpha, beta, isMaximizingPlayer);
            //         this.move(this.tiles[bestMove[1].from.i][bestMove[1].from.j], bestMove[1].to, this.tiles);
            //     }
            //     this.turn = Aicolour;
            // }
        }
        if(this.turn !== Aicolour){
            calculating = true;
            let allMoves = this.findAllMoves(Aicolour, this.tiles);
            console.log(allMoves);
            if (allMoves.length === 0 && !this.isInCheck) {
                console.log("Draw by stalemate");
                fill(10, 10, 10);
                textFont("Arial");
                text("Draw by stalemate", 400, 400, 500, 500);
                //noLoop();
            }
            if (allMoves.length !== 0) {
                let alpha = -20000;
                let beta = 20000;
                let isMaximizingPlayer = true;
                let evaluation = this.evaluator();
                let bestMove = this.chessLooper(4, this.tiles, Aicolour, alpha, beta, isMaximizingPlayer, evaluation.evaluation);
                this.move(this.tiles[bestMove[1].from.i][bestMove[1].from.j], bestMove[1].to, this.tiles);
            }
            this.turn = playerColour;
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
                if (tiles[i][j] != undefined && tiles[i][j].colour == colour){
                    let movesTo = tiles[i][j].findLegalMoves(tiles);
                    if(movesTo != 0){
                        for (let c = movesTo.length - 1; c >= 0; c--) {
                            possibleMove.push({from: {i,j}, to: movesTo[c]});
                        }
                    }
                }
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
                    if(this.tiles[i][j].colour == COLOUR.BLACK){
                        evaluation -= this.arrayValueChanger(this.tiles[i][j].sprite)[i][j]/10;
                    }
                    else{
                        evaluation += this.arrayValueChanger(this.tiles[i][j].sprite)[i][j]/10;
                    }
                    numberOfPieces++;
                    if(this.tiles[i][j].sprite == '♕' || this.tiles[i][j].sprite == '♛'){
                        numberOfQueens++;
                    }
                    if(this.tiles[i][j].sprite == '♜' || this.tiles[i][j].sprite == '♖'){
                        numberOfRooks++;
                    }
                    if(this.tiles[i][j].sprite == '♝' || this.tiles[i][j].sprite == '♗'){
                        numberOfBishops++;
                    }
                    if(this.tiles[i][j].sprite == '♞' || this.tiles[i][j].sprite == '♘'){
                        numberOfKnights++;
                    }
                }
                //♟♙♜♖♝♗♞♘♚♔♛♕
            }
        }
        return {evaluation, numberOfPieces, numberOfQueens, numberOfRooks, numberOfBishops, numberOfKnights};
    }

    resetBoard(BoardNeedsToBecome) {
        this.tiles = _.cloneDeep(BoardNeedsToBecome);
    }

    shouldITradeEqual (color, moveValue, maxMoveValue) {
        if (color === COLOUR.BLACK) {
            return moveValue <= maxMoveValue;
        }
        return moveValue >= maxMoveValue;
    }

    shouldITradeNotEqual (color, moveValue, maxMoveValue) {
        if (color === COLOUR.BLACK) {
            return moveValue < maxMoveValue;
        }
        return moveValue > maxMoveValue;
    }

    chessLooper (depth, game, playerColor, alpha, beta, isMaximizingPlayer, originalEvaluation) {        
        let value = undefined;
        let evaluation = originalEvaluation
        if (depth == 0) {
            // if (possibleMoves.length === 0) {
            //     this.isInCheck = CheckFinder.isCurrentPlayerInCheck(this.tiles, playerColor);
            //     if (this.isInCheck) {
            //         evaluation = 19000;
            //     }
            //     if (!this.isInCheck) {
            //         evaluation = 0;
            //     }
            // }
            //value = this.evaluator().evaluation;
            return [originalEvaluation, null];
        }
        playerColor = playerColor === COLOUR.WHITE ? COLOUR.BLACK : COLOUR.WHITE;
        let possibleMoves = this.findAllMoves(playerColor, this.tiles);
        let tilesCopy = _.cloneDeep(this.tiles);
        isMaximizingPlayer = isMaximizingPlayer === true ? false : true;
        let bestMove = null;
        possibleMoves = shuffle(possibleMoves, true);
        let bestMoveValue = isMaximizingPlayer ? -20000 : 20000;

        for (var j = 0; j < possibleMoves.length; j++) {
            var move = possibleMoves[j];
            if(this.tiles[move.to.x][move.to.y] !== undefined){
                evaluation -= this.tiles[move.to.x][move.to.y].value;
                //console.log(this.tiles[move.to.x][move.to.y].value, this.arrayValueChanger(this.tiles[move.to.x][move.to.y].sprite)[move.to.x][move.to.y]/10);
                if(this.tiles[move.to.x][move.to.y].colour == COLOUR.BLACK){
                    evaluation += this.arrayValueChanger(this.tiles[move.to.x][move.to.y].sprite)[move.to.y][move.to.x]/10;
                }
                else{
                    evaluation -= this.arrayValueChanger(this.tiles[move.to.x][move.to.y].sprite)[move.to.y][move.to.x]/10;
                }
            }
            if(this.tiles[move.from.i][move.from.j] !== undefined){
                if(this.tiles[move.from.i][move.from.j].colour == COLOUR.BLACK){
                    evaluation -= this.arrayValueChanger(this.tiles[move.from.i][move.from.j].sprite)[move.to.y][move.to.x]/10;
                }
                else{
                    evaluation += this.arrayValueChanger(this.tiles[move.from.i][move.from.j].sprite)[move.to.y][move.to.x]/10;
                }
            }

            this.move(this.tiles[move.from.i][move.from.j], move.to, this.tiles);
            value = JSON.parse(JSON.stringify(this.chessLooper(depth-1, game, playerColor, alpha, beta, isMaximizingPlayer, evaluation)[0]));
            if(this.tiles[move.to.x][move.to.y] !== undefined){
                evaluation = originalEvaluation;
            }
            if (isMaximizingPlayer) {
                if (value > bestMoveValue) {
                    bestMoveValue = value;
                    bestMove = move;
                }
                alpha = Math.max(alpha, value);
            } else {
                if (value < bestMoveValue) {
                    bestMoveValue = value;
                    bestMove = move;
                }
                beta = Math.min(beta, value);
            }
            this.resetBoard(tilesCopy);

            if (beta <= alpha) {
                break;
            }
        }
        return [bestMoveValue, bestMove || possibleMoves[0]];
    }
    
    // chessLooper (allMoves1, depth, color, boardstate, alpha, beta) {
    //     if (allMoves1.length === 0) {
    //         this.isInCheck = CheckFinder.isCurrentPlayerInCheck(boardstate, this.turn);
    //         if (this.isInCheck) {
    //             return 'checkmate';
    //         }
    //         if (!this.isInCheck) {
    //             return 'draw';
    //         }
    //     }

    //     let colour = color === COLOUR.WHITE ? COLOUR.BLACK : COLOUR.WHITE;
    //     let bestMoveIndex = -1;
    //     let bestMove = undefined;
    //     let bestMoveValue = color === COLOUR.WHITE ? -20000 : 20000;
    //     let evaluation = this.evaluator();
    //     let allLegitMoves = [];

    //     // if (colour == COLOUR.BLACK) {
    //     //     colour = COLOUR.WHITE;
    //     //     //maxMoveValue = Number.POSITIVE_INFINITY;
    //     //     maxMoveValue = 20000;
    //     // }
    //     // else {
    //     //     colour = COLOUR.BLACK;
    //     //     //maxMoveValue = Number.NEGATIVE_INFINITY;
    //     //     maxMoveValue = -20000;
    //     // }

    //     if (evaluation.numberOfPieces == 3 && evaluation.numberOfQueens == 1){
    //         return this.checkMateForQueen();
    //         //console.log(allMoves1[bestMoveIndex]);
    //     }

    //     for (let j = 0; j < allMoves1.length; j++) {
    //         this.move(this.tiles[allMoves1[j].from.i][allMoves1[j].from.j], allMoves1[j].to, this.tiles);
    //         if (depth > 0) {
    //             let copyOfTiles = _.cloneDeep(this.tiles);
    //             bestMove = this.chessLooper(this.findAllMoves(colour, this.tiles), depth-1, colour, copyOfTiles, alpha, beta);
    //             if  (bestMove == 'draw')    {
    //                 allMoves1[j].valueOfMove = 0;
    //             }
    //             if  (bestMove == 'checkmate')   {
    //                 if (colour == COLOUR.BLACK) {
    //                     allMoves1[j].valueOfMove = 20000;
    //                 }
    //                 else {
    //                     allMoves1[j].valueOfMove = -20000;
    //                 }
    //                 console.log('checkmate');
    //             }
    //             else    {
    //                 allMoves1[j].valueOfMove = bestMove.valueOfMove;
    //             }
    //         }
    //         else {
    //             allMoves1[j].valueOfMove = evaluation.evaluation;
    //         }

    //         if (color === COLOUR.WHITE) {
    //             if(allMoves1[j].valueOfMove >= bestMoveValue) {
    //                 bestMoveValue = allMoves1[j].valueOfMove;
    //                 alpha = allMoves1[j].valueOfMove;
    //                 allLegitMoves.push(allMoves1[j]);
    //                 bestMoveIndex = j;
    //             }
    //             //alpha = Math.max(alpha, allMoves1[j].valueOfMove);
    //         }
    //         else {
    //             if(allMoves1[j].valueOfMove <= bestMoveValue) {
    //                 bestMoveValue = allMoves1[j].valueOfMove;
    //                 beta = allMoves1[j].valueOfMove;
    //                 allLegitMoves.push(allMoves1[j]);
    //                 bestMoveIndex = j;
    //             }
    //             //beta = Math.min(beta, allMoves1[j].valueOfMove);
    //         }
    //         if(allMoves1[j].valueOfMove > bestMoveValue) {
    //             allLegitMoves.length = 0;
    //         }

    //         // if(this.shouldITradeNotEqual(color, allMoves1[j].valueOfMove, maxMoveValue)){
    //         //     allLegitMoves.length = 0;
    //         // }
    //         // if (this.shouldITradeEqual(color, allMoves1[j].valueOfMove, maxMoveValue)) {
    //         //     if(this.shouldITradeNotEqual(color, allMoves1[j].valueOfMove, maxMoveValue)){
    //         //         allLegitMoves.length = 0;
    //         //     }
    //         //     maxMoveValue = allMoves1[j].valueOfMove;
    //         //     allLegitMoves.push(allMoves1[j]);
    //         // }

    //         // deze if statement terug halen en die hierboven weg om random moves weg te halen. Ook de returns omwisselen
    //         // if (this.shouldITradeEqual(color, allMoves1[j].valueOfMove, maxMoveValue)) {
    //         //     maxMoveValue = allMoves1[j].valueOfMove;
    //         //     bestMoveIndex = j;
    //         // }
    //         // if (color === COLOUR.WHITE) {
    //         //     if (beta >= alpha) {
    //         //         console.log('prune ', alpha, beta);
    //         //         break;
    //         //     }
    //         // }
    //         // else {
    //             // if (beta <= alpha) {
    //             //     break;
    //             // }
    //         // }

    //         this.resetBoard(boardstate);
    //     }
    //     //let randomMove = random(allLegitMoves);
    //     //return randomMove;
    //     return allMoves1[bestMoveIndex];
    // }

    checkMateForQueen(tiles){
        if(this.tiles[i][j].sprite == '♚'){
            cosole.log('test');
        }
    }
    // AlphaBeta(depth, int alpha, int beta) { 
    //     if (depth == 0) {
    //         return Evaluate(); 
    //     }
    //     GenerateLegalMoves(); 
    //     while (MovesLeft()) {
    //         MakeNextMove(); 
    //         val = -AlphaBeta(depth - 1, -beta, -alpha); 
    //         UnmakeMove(); 
    //         if (val >= beta) {
    //             return beta; 
    //         }
    //         if (val > alpha) {
    //             alpha = val; 
    //         }
    //     }
    //     return alpha; 
    // }

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

}//♟♙♜♖♝♗♞♘♚♔♛♕

