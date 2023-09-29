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
        }
        if(this.turn === COLOUR.BLACK){
            let Boardstate = this.tiles;
            calculating = true;
            let {validAttackingMoves1, possibleMovables1} = this.findAttackingMoves(1, 'BLACK');
            if (possibleMovables1.length === 0 && !this.isInCheck) {
                console.log("Draw by stalemate");
                fill(10, 10, 10);
                textFont("Arial");
                text("Draw by stalemate", 400, 400, 500, 500);
                noLoop();
            }
            let rMGActive = true;
            if (possibleMovables1.length !== 0) {
                let bestMove1 = validAttackingMoves1[0];
                if (bestMove1 !== undefined) {
                    let calculating = true;
                    let nextBestMove = 1;
                    while (calculating) {
                        let valueOfAttackedSquare = this.tiles[bestMove1.to.x][bestMove1.to.y].value;
            
                        //HIER WORDT VOOR WHITE
                        let {validAttackingMoves2, possibleMovables2} = this.findAttackingMoves(2, 'WHITE');
                        if (possibleMovables2.length !== 0) {
                            let bestMove2 = validAttackingMoves2[0];
                            if (bestMove2 !== undefined) {
                                if (abs(this.tiles[bestMove1.from.i][bestMove1.from.j].value) > abs(valueOfAttackedSquare)) {
                                    bestMove1 = validAttackingMoves1[nextBestMove];
                                    nextBestMove++;
                                    this.resetBoard(Boardstate);
                                    break;
                                }
                            }
                        }
                        // TOT AAN HIER
                        this.move(this.tiles[bestMove1.from.i][bestMove1.from.j], bestMove1.to);
                        rMGActive = false;
                        calculating = false;
                    }
                }
            }

            let movesTo = [];            
            if (possibleMovables1.length !== 0 && rMGActive){
                let a = possibleMovables1[int(random(0,possibleMovables1.length))];
                movesTo = this.tiles[a.i][a.j].findLegalMoves(this.tiles);
                let b = movesTo[int(random(0,movesTo.length))];
                this.move(this.tiles[a.i][a.j], b);
            }

            //console.log(currentPosition);
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
        this.tiles[from.x][from.y].userMove(to.x, to.y, this.tiles);
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
    // if(wherePieceMovesTo != undefined && this.tiles[wherePieceMovesTo.x][wherePieceMovesTo.y] != undefined){
    //     evaluation -= this.tiles[wherePieceMovesTo.x][wherePieceMovesTo.y].value;
    // }
    return evaluation;
}

arraySorter(arrayToSort) {
    let attackingMove_1 = [];
    let attackingMove_3 = [];
    let attackingMove_5 = [];
    let attackingMove_10 = [];
    let attackingMove_900 = []; 
    for(let i = 0; i<arrayToSort.length; i++){
        if(abs(this.tiles[arrayToSort[i].to.x][arrayToSort[i].to.y].value) === 1){
            attackingMove_1.push(arrayToSort[i]);
        }
        if(abs(this.tiles[arrayToSort[i].to.x][arrayToSort[i].to.y].value) === 3){
            attackingMove_3.push(arrayToSort[i]);
        }
        if(abs(this.tiles[arrayToSort[i].to.x][arrayToSort[i].to.y].value) === 5){
            attackingMove_5.push(arrayToSort[i]);
        }
        if(abs(this.tiles[arrayToSort[i].to.x][arrayToSort[i].to.y].value) === 10){
            attackingMove_10.push(arrayToSort[i]);
        }
        if(abs(this.tiles[arrayToSort[i].to.x][arrayToSort[i].to.y].value) === 900){
            attackingMove_900.push(arrayToSort[i]);
        }
    }
    arrayToSort = [];
    arrayToSort = arrayToSort.concat(attackingMove_900, attackingMove_10, attackingMove_5, attackingMove_3, attackingMove_1);
    return arrayToSort
}

findAttackingMoves(nameArray, colour){
    let validAttackMoves = [];
    let possibleMovable = [];
    let validAttackingMoves = `validAttackingMoves${nameArray}`;
    let possibleMovables = `possibleMovables${nameArray}`;
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
                        possibleMovable.push ({i,j});
                    }
                }
            }
        }
    }
    for (let c = 0; c < possibleMovable.length; c++) {
        let movesTo = this.tiles[possibleMovable[c].i][possibleMovable[c].j].findLegalMoves(this.tiles);
        for (let j = movesTo.length - 1; j >= 0; j--) {
            if (this.tiles[movesTo[j].x][movesTo[j].y] !== undefined) {
                validAttackMoves.push({from: possibleMovable[c], to: movesTo[j]});
            } 
        }
    }
    validAttackMoves = this.arraySorter(validAttackMoves);
    return { [validAttackingMoves]: validAttackMoves, [possibleMovables]: possibleMovable };
}

resetBoard(BoardneedsToBecome) {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            const pieceData = BoardneedsToBecome[i][j];
            if (pieceData) {
                let newPiece;
                switch (pieceData.sprite) {
                    case '♟':
                    case '♙':
                        newPiece = new Pawn(i, j, pieceData.colour, pieceData.sprite, pieceData.value);
                        break;
                    case '♜':
                    case '♖':
                        newPiece = new Rook(i, j, pieceData.colour, pieceData.sprite, pieceData.value);
                        break;
                    case '♝':
                    case '♗':
                        newPiece = new Bishop(i, j, pieceData.colour, pieceData.sprite, pieceData.value);
                        break;
                    case '♞':
                    case '♘':
                        newPiece = new Knight(i, j, pieceData.colour, pieceData.sprite, pieceData.value);
                        break;
                    case '♚':
                    case '♔':
                        newPiece = new King(i, j, pieceData.colour, pieceData.sprite, pieceData.value);
                        break;
                    case '♛':
                    case '♕':
                        newPiece = new Queen(i, j, pieceData.colour, pieceData.sprite, pieceData.value);
                        break;
                    default:
                        newPiece = undefined;
                        break;
                }
                this.tiles[i][j] = newPiece;
            } else {
                this.tiles[i][j] = undefined;
            }
        }
    }
}
}
//♟♙♜♖♝♗♞♘♚♔♛♕
