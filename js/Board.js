import Bishop from "./Bishop.js";
import { COLOUR, SIZE } from "./constants.js";
import Pawn from "./Pawn.js";
import Rook from "./Rook.js";
import Knight from "./Knight.js";
import King from "./King.js";
import Queen from "./Queen.js";
import CheckFinder from "./CheckFinder.js";

var w1 = 0;
var w2 = 0;
var b1 = 0;
var b2 = 0;
var piecesAmount = 32;
// var distance = 0;

export default class Board {
  constructor() {
    this.sizeOfSquare = SIZE / 8;
    this.tiles = this.createTiles();
    this.turn = COLOUR.WHITE;
    this.isInCheck = false;
  }

  //createTiles() {
    //let tiles = this.createEmptyBoard();

    //for (let i = 0; i < 5; i++) {
    //  tiles[i][1] = new Pawn(i, 1, COLOUR.BLACK, "♟", -100, false);
    //  tiles[i][6] = new Pawn(i, 6, COLOUR.WHITE, "♙", 100, false);
    //}
    //♟♙♜♖♝♗♞♘♚♔♛♕
    //tiles[1][5] = new Pawn(1, 5, COLOUR.BLACK, "♟", -10, false);
    // tiles[0][0] = new Rook(0, 0, COLOUR.BLACK, '♜', -525);
    // tiles[7][0] = new Rook(7, 0, COLOUR.BLACK, '♜', -525);
    // tiles[0][7] = new Rook(0, 7, COLOUR.WHITE, '♖', 525);
    // tiles[7][7] = new Rook(7, 7, COLOUR.WHITE, '♖', 525);

    // tiles[2][0] = new Bishop(2, 0, COLOUR.BLACK, '♝', -350);
    // tiles[5][0] = new Bishop(5, 0, COLOUR.BLACK, '♝', -350);
    // tiles[2][7] = new Bishop(2, 7, COLOUR.WHITE, '♗', 350);
    // tiles[5][7] = new Bishop(5, 7, COLOUR.WHITE, '♗', 350);

    // tiles[1][0] = new Knight(1, 0, COLOUR.BLACK, '♞', -350);
    // tiles[6][0] = new Knight(6, 0, COLOUR.BLACK, '♞', -350);
    // tiles[1][7] = new Knight(1, 7, COLOUR.WHITE, '♘', 350);
    // tiles[6][7] = new Knight(6, 7, COLOUR.WHITE, '♘', 350);

    //tiles[4][0] = new King(4, 0, COLOUR.BLACK, "♚", -10000);
    //tiles[4][7] = new King(4, 7, COLOUR.WHITE, "♔", 10000);

    // tiles[3][0] = new Queen(3, 0, COLOUR.BLACK, '♛', -1000);
    // tiles[3][7] = new Queen(3, 7, COLOUR.WHITE, '♕', 1000);

    //return tiles;
  //}


// COMMENT THIS AWAY WHEN THINGS

  createTiles() {
    //for specific board positions
    let tiles = this.createEmptyBoard();

    // for (let i = 0; i < 8; i++) {
    //   tiles[i][1] = new Pawn(i, 1, COLOUR.BLACK, "♟", -100, false);
    //   tiles[i][6] = new Pawn(i, 6, COLOUR.WHITE, "♙", 100, false);
    // }
    //♟♙♜♖♝♗♞♘♚♔♛♕
    tiles[1][5] = new Pawn(1, 5, COLOUR.WHITE, "♙", -10, false);

    // tiles[0][0] = new Rook(0, 0, COLOUR.BLACK, "♜", -525);
    tiles[7][0] = new Rook(7, 0, COLOUR.BLACK, "♜", -525);
    // tiles[0][7] = new Rook(0, 7, COLOUR.WHITE, "♖", 525);
    // tiles[7][7] = new Rook(7, 7, COLOUR.WHITE, "♖", 525);

    // tiles[2][0] = new Bishop(2, 0, COLOUR.BLACK, "♝", -350);
    // tiles[5][0] = new Bishop(5, 0, COLOUR.BLACK, "♝", -350);
    // tiles[2][7] = new Bishop(2, 7, COLOUR.WHITE, "♗", 350);
    // tiles[5][7] = new Bishop(5, 7, COLOUR.WHITE, "♗", 350);

    // tiles[1][0] = new Knight(1, 0, COLOUR.BLACK, "♞", -350);
    // tiles[6][0] = new Knight(6, 0, COLOUR.BLACK, "♞", -350);
    // tiles[1][7] = new Knight(1, 7, COLOUR.WHITE, "♘", 350);
    // tiles[6][7] = new Knight(6, 7, COLOUR.WHITE, "♘", 350);

    tiles[4][0] = new King(4, 0, COLOUR.BLACK, "♚", -10000);
    tiles[4][7] = new King(4, 7, COLOUR.WHITE, "♔", 10000);

    // tiles[3][0] = new Queen(3, 0, COLOUR.BLACK, "♛", -1000);
    // tiles[3][7] = new Queen(3, 7, COLOUR.WHITE, "♕", 1000);

    return tiles;
  }
  kingThing(piece){
    let amountOfPieces = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.tiles[i][j] !== undefined) {
          amountOfPieces++;
          piecesAmount = amountOfPieces;
        }
      }
    }
    //I will change this so its not two forloops
    if(amountOfPieces < 6){
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.tiles[i][j] !== undefined) {
          if (this.tiles[i][j].sprite == "♔") {
            b1 = i+1;
            b2 = j+1;
          }
          if (this.tiles[i][j].sprite == "♚"){
            w1 = i+1;
            w2 = j+1;
          }
        }
      }
    }
    //let distance = (sqrt((b1 - w1)**2 + (b2 - w2)**2));
    let distance = Math.round(5*(sqrt((b1 - w1)**2 + (b2 - w2)**2)));
    console.log("distance:", distance);
    return distance;
  }
  else{
    return 0;
  }
  }

  arrayValueChanger(piece) {
    let amountOfPieces = 0;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.tiles[i][j] !== undefined) {
          amountOfPieces++;
        }
      }
    }

    // if(b1 > w1 && b2 > w2){
      
    // }
    // if(b1 < w1 && b2 > w2){
      
    // }
    // if(b1 > w1 && b2 < w2){
      
    // }
    // if(b1 < w1 && b2 < w2){
      
    // }

    let whiteKingArray, blackKingArray, whitePawnArray, blackPawnArray, whiteRookArray, blackRookArray,
        whiteHorseArray, blackHorseArray, whiteBishopArray, blackBishopArray, whiteQueenArray, blackQueenArray;
    if (amountOfPieces > 12) {
        console.log("hi");
      if (piece == "♜") {
       blackRookArray = [
            [0, 0, 0, 5, 5, 5, 0, 0],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [5, 10, 10, 10, 10, 10, 10, 5],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        return blackRookArray;
    }
    if (piece == "♖") {
        whiteRookArray = [
            [0, 0, 0, 5, 5, 0, 0, 0],
            [5, 10, 10, 10, 10, 10, 10, 5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [0, 0, 0, 5, 5, 5, 0, 0],
        ];
        return whiteRookArray;
    }
    if (piece == "♞") {
        blackHorseArray = [
            [-50, -40, -30, -30, -30, -30, -40, -50],
            [-40, -20, 0, 5, 5, 0, -20, -40],
            [-30, 5, 10, 15, 15, 10, 5, -30],
            [-30, 0, 15, 20, 20, 15, 0, -30],
            [-30, 5, 15, 20, 20, 15, 5, -30],
            [-30, 0, 10, 15, 15, 10, 0, -30],
            [-40, -20, 0, 0, 0, 0, -20, -40],
            [-50, -40, -30, -30, -30, -30, -40, -50],
        ];
        return blackHorseArray;
    }
    if (piece == "♘") {
        whiteHorseArray = [
            [-50, -40, -30, -30, -30, -30, -40, -50],
            [-40, -20, 0, 0, 0, 0, -20, -40],
            [-30, 0, 10, 15, 15, 10, 0, -30],
            [-30, 5, 15, 20, 20, 15, 5, -30],
            [-30, 0, 15, 20, 20, 15, 0, -30],
            [-30, 5, 10, 15, 15, 10, 5, -30],
            [-40, -20, 0, 5, 5, 0, -20, -40],
            [-50, -40, -30, -30, -30, -30, -40, -50],
        ];
        return whiteHorseArray;
    }
    if (piece == "♗") {
        whiteBishopArray = [
            [-20, -10, -10, -10, -10, -10, -10, -20],
            [-10, 0, 0, 0, 0, 0, 0, -10],
            [-10, 0, 5, 10, 10, 5, 0, -10],
            [-10, 10, 5, 10, 10, 5, 10, -10],
            [-10, 0, 10, 10, 10, 10, 0, -10],
            [-10, 10, 10, 0, 0, 10, 10, -10],
            [-10, 5, 0, 0, 0, 0, 5, -10],
            [-20, -10, -10, -10, -10, -10, -10, -20],
        ];
        return whiteBishopArray;
    }
    if (piece == "♝") {
        blackBishopArray = [
            [-20, -10, -10, -10, -10, -10, -10, -20],
            [-10, 5, 0, 0, 0, 0, 5, -10],
            [-10, 10, 10, 0, 0, 10, 10, -10],
            [-10, 0, 10, 10, 10, 10, 0, -10],
            [-10, 10, 5, 10, 10, 5, 10, -10],
            [-10, 0, 5, 10, 10, 5, 0, -10],
            [-10, 0, 0, 0, 0, 0, 0, -10],
            [-20, -10, -10, -10, -10, -10, -10, -20],
        ];
        return blackBishopArray;
    }
    if (piece == "♕") {
        whiteQueenArray = [
            [-20, -10, -10, -5, -5, -10, -10, -20],
            [-10, 0, 0, 0, 0, 0, 0, -10],
            [-10, 0, 5, 5, 5, 5, 0, -10],
            [-5, 0, 5, 5, 5, 5, 0, -5],
            [0, 0, 5, 5, 5, 5, 0, -5],
            [-10, 5, 5, 5, 5, 5, 0, -10],
            [-10, 0, 5, 0, 0, 0, 0, -10],
            [-20, -10, -10, -5, -5, -10, -10, -20],
        ];
        return whiteQueenArray;
    }
    if (piece == "♛") {
        blackQueenArray = [
            [-20, -10, -10, -5, -5, -10, -10, -20],
            [-10, 0, 0, 0, 0, 5, 0, -10],
            [-10, 0, 5, 5, 5, 5, 0, -10],
            [-5, 0, 5, 5, 5, 5, 0, 0],
            [-5, 0, 5, 5, 5, 5, 0, -5],
            [-10, 5, 5, 5, 5, 5, 0, -10],
            [-10, 0, 0, 0, 0, 0, 0, -10],
            [-20, -10, -10, -5, -5, -10, -10, -20],
        ];
        return blackQueenArray;
    }
    if (piece == "♔") {
        whiteKingArray = [
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-20, -30, -30, -40, -40, -30, -30, -20],
            [-10, -20, -20, -20, -20, -20, -20, -10],
            [20, 20, 0, 0, 0, 0, 20, 20],
            [20, 30, 0, 0, 0, 0, 30, 20],
        ];
        return whiteKingArray;
    }
    if (piece == "♚") {
        blackKingArray = [
            [20, 30, 0, 0, 0, 0, 30, 20],
            [20, 20, 0, 0, 0, 0, 20, 20],
            [-10, -20, -20, -20, -20, -20, -20, -10],
            [-20, -30, -30, -40, -40, -30, -30, -20],
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-30, -40, -40, -50, -50, -40, -40, -30],
            [-30, -40, -40, -50, -50, -40, -40, -30],
        ];
        return blackKingArray;
    }
    if (piece == "♙") {
        whitePawnArray = [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [50, 50, 50, 50, 50, 50, 50, 50],
            [10, 10, 20, 30, 30, 20, 10, 10],
            [5, 5, 10, 25, 25, 10, 5, 5],
            [0, 0, 0, 20, 20, 0, 0, 0],
            [5, -5, -10, 0, 0, -10, -5, 5],
            [5, 10, 10, -20, -20, 10, 10, 5],
            [5, 5, 5, 5, 5, 5, 5, 5],
        ];
        return whitePawnArray;
    }
    if (piece == "♟") {
        blackPawnArray = [
            [5, 5, 5, 5, 5, 5, 5, 5],
            [5, 10, 10, -20, -20, 10, 10, 5],
            [5, -5, -10, 0, 0, -10, -5, 5],
            [0, 0, 0, 20, 20, 0, 0, 0],
            [5, 5, 10, 25, 25, 10, 5, 5],
            [10, 10, 20, 30, 30, 20, 10, 10],
            [50, 50, 50, 50, 50, 50, 50, 50],
            [0, 0, 0, 0, 0, 0, 0, 0],
        ];
        return blackPawnArray;
    }
}
    else {      
      if (piece == "♔") {
        whiteKingArray = [
            // [-100, -50, -50, -50, -50, -50, -50, -100],
            // [-25, 0, 2.5, 2.5, 2.5, 2.5, 0, -25],
            // [-50, -2.5, 10, 15, 15, 10, -2.5, -50],
            // [-75, -5, 17.5, 22.5, 22.5, 17.5, -5, -75],
            // [-100, -7.5, 15, 20, 20, 15, -7.5, -100],
            // [-125, -10, 10, 12.5, 12.5, 10, -10, -125],
            // [-150, -12.5, 0, 0, 0, 0, -12.5, -150],
            // [-250, -150, -150, -150, -150, -150, -150, -250]

            [-10, -5, -5, -5, -5, -5, -5, -10],
            [-2.5, 0, 2.5, 2.5, 2.5, 2.5, 0, -2.5],
            [-5, -2.5, 10, 15, 15, 10, -2.5, -5],
            [-7.5, -5, 17.5, 22.5, 22.5, 17.5, -5, -7.5],
            [-10, -7.5, 15, 20, 20, 15, -7.5, -10],
            [-12.5, -10, 10, 12.5, 12.5, 10, -10, -12.5],
            [-15, -12.5, 0, 0, 0, 0, -12.5, -15],
            [-25, -15, -15, -15, -15, -15, -15, -25]
        ];
        return whiteKingArray;
    }
    if (piece == "♚") {
        blackKingArray = [
            [-25, -15, -15, -15, -15, -15, -15, -25],
            [-15, -12.5, 0, 0, 0, 0, -12.5, -15],
            [-12.5, -10, 10, 12.5, 12.5, 10, -10, -12.5],
            [-10, -7.5, 15, 20, 20, 15, -7.5, -10],
            [-7.5, -5, 17.5, 22.5, 22.5, 17.5, -5, -7.5],
            [-5, -2.5, 10, 15, 15, 10, -2.5, -5],
            [-2.5, 0, 2.5, 2.5, 2.5, 2.5, 0, -2.5],
            [-10, -5, -5, -5, -5, -5, -5, -10]
        ];
        return blackKingArray;
      }
      if (piece == "♙") {
        whitePawnArray = [
          [0, 0, 0, 0, 0, 0, 0, 0],
          [5, 5, 5, 5, 5, 5, 5, 5],
          [5, 5, 5, 5, 5, 5, 5, 5],
          [10, 10, 10, 10, 10, 10, 10, 10],
          [15, 15, 15, 15, 15, 15, 15, 15],
          [25, 25, 25, 25, 25, 25, 25, 25],
          [40, 40, 40, 40, 40, 40, 40, 40],
          [45, 45, 45, 45, 45, 45, 45, 45]
        ];
        return whitePawnArray;
      }
      if (piece == "♟") {
        blackPawnArray = [
            [45, 45, 45, 45, 45, 45, 45, 45],
            [40, 40, 40, 40, 40, 40, 40, 40],
            [25, 25, 25, 25, 25, 25, 25, 25],
            [15, 15, 15, 15, 15, 15, 15, 15],
            [10, 10, 10, 10, 10, 10, 10, 10],
            [5, 5, 5, 5, 5, 5, 5, 5],
            [5, 5, 5, 5, 5, 5, 5, 5],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        return blackPawnArray;
      }
      if (piece == "♜") {
        blackRookArray = [
            [0, 0, 0, 5, 5, 5, 0, 0],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [5, 10, 10, 10, 10, 10, 10, 5],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ];
        return blackRookArray;
    }
    if (piece == "♖") {
        whiteRookArray = [
            [0, 0, 0, 5, 5, 0, 0, 0],
            [5, 10, 10, 10, 10, 10, 10, 5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [-5, 0, 0, 0, 0, 0, 0, -5],
            [0, 0, 0, 5, 5, 5, 0, 0]
        ];
        return whiteRookArray;
    }
    if (piece == "♞") {
        blackHorseArray = [
            [-50, -40, -30, -30, -30, -30, -40, -50],
            [-40, -20, 0, 5, 5, 0, -20, -40],
            [-30, 5, 10, 15, 15, 10, 5, -30],
            [-30, 0, 15, 20, 20, 15, 0, -30],
            [-30, 5, 15, 20, 20, 15, 5, -30],
            [-30, 0, 10, 15, 15, 10, 0, -30],
            [-40, -20, 0, 0, 0, 0, -20, -40],
            [-50, -40, -30, -30, -30, -30, -40, -50]
        ];
        return blackHorseArray;
    }
    if (piece == "♘") {
        whiteHorseArray = [
            [-50, -40, -30, -30, -30, -30, -40, -50],
            [-40, -20, 0, 0, 0, 0, -20, -40],
            [-30, 0, 10, 15, 15, 10, 0, -30],
            [-30, 5, 15, 20, 20, 15, 5, -30],
            [-30, 0, 15, 20, 20, 15, 0, -30],
            [-30, 5, 10, 15, 15, 10, 5, -30],
            [-40, -20, 0, 5, 5, 0, -20, -40],
            [-50, -40, -30, -30, -30, -30, -40, -50]
        ];
        return whiteHorseArray;
    }
    if (piece == "♗") {
        whiteBishopArray = [
            [-20, -10, -10, -10, -10, -10, -10, -20],
            [-10, 0, 0, 0, 0, 0, 0, -10],
            [-10, 0, 5, 10, 10, 5, 0, -10],
            [-10, 10, 5, 10, 10, 5, 10, -10],
            [-10, 0, 10, 10, 10, 10, 0, -10],
            [-10, 10, 10, 0, 0, 10, 10, -10],
            [-10, 5, 0, 0, 0, 0, 5, -10],
            [-20, -10, -10, -10, -10, -10, -10, -20]
        ];
        return whiteBishopArray;
    }
    if (piece == "♝") {
        blackBishopArray = [
            [-20, -10, -10, -10, -10, -10, -10, -20],
            [-10, 5, 0, 0, 0, 0, 5, -10],
            [-10, 10, 10, 0, 0, 10, 10, -10],
            [-10, 0, 10, 10, 10, 10, 0, -10],
            [-10, 10, 5, 10, 10, 5, 10, -10],
            [-10, 0, 5, 10, 10, 5, 0, -10],
            [-10, 0, 0, 0, 0, 0, 0, -10],
            [-20, -10, -10, -10, -10, -10, -10, -20]
        ];
        return blackBishopArray;
    }
    if (piece == "♕") {
        whiteQueenArray = [
            [-20, -10, -10, -5, -5, -10, -10, -20],
            [-10, 0, 0, 0, 0, 0, 0, -10],
            [-10, 0, 5, 5, 5, 5, 0, -10],
            [-5, 0, 5, 5, 5, 5, 0, -5],
            [0, 0, 5, 5, 5, 5, 0, -5],
            [-10, 5, 5, 5, 5, 5, 0, -10],
            [-10, 0, 5, 0, 0, 0, 0, -10],
            [-20, -10, -10, -5, -5, -10, -10, -20]
        ];
        return whiteQueenArray;
    }
    if (piece == "♛") {
        blackQueenArray = [
            [-20, -10, -10, -5, -5, -10, -10, -20],
            [-10, 0, 0, 0, 0, 5, 0, -10],
            [-10, 0, 5, 5, 5, 5, 0, -10],
            [-5, 0, 5, 5, 5, 5, 0, 0],
            [-5, 0, 5, 5, 5, 5, 0, -5],
            [-10, 5, 5, 5, 5, 5, 0, -10],
            [-10, 0, 0, 0, 0, 0, 0, -10],
            [-20, -10, -10, -5, -5, -10, -10, -20]
        ];
        return blackQueenArray;
    }
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
        const x = this.getPos(i);
        const y = this.getPos(j);

        if ((i + j) % 2 != 0) {
          push();
          fill(181, 136, 99);
          rect(x, y, this.sizeOfSquare, this.sizeOfSquare);
          pop();
        } else {
          push();
          fill(240, 217, 181);
          rect(x, y, this.sizeOfSquare, this.sizeOfSquare);
          pop();
        }
        if (currentTile) {
          currentTile.draw(x, y);
        }
      }
    }
    this.displaySelected();
    if (this.isInCheck) {
      let moves = CheckFinder.findMovesForCheckedPlayer(this.tiles, this.turn);
      if (moves.length === 0) {
        console.log("Checkmate");
        fill(10, 10, 10);
        textFont("Arial");
        text("Checkmate", 400, 400, 500, 500);
        noLoop();
      }
    }
  }

  displaySelected() {
    if (this.selected) {
      const tile = this.tiles[this.selected.x][this.selected.y];
      if (tile) {
        push();
        fill(90, 90, 90, 170);

        for (const move of this.legalMoves) {
          push();
          noStroke();
          circle(
            this.getPos(move.x),
            this.getPos(move.y),
            this.sizeOfSquare / 4
          );
          pop();
        }
        pop();
      }
    }
  }

  getPos(index) {
    let offset = this.sizeOfSquare / 2;
    return index * this.sizeOfSquare + offset;
  }

  userClick(clientX, clientY) {
    let calculating = false;
    const x = Math.floor(clientX / 100);
    const y = Math.floor(clientY / 100);
    const Aicolour = COLOUR.WHITE;
    const playerColour = COLOUR.WHITE;
    if (!calculating) {
      this.select(x, y);
    }
    if (this.turn !== Aicolour) {
      calculating = true;
      let allMoves = this.findAllMoves(Aicolour, this.tiles);
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
        //if(piecesAmount > 5){
        let bestMove = this.chessLooper(
          4,
          this.tiles,
          Aicolour,
          alpha,
          beta,
          isMaximizingPlayer,
          evaluation.evaluation
        );
      //  }
      //  else{
      //   let bestMove = this.chessLooper(
      //     4,
      //     this.tiles,
      //     Aicolour,
      //     alpha,
      //     beta,
      //     isMaximizingPlayer,
      //     evaluation.evaluation
      //   );
      //}
        this.move(
          this.tiles[bestMove[1].from.i][bestMove[1].from.j],
          bestMove[1].to,
          this.tiles
        );
      }
      this.turn = playerColour;
      calculating = false;
    }
  }

  select(x, y) {
    if (this.isOffBoard(x, y)) {
      this.selected = undefined;
    } else if (this.tiles[x][y] && this.tiles[x][y].colour === this.turn) {
      this.selected = JSON.parse(JSON.stringify(this.tiles[x][y]));
      this.legalMoves = this.tiles[this.selected.x][
        this.selected.y
      ].findLegalMoves(this.tiles);
    } else if (this.selected) {
      const potentialMove = this.legalMoves.find((e) => e.x == x && e.y == y);
      if (potentialMove) {
        this.move(this.selected, potentialMove, this.tiles);
      } else {
        this.selected = undefined;
      }
    }
  }

  move(from, to, board) {
    if (from.sprite == "♟" || from.sprite == "♙") {
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (board[i][j] != undefined) {
            if (board[i][j].sprite == "♟") {
              if (board[i][j].flag && to.y == j - 1 && to.x == i) {
                board[i][j] = undefined;
                continue;
              }
              board[i][j].flag = false;
            }
            if (board[i][j].sprite == "♙") {
              if (board[i][j].flag && to.y == j + 1 && to.x == i) {
                board[i][j] = undefined;
                continue;
              }
              board[i][j].flag = false;
            }
          }
        }
      }
    }
    if (
      (from.y - to.y == 2 || from.y - to.y == -2) &&
      (from.sprite == "♟" || from.sprite == "♙")
    ) {
      board[from.x][from.y].flag = true;
    }
    this.turn = this.turn === COLOUR.WHITE ? COLOUR.BLACK : COLOUR.WHITE;
    //DEZE IF STATEMENT WAS ER NIET EN OOK NIET WAT IN DE ELSE STAAT
    if (to.i === undefined) {
      board[from.x][from.y].userMove(to.x, to.y, board);
    } else {
      board[from.x][from.y].userMove(to.i, to.j, board);
    }
    this.selected = undefined;

    this.isInCheck = CheckFinder.isCurrentPlayerInCheck(board, this.turn);

    if (this.isInCheck) {
      let moves = CheckFinder.findMovesForCheckedPlayer(board, this.turn);
      if (moves.length === 0) {
        fill(10, 10, 10);
        textFont("Arial");
        text("Checkmate", 400, 400, 50, 50);
        console.log("checkmate");
        //noLoop();
      }
    }
  }

  isOffBoard(x, y) {
    return x > 7 || x < 0 || y > 7 || y < 0;
  }

  findAllMoves(colour, tiles) {
    let possibleMove = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (tiles[i][j] != undefined && tiles[i][j].colour == colour) {
          let movesTo = tiles[i][j].findLegalMoves(tiles);
          if (movesTo != 0) {
            for (let c = movesTo.length - 1; c >= 0; c--) {
              possibleMove.push({ from: { i, j }, to: movesTo[c] });
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
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.tiles[i][j] != undefined) {
          evaluation += this.tiles[i][j].value;
          numberOfPieces++;
          if (
            this.tiles[i][j].sprite == "♕" ||
            this.tiles[i][j].sprite == "♛"
          ) {
            numberOfQueens++;
          }
          if (
            this.tiles[i][j].sprite == "♜" ||
            this.tiles[i][j].sprite == "♖"
          ) {
            numberOfRooks++;
          }
          if (
            this.tiles[i][j].sprite == "♝" ||
            this.tiles[i][j].sprite == "♗"
          ) {
            numberOfBishops++;
          }
          if (
            this.tiles[i][j].sprite == "♞" ||
            this.tiles[i][j].sprite == "♘"
          ) {
            numberOfKnights++;
          }
          if (this.tiles[i][j].colour == COLOUR.BLACK) {
            evaluation -=
              this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
          } else {
            evaluation +=
              this.arrayValueChanger(this.tiles[i][j].sprite)[i][j];
          }
          if (this.tiles[i][j].colour == COLOUR.BLACK) {
            evaluation += this.kingThing(this.tiles[i][j].sprite);
            console.log(this.kingThing(this.tiles[i][j].sprite));
          // } else {
          //   evaluation -= this.kingThing(this.tiles[i][j].sprite);
          // 
        }
      }
        //♟♙♜♖♝♗♞♘♚♔♛♕
      }
    }
    console.log("evaluation:", evaluation);
    return {
      evaluation,
      numberOfPieces,
      numberOfQueens,
      numberOfRooks,
      numberOfBishops,
      numberOfKnights,
    };
  }

  resetBoard(BoardNeedsToBecome) {
    this.tiles = _.cloneDeep(BoardNeedsToBecome);
  }

  shouldITradeEqual(color, moveValue, maxMoveValue) {
    if (color === COLOUR.BLACK) {
      return moveValue <= maxMoveValue;
    }
    return moveValue >= maxMoveValue;
  }

  shouldITradeNotEqual(color, moveValue, maxMoveValue) {
    if (color === COLOUR.BLACK) {
      return moveValue < maxMoveValue;
    }
    return moveValue > maxMoveValue;
  }

  chessLooper(
    depth,
    game,
    playerColor,
    alpha,
    beta,
    isMaximizingPlayer,
    originalEvaluation
  ) {
    let value = undefined;
    let evaluation = originalEvaluation;
    if (depth == 0) {
      return [originalEvaluation, undefined];
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
      if (this.tiles[move.to.x][move.to.y] !== undefined) {
        evaluation -= this.tiles[move.to.x][move.to.y].value;
        if (this.tiles[move.to.x][move.to.y].colour == COLOUR.BLACK) {
          evaluation +=
            this.arrayValueChanger(this.tiles[move.to.x][move.to.y].sprite, 30)[
              move.to.y
            ][move.to.x];
        } else {
          evaluation -=
            this.arrayValueChanger(this.tiles[move.to.x][move.to.y].sprite, 30)[
              move.to.y
            ][move.to.x];
        }
      }
      if (this.tiles[move.from.i][move.from.j] !== undefined) {
        if (this.tiles[move.from.i][move.from.j].colour == COLOUR.BLACK) {
          evaluation -=
            this.arrayValueChanger(this.tiles[move.from.i][move.from.j].sprite, 30)[
              move.to.y
            ][move.to.x];
        } else {
          evaluation +=
            this.arrayValueChanger(this.tiles[move.from.i][move.from.j].sprite, 30)[
              move.to.y
            ][move.to.x];
        }
        console.log("pieces:" , piecesAmount);
        console.log("legalmoves:" , this.legalMoves.length , this.legalMoves);
        if(piecesAmount < 5){
        if (this.tiles[move.from.i][move.from.j].colour == COLOUR.BLACK) {
          evaluation += this.kingThing(this.tiles[move.from.i][move.from.j].sprite);
          console.log(this.kingThing(this.tiles[move.from.i][move.from.j].sprite));

        // } else {
        //   evaluation -= this.kingThing(this.tiles[i][j].sprite);
      }
      }
      }
      // if(this.legalMoves.length = 0){
      //   evaluation += Math.abs(evaluation);
      // }

      this.move(this.tiles[move.from.i][move.from.j], move.to, this.tiles);
      value = JSON.parse(
        JSON.stringify(
          this.chessLooper(
            depth - 1,
            game,
            playerColor,
            alpha,
            beta,
            isMaximizingPlayer,
            evaluation
          )[0]
        )
      );
      if (this.tiles[move.to.x][move.to.y] !== undefined) {
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

  checkMateForQueen(tiles) {
    if (this.tiles[i][j].sprite == "♚") {
      cosole.log("test");
    }
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
} //♟♙♜♖♝♗♞♘♚♔♛♕
