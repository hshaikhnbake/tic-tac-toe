

const app = {}
app.displayPlayer = $('.player').html('Blue Turn')
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

app.handleFacebook = () => {
  FB.ui({
    display: 'popup',
    method: 'share',
    href: 'https://developers.facebook.com/docs/',
  }, function (response) { });
}

app.handleReset = () => {
  app.currentPlayer = "X";
  app.gameGrid = ["", "", "", "", "", "", "", "", ""];
  app.displayPlayer = $('.player').html('Blue Turn')
  app.gameWinner = $('.winner').html('')
  $(app.gameCell).each(function () {
    $(this).removeClass("X")
    $(this).removeClass("O")
  });
  $('.game-complete').removeClass('show')
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

      return true
    }
  })()

  possibility.yellowWins = (() => {
    if ((check && currentPlayer === "O")) {
      $(app.gameWinner).html(`Yellow Wins`)
      $('.game-complete').addClass('show')
      $(app.displayPlayer).html('')
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


app.handleGameCellClick = e => {
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

  if (app.currentPlayer === "X") {
    $(app.displayPlayer).html('Yellow Turn')
    $(cellClicked).addClass("X");
    app.gameGrid[cellIndex] = app.currentPlayer
    app.handleWin(app.currentPlayer)
    app.currentPlayer = app.currentPlayer === "X" ? "O" : "X" ;


  } else if (app.currentPlayer === "O") {
    $(cellClicked).addClass("O");
    $(app.displayPlayer).html('Blue Turn')
    app.gameGrid[cellIndex] = app.currentPlayer;
    app.handleWin(app.currentPlayer)
    app.currentPlayer = app.currentPlayer === "O" ? "X" : "O";
    
  }
}

$(app.resetButton).on('click', app.handleReset) 

$(app.gameCell).each(function () {
  $(this).on('click', app.handleGameCellClick)
});

$('.share-facebook').on('click', app.handleFacebook)

app.init = function () {
}


$(document).ready(function () {
  app.init();
}); 