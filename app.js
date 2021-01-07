const app = {}
app.displayPlayer = $('.player')
app.resetButton = $('.reset')
app.gameCell = $.map($('.game-cell'), function(cell){
  return [cell]
})
app.gameCompleted = true
app.currentPlayer = "X"
app.gameBoard = ["", "", "", "", "", "", "", "", ""]

const { gameCompleted } = app

app.checkWinner = () => {

}




app.handleReset = e => {
}


app.handleGameCellClick = e => {
  const cellIndex = $(app.gameCell).index(e.target)
  const cellClicked = e.target
  if (app.gameBoard[cellIndex] !=="") {
    return 
  } app.playerMove(cellIndex, cellClicked)
}

app.playerMove = (cellIndex, cellClicked) => {
  if (app.currentPlayer === "X") {
    $(cellClicked).addClass("X");
    app.gameBoard[cellIndex] = app.currentPlayer
    app.currentPlayer = app.currentPlayer === "X" ? "O" : null ;
  } else if (app.currentPlayer === "O") {
    $(cellClicked).addClass("O");
    app.gameBoard[cellIndex] = app.currentPlayer;
    app.currentPlayer = app.currentPlayer === "O" ? "X" : null;
  }
}





app.resetButton.on('click', app.handleReset)

$(app.gameCell).each(function () {
  $(this).on('click', app.handleGameCellClick)
});

app.init = function () {
}


$(document).ready(function () {
  app.init();
}); 