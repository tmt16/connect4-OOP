// // /** Connect Four
// //  *
// //  * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
// //  * column until a player gets four-in-a-row (horiz, vert, or diag) or until
// //  * board fills (tie)
// //  */

class Game {

  constructor(p1, p2, HEIGHT = 6, WIDTH = 7) {
    this.players = [p1, p2]
    this.HEIGHT = HEIGHT
    this.WIDTH = WIDTH
    this.currPlayer = p1
    this.makeBoard()
    this.makeHtmlBoard()
    this.gameOver = false
  }

  // let currPlayer = 1; // active player: 1 or 2

  /** makeBoard: create in-JS board structure:
   *    board = array of rows, each row is array of cells  (board[y][x])
   */

  makeBoard() {
    // TODO: set "board" to empty HEIGHT x WIDTH matrix array

    this.board = []

    for(let c = 0; c < this.HEIGHT; c++) {
      let row = [];
      for (let r = 0; r < this.WIDTH; r++) {
        row.push(null)
      }
      this.board.push(row)

    }
  }

  /** makeHtmlBoard: make HTML table and row of column tops. */

  makeHtmlBoard() {
    // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
    const htmlBoard = document.querySelector("#board")
    // htmlBoard.innerHTML = ''

    // TODO: add comment for this code
    // Set top column id to reference location and click eventlistener
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    
    this.handleGameClick = this.handleClick.bind(this);
    top.addEventListener('click', this.handleGameClick);

    for (let x = 0; x < this.WIDTH; x++) {
      let headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }
    htmlBoard.append(top);

    // TODO: add comment for this code
    // create table row length of Height
    // create table data length of width, set attribute to coordinates (y-x) to id of each td
    for (let y = 0; y < this.HEIGHT; y++) {
      const row = document.createElement("tr");
      for (let x = 0; x < this.WIDTH; x++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${y}-${x}`);
        row.append(cell);
      }
      htmlBoard.append(row);
    }
  }

  /** findSpotForCol: given column x, return top empty y (null if filled) */

  findSpotForCol(x) {
    // TODO: write the real version of this, rather than always returning 0
    for (let i = this.HEIGHT - 1; i >= 0; i--){
      if (this.board[i][x] !== null) {
      } else {
        return i
      }
    } return null
  }

  /** placeInTable: update DOM to place piece into HTML table of board */

  placeInTable(y, x) {
    // TODO: make a div and insert into correct table cell

    // create piece div element
    // add classList of current player
    // get coordinates of current piece and append to correct location

    const piece = document.createElement("div")
    piece.classList.add("piece");
    piece.style.backgroundColor = this.currPlayer.color;

    const coordinates = document.querySelector(`[id='${y}-${x}']`);
    coordinates.append(piece);
  }

  /** endGame: announce game end */

  endGame(msg) {
    // TODO: pop up alert message
    alert(`${msg}`)
    const top = document.querySelector("#column-top");
    top.removeEventListener("click", this.handleGameClick);

  }

  /** handleClick: handle click of column top to play piece */

  handleClick(evt) {
    // get x from ID of clicked cell
    const x = +evt.target.id;

    // get next spot in column (if none, ignore click)
    let y = this.findSpotForCol(x);
    if (y === null) {
      return;
    }

    // place piece in board and add to HTML table
    // TODO: add line to update in-memory board
    this.board[y][x] = this.board[y][x] ? this.board[y][x] : this.currPlayer
    this.placeInTable(y, x);

    // check for win
    if (this.checkForWin()) {
      let winner = this.currPlayer.color
      return this.endGame(`${(winner).charAt(0).toUpperCase() + (winner).slice(1)} player won!`);
    }

    // check for tie
    // TODO: check if all cells in board are filled; if so call, call endGame
    const exists = val => {return val !== null}

    if (this.board[0].every(exists)) {
      this.endGame("It's a tie!")
    }

    // switch players
    // TODO: switch currPlayer 1 <-> 2

    this.currPlayer = this.currPlayer === this.players[0] ? this.players[1] : this.players[0];

  }

  /** checkForWin: check board cell-by-cell for "does a win start here?" */

  checkForWin() {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer

      const _win = cells =>
      cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.HEIGHT &&
          x >= 0 &&
          x < this.WIDTH &&
          this.board[y][x] === this.currPlayer
      );

    // TODO: read and understand this code. Add comments to help you.
    // for length of height and for length of width
    // check if there are 4 of a kind horiz, vert, diagDR, or diagDL
    // if there is a 4 of a kind in one of these variables, then return true for this function
    // if true, this will return endGame messsage/function

    for (let y = 0; y < this.HEIGHT; y++) {
      for (let x = 0; x < this.WIDTH; x++) {
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
}

class Player{
  constructor(color){
    this.color = color;
    this.isValidColor()
    this.startGame()
  }  

  isValidColor(playerColor) {
    let s = new Option().style;
    s.color = playerColor;
  
    // return 'false' if color isn't assigned
    return s.color == playerColor;
  }

  startGame() {
    if (!this.isValidColor(this.color)) {
      alert(`${this.color + " is invalid. Enter valid color."}`)
      location.reload()
    }
  }
} 

const startGame = document.getElementById('start');

startGame.addEventListener("click", function(){
  let p1 = new Player((document.getElementById('player1').value).toLowerCase());
  let p2 = new Player((document.getElementById('player2').value).toLowerCase());

  startGame.remove()
new Game(p1, p2);

const newGame = document.getElementById('new')

newGame.addEventListener("click", function() {
  location.reload()
  document.getElementById("start")
})

})