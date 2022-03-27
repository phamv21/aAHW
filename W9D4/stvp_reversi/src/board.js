// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  var Piece = require("./piece");
}
// DON'T TOUCH THIS CODE

/**
 * Returns a 2D array (8 by 8) with two black pieces at [3, 4] and [4, 3]
 * and two white pieces at [3, 3] and [4, 4]
 */
function _makeGrid () {
  let grid = new Array(8);
  grid.fill(0,0,8);
  grid = grid.map((el) => new Array(8))

  grid[3][4] = new Piece('black');
  grid[4][3] = new Piece('black');
  grid[3][3] = new Piece('white');
  grid[4][4] = new Piece('white');
  return grid;
}

/**
 * Constructs a Board with a starting grid set up.
 */
function Board () {
  this.grid = _makeGrid();
}

Board.DIRS = [
  [ 0,  1], [ 1,  1], [ 1,  0],
  [ 1, -1], [ 0, -1], [-1, -1],
  [-1,  0], [-1,  1]
];

/**
 * Checks if a given position is on the Board.
 */
Board.prototype.isValidPos = function (pos) {
  if((!Array.isArray(pos))){return false;}
  if (pos.length > 2){return false};
  if(pos[0]>7 || pos[1]>7){return false;}
  if (pos[0] < 0 || pos[1] < 0) { return false; }
  return true;
};

/**
 * Returns the piece at a given [x, y] position,
 * throwing an Error if the position is invalid.
 */
Board.prototype.getPiece = function (pos) {
  if (this.isValidPos(pos)) { return this.grid[pos[0]][pos[1]]
  } else {
    throw new Error('Not valid pos!')}

  };

/**
 * Checks if the piece at a given position
 * matches a given color.
 */
Board.prototype.isMine = function (pos, color) {
  try {
    this.getPiece(pos).color
    
  } catch (error) {
    return false;
  }
  if(this.getPiece(pos).color === color){return true}
  return false;
};

/**
 * Checks if a given position has a piece on it.
 */
Board.prototype.isOccupied = function (pos) {
  if (this.getPiece(pos) !== undefined) {
    return true;
  }
  return false;
};

/**
 * Recursively follows a direction away from a starting position, adding each
 * piece of the opposite color until hitting another piece of the current color.
 * It then returns an array of all pieces between the starting position and
 * ending position.
 *
 * Returns an empty array if it reaches the end of the board before finding another piece
 * of the same color.
 *
 * Returns empty array if it hits an empty position.
 *
 * Returns empty array if no pieces of the opposite color are found.
 */

function addArr(arr1,arr2,num) {
  let result = arr1.map((el,idx)=>el+arr2[idx]*num);
  return result;
}
Board.prototype._positionsToFlip = function(pos, color, dir, piecesToFlip){
  let result = [];
      let num = 1;
      let switchStop = true; 
      let hitSameColor = false;
      while (switchStop) {
        switchStop = false;
        let checkPos = addArr(pos, dir, num);
        if (this.isValidPos(checkPos)) {
          // check is the pos hit the same color or not
          if ((this.isMine(checkPos, color)) && this.isOccupied(checkPos)) {hitSameColor = true;}
          if (!(this.isMine(checkPos, color)) && this.isOccupied(checkPos)) {
            result.push(checkPos);
            switchStop = true;
            num++;
          }
        }
      }
      // if it does not meet the pice with the same color - return empty array
      if(!hitSameColor){result = [];}

      return result;



};

/**
 * Checks that a position is not already occupied and that the color
 * taking the position will result in some pieces of the opposite
 * color being flipped.
 */
Board.prototype.validMove = function (pos, color) {
  if(this.isOccupied(pos)){return false;}
    let moves = [];
    Board.DIRS.forEach((dir)=>{
      moves = moves.concat(this._positionsToFlip(pos,color,dir))
    });
    if (moves.length === 0){return false}
    return true;
};

/**
 * Adds a new piece of the given color to the given position, flipping the
 * color of any pieces that are eligible for flipping.
 *
 * Throws an error if the position represents an invalid move.
 */
Board.prototype.placePiece = function (pos, color) {
  if (!(this.validMove(pos, color))) { throw new Error('Invalid move!')};
    this.grid[pos[0]][pos[1]] = new Piece(color);
    let moves = [];
    Board.DIRS.forEach((dir) => {
      moves = moves.concat(this._positionsToFlip(pos, color, dir))
    });
    moves.forEach((move)=>{
      this.getPiece(move).flip();
    })

};

/**
 * Produces an array of all valid positions on
 * the Board for a given color.
 */
Board.prototype.validMoves = function (color) {
  let result = [];
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
        if(this.validMove([i,j],color)){result.push([i,j])}
    }
  }
  return result;
};

/**
 * Checks if there are any valid moves for the given color.
 */
Board.prototype.hasMove = function (color) {
  let moves = this.validMoves(color);
  if(moves.length === 0){return false}
  return true;
};



/**
 * Checks if both the white player and
 * the black player are out of moves.
 */
Board.prototype.isOver = function () {
  if(this.hasMove('black')|| this.hasMove('white')){
    return false;
  }
  return true;
};




/**
 * Prints a string representation of the Board to the console.
 */
Board.prototype.print = function () {
  console.log(this.grid);
};


// DON'T TOUCH THIS CODE
if (typeof window === 'undefined'){
  module.exports = Board;
}
// DON'T TOUCH THIS CODE