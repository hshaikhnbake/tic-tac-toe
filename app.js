const app = {}
app.displayPlayer = $('.player').html(`Blue's Turn`).css("color", "blue")
app.resetButton = $('.reset')
app.gameCell = $.map($('.game-cell'), function(cell){
  return [cell]
})
app.cellHover = $(app.gameCell).hover(function () {
  $(this).addClass('highlight');
}, function () {
  $(this).removeClass('highlight')
});
app.gameCompleted = 
app.currentPlayer = "X"
app.gameGrid = ["", "", "", "", "", "", "", "", ""]
app.randomButton = $('.random-mode').html('Random Mode: OFF')
app.randomMode = false
app.winConditions  = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]
app.gameWinner = $('.winner')


$(document).ready(function () {

app.handleReset = () => {

  app.currentPlayer = "X";
  app.gameGrid = ["", "", "", "", "", "", "", "", ""];
  app.displayPlayer = $('.player').html(`Blue's Turn`).css("color", "blue")
  app.gameWinner = $('.winner').html('')
  $(app.gameCell).each(function () {
    $(this).removeClass("X")
    $(this).removeClass("O")
  });
  $('.game-complete').removeClass('show')
  $(app.gameCell).attr('aria-pressed', 'false').attr('disabled', false)
  $(app.randomButton).html('Random Mode: OFF')
  app.randomMode = false
}

app.checkWin = (playerMove) => {

  return app.winConditions.some((combination) => {
    return combination.every(i => {
      return app.gameGrid[i] === playerMove
    })
  });
}

app.handleWin = (currentPlayer) => {

  const check = app.checkWin(currentPlayer)
  const possibility = {}

  possibility.blueWins = (() => {
    if ((check && currentPlayer === "X")) {
      $(app.gameWinner).html(`Blue Wins`)
      $('.game-complete').addClass('show')
      $(app.displayPlayer).html('')
      $(app.gameCell).attr('aria-pressed', 'true').attr('disabled', true)
      return true
    }
  })()

  possibility.yellowWins = (() => {
    if ((check && currentPlayer === "O")) {
      $(app.gameWinner).html(`Yellow Wins`)
      $('.game-complete').addClass('show')
      $(app.displayPlayer).html('')
      $(app.gameCell).attr('aria-pressed', 'true').attr('disabled', true)     
      return true
    }
  })()

  possibility.draw = (() => {
    if ((app.gameGrid.includes("") === false)) {
      $(app.gameWinner).html(`Draw!`)
      $('.game-complete').addClass('show')
      $(app.displayPlayer).html('No More Turns')
      return true
    }
  })()

  return possibility[currentPlayer]
}


app.randomMove = (currentPlayer) => {

  let randomIndex = Math.floor(Math.random() * app.gameGrid.length)
  const conditionsArray = [
    app.gameGrid[currentPlayer] !== "X" || app.gameGrid[currentPlayer] !== "O",
    randomIndex === app.gameGrid.indexOf("X") || randomIndex === app.gameGrid.indexOf("O"),
  ]

  if (conditionsArray[0] === true && conditionsArray[1] === false) {
    app.gameGrid[randomIndex] = app.currentPlayer
    $(app.gameCell[randomIndex]).addClass(currentPlayer).attr('aria-pressed', 'true')
  } else if (conditionsArray[0] === true && conditionsArray[1] === true) {
    app.randomMove(currentPlayer)
  }

}


app.handleGameCellClick = (e) => {

  const cellIndex = $(app.gameCell).index(e.target)
  const cellClicked = e.target

  if (app.gameGrid[cellIndex] !=="") {
    alert('This space is already played. Choose another move')
    return
  } else {
    app.playerMove(cellIndex, cellClicked)
  }
}

app.playerMove = (cellIndex, cellClicked) => {

  const turnO = app.currentPlayer === "X" ? "O" : "X"
  const turnX = app.currentPlayer === "X" ? "O" : "X"

  if (app.currentPlayer === "X") { 
    if (app.randomMode === true) {
      app.randomMove(app.currentPlayer)
      app.handleWin(app.currentPlayer)
      app.currentPlayer = turnO
      $(app.displayPlayer).html(`Yellow's Turn`).css("color", "yellow")
    } 
    else {  
    $(app.displayPlayer).html(`Yellow's Turn`).css("color", "yellow")
    $(cellClicked).addClass("X").attr('aria-pressed', 'true');
    app.gameGrid[cellIndex] = app.currentPlayer
    app.handleWin(app.currentPlayer)
    app.currentPlayer = turnO ;  
  }

  } else if (app.currentPlayer === "O") {
    if (app.randomMode === true) {
      app.randomMove(app.currentPlayer)
      app.handleWin(app.currentPlayer)
      app.currentPlayer = turnX
      $(app.displayPlayer).html(`Blue's Turn`).css("color", "blue")
    } 
    else {
    $(cellClicked).addClass("O").attr('aria-pressed', 'true');
    $(app.displayPlayer).html(`Blue's Turn`).css("color", "blue")
    app.gameGrid[cellIndex] = app.currentPlayer;
    app.handleWin(app.currentPlayer)
    app.currentPlayer = turnX;
    }
  }
}

$(app.resetButton).on('click', app.handleReset) 

$(app.gameCell).each(function () {
  $(this).on('click', app.handleGameCellClick)
});

$(app.resetButton).on('click', app.handleReset)

$(app.randomButton).click('click', function() {
  app.randomMode = !app.randomMode;
  if (app.randomMode === true) {
    $(app.randomButton).html('Random Mode: ON').css("background-color", "green").css("color", "white")
  } else if (app.randomMode === false) {
    $(app.randomButton).html('Random Mode: OFF').css("background-color", "whitesmoke").css("color", "black")
  }
})
  
}); 