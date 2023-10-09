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
            // const boardstate = _.cloneDeep(this.tiles);
            // let {validAttackingMoves1, possibleMovables1} = this.findAttackingMoves(1, 'BLACK');
            // //let allMoves = this.findAllMoves(1, 'BLACK');
            // console.log(allMoves);
            // if (possibleMovables1.length === 0 && !this.isInCheck) {
            //     console.log("Draw by stalemate");
            //     fill(10, 10, 10);
            //     textFont("Arial");
            //     text("Draw by stalemate", 400, 400, 500, 500);
            //     noLoop();
            // }
            // let rMGActive = true;
            // let movesThatShouldNotBeMade = [];
            // if (validAttackingMoves1.length !== 0) {
            //     let maxMoveValue = 0;
            //     let bestMoveIndex = -1;
            //     for(let j = 0; j < validAttackingMoves1.length; j++) {
            //             let valueOfWhitePiece = this.tiles[validAttackingMoves1[j].to.x][validAttackingMoves1[j].to.y].value;
            //             console.log(validAttackingMoves1[j]);
            //             this.move(this.tiles[validAttackingMoves1[j].from.i][validAttackingMoves1[j].from.j], validAttackingMoves1[j].to);
            //             let {validAttackingMoves2} = this.findAttackingMoves(2, 'WHITE');
            //             let moveValue = undefined;
            //             validAttackingMoves1[j].valueOfMove = valueOfWhitePiece
            //             console.log(valueOfWhitePiece,  '+');
            //             if(validAttackingMoves2.length !== 0){
            //                 let whiteCanTakeBack = false
            //                 let valueOfBlackPiece = -1;
            //                 let maxMoveValue2 = 0;
            //                 for(let i = 0; i < validAttackingMoves2.length; i++) {
            //                     console.log(validAttackingMoves2[i]);
            //                     if (valueOfBlackPiece < maxMoveValue2) {
            //                         valueOfBlackPiece = this.tiles[validAttackingMoves2[i].to.x][validAttackingMoves2[i].to.y].value;
            //                         maxMoveValue2 = valueOfBlackPiece;
            //                         console.log(maxMoveValue2);
            //                     }
            //                     validAttackingMoves2[i].valueOfMove = valueOfWhitePiece + valueOfBlackPiece;
            //                     whiteCanTakeBack = true;
            //                 }
            //                 if(whiteCanTakeBack){
            //                     console.log(valueOfBlackPiece, ' =');
            //                     validAttackingMoves1[j].valueOfMove += valueOfBlackPiece;
            //                 }
            //             }
            //             console.log(validAttackingMoves1[j].valueOfMove);
            //             moveValue = validAttackingMoves1[j].valueOfMove;
            //             if (moveValue >= maxMoveValue) {
            //                 maxMoveValue = moveValue;
            //                 bestMoveIndex = j;
            //             }
            //             else {
            //                 movesThatShouldNotBeMade.push(validAttackingMoves1[j]);
            //             }
            //             this.resetBoard(boardstate);
            //         }
            //     if (bestMoveIndex !== -1) {
            //         console.log('Best move:', validAttackingMoves1[bestMoveIndex]);
            //         this.move(this.tiles[validAttackingMoves1[bestMoveIndex].from.i][validAttackingMoves1[bestMoveIndex].from.j], validAttackingMoves1[bestMoveIndex].to);
            //         rMGActive = false;
            //     }
            // }
            const boardstate = _.cloneDeep(this.tiles);
            let allMoves1 = this.findAllMoves('BLACK');
            if (allMoves1.length === 0 && !this.isInCheck) {
                console.log("Draw by stalemate");
                fill(10, 10, 10);
                textFont("Arial");
                text("Draw by stalemate", 400, 400, 500, 500);
                noLoop();
            }
            let rMGActive = true;
            let movesThatShouldNotBeMade = [];
            if (allMoves1.length !== 0) {
                let maxMoveValue = 0;
                let bestMoveIndex = -1;
                for(let j = 0; j < allMoves1.length; j++) {
                    if(this.tiles[allMoves1[j].to.x][allMoves1[j].to.y] !== undefined){
                        let valueOfWhitePiece = this.tiles[allMoves1[j].to.x][allMoves1[j].to.y].value;
                        this.move(this.tiles[allMoves1[j].from.i][allMoves1[j].from.j], allMoves1[j].to);
                        let {validAttackingMoves2} = this.findAttackingMoves(2, 'WHITE');
                        let moveValue = undefined;
                        allMoves1[j].valueOfMove = valueOfWhitePiece
                        if(validAttackingMoves2.length !== 0){
                            let whiteCanTakeBack = false
                            let valueOfBlackPiece = -1;
                            let maxMoveValue2 = 0;
                            for(let i = 0; i < validAttackingMoves2.length; i++) {
                                if (valueOfBlackPiece < maxMoveValue2) {
                                    valueOfBlackPiece = this.tiles[validAttackingMoves2[i].to.x][validAttackingMoves2[i].to.y].value;
                                    maxMoveValue2 = valueOfBlackPiece;
                                }
                                validAttackingMoves2[i].valueOfMove = valueOfWhitePiece + valueOfBlackPiece;
                                whiteCanTakeBack = true;
                            }
                            if(whiteCanTakeBack){
                                allMoves1[j].valueOfMove += valueOfBlackPiece;
                            }
                        }
                        moveValue = allMoves1[j].valueOfMove;
                        let evaluation = this.evaluator();
                        console.log(evaluation);
                        if(evaluation <= 0){
                            if (moveValue >= maxMoveValue) {
                                maxMoveValue = moveValue;
                                bestMoveIndex = j;
                            }
                        }
                        if(evaluation > 0){
                            if (moveValue > maxMoveValue) {
                                maxMoveValue = moveValue;
                                bestMoveIndex = j;
                            }
                        }
                        else {
                            movesThatShouldNotBeMade.push(allMoves1[j]);
                        }
                        this.resetBoard(boardstate);
                    }
                }
                if (bestMoveIndex !== -1) {
                    this.move(this.tiles[allMoves1[bestMoveIndex].from.i][allMoves1[bestMoveIndex].from.j], allMoves1[bestMoveIndex].to);
                    console.log('No random move made');
                    rMGActive = false;
                }
            }


            let movesTo = [];            
            if (allMoves1.length !== 0 && rMGActive){
                let noMoveFound = true;
                while(noMoveFound){
                    console.log('Random move made');
                    let a = allMoves1[int(random(0,allMoves1.length))];
                    movesTo = this.tiles[a.from.i][a.from.j].findLegalMoves(this.tiles);
                    // de line hieronder is gegenereerd door ChatGPT:
                    movesTo = movesTo.filter(move => !movesThatShouldNotBeMade.includes(move));
                    if (movesTo.length > 0) {
                        let b = movesTo[int(random(0,movesTo.length))];
                        this.move(this.tiles[a.from.i][a.from.j], b);
                        noMoveFound = false;
                    }
                }
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
                validAttackMoves.push({from: possibleMovable[c], to: movesTo[j], valueOfMove: undefined});
            } 
        }
    }
    validAttackMoves = this.arraySorter(validAttackMoves);
    return { [validAttackingMoves]: validAttackMoves, [possibleMovables]: possibleMovable };
}

resetBoard(BoardneedsToBecome) {
    // this.tiles = [];
    // for (let i = 0; i < BoardneedsToBecome.length; i++) {
    //     let arrayToCopy = [];
    //     for (let j = 0; j < BoardneedsToBecome[i].length; j++) {
    //         arrayToCopy.push(BoardneedsToBecome[i][j]);
    //     }
    //     this.tiles.push(arrayToCopy.slice());
    // }
    //const _ = require('lodash');
    this.tiles = _.cloneDeep(BoardneedsToBecome);
}
}
//♟♙♜♖♝♗♞♘♚♔♛♕
