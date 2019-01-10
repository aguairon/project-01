let gameBoard
let redScore
let blackScore
let replayButton
let banner
let scoreSection
const numberOfDisks = 32

const redPlayer = {
  name: 'Desdemona',
  color: 'red',
  initialNumberOfDisks: numberOfDisks,
  calculateCurrentNumberOfDisks: function() {
    return this.initialNumberOfDisks - board.calculateScore(this.color)
  }
}

const blackPlayer = {
  name: 'Othello',
  color: 'black',
  initialNumberOfDisks: numberOfDisks,
  calculateCurrentNumberOfDisks: function() {
    return this.initialNumberOfDisks - board.calculateScore(this.color)
  }
}

const board = {
  numberOfPlayers: 1,
  currentPlayer: blackPlayer,
  winner: null,
  changePlayersTurn: function() {
    if (this.currentPlayer === blackPlayer) {
      this.currentPlayer = redPlayer
    } else {
      this.currentPlayer = blackPlayer
    }
  },
  calculateScore: function(color) {
    return document.querySelectorAll(`.disk.${color}`).length
  },
  checkForWinner: function() {
    if(this.currentPlayer.calculateCurrentNumberOfDisks() <= 0) {
      this.winner = this.currentPlayer
    }
  }
}

function setScore() {
  redScore.innerText= board.calculateScore(redPlayer.color)
  blackScore.innerText= board.calculateScore(blackPlayer.color)
  board.checkForWinner()
}

function addDisk(square) {
  addColorDisks(square, board.currentPlayer.color)
}

function addColorDisks(square, color) {
  const disk = document.createElement('div')
  disk.classList.add('disk')
  disk.classList.add(color)
  square.append(disk)
}

function left(id) {
  id = parseInt(id)
  if (id % 8 !== 0) return id - 1
}

function right(id) {
  id = parseInt(id)
  if (id % 8 !== 7) return id + 1
}

function up(id) {
  id = parseInt(id)
  if (id > 7) return id - 8
}

function down(id) {
  id = parseInt(id)
  if (id < 56) return id + 8
}

function leftup(id) {
  id = parseInt(id)
  if (id % 8 !== 0 && id > 7) return id - 9
}

function leftdown(id) {
  id = parseInt(id)
  if (id % 8 !== 0 && id < 56) return id + 7
}

function rightup(id) {
  id = parseInt(id)
  if (id % 8 !== 7 && id > 7) return id - 7
}

function rightdown(id) {
  id = parseInt(id)
  if (id % 8 !== 7 && id < 56) return id + 9
}

function colorOfSquare(square) {
  if (square && square.querySelector('div') ) {
    return square.querySelector('div').classList[1]
  }
}

function oppositeAdjacentDiskDirections(square) {
  return [right, left, up, down, rightdown, rightup, leftdown, leftup].filter(direction =>
    isAdjacentDiskOppositeInDirection(square, direction)
  )
}

function isAdjacentDiskOppositeInDirection(square, direction) {
  const adjacent = findSquare(direction(square.id))
  const adjacentColor = colorOfSquare(adjacent)
  return !!adjacentColor && adjacentColor !== board.currentPlayer.color
}

function isAnyFollowingDisksInDirectionTheSame(square, direction) {
  let squareId = direction(square.id)

  while (squareId) {
    if (colorOfSquare(findSquare(squareId)) === board.currentPlayer.color) {
      return true
    }
    squareId = direction(squareId)
  }

  return false
}

function removePreviousPlayerDisks(disk) {
  let classToRemove
  board.currentPlayer.color === blackPlayer.color ? classToRemove = redPlayer.color : classToRemove = blackPlayer.color
  disk.classList.remove(classToRemove)
}

function convertCurrentPlayerDisks(disk) {
  disk.classList.add(board.currentPlayer.color)
}

function reassignDisks(square) {
  const directions = [right, left, up, down, rightdown, rightup, leftdown, leftup]
  directions.forEach(direction => {
    if (isAnyFollowingDisksInDirectionTheSame(square, direction)) {
      let squareId = direction(square.id)

      while (squareId) {
        const colorOfThisSquare = colorOfSquare(findSquare(squareId))
        const colorOfNextSquare = colorOfSquare(findSquare(direction(squareId)))
        if (colorOfThisSquare && colorOfNextSquare && colorOfThisSquare !== board.currentPlayer.color ) {
          const disk = findDisk(squareId)
          removePreviousPlayerDisks(disk)
          convertCurrentPlayerDisks(disk)
        } else {
          return
        }
        squareId = direction(squareId)
      }
    }
  })
}


function validMove(square) {
  const directions = oppositeAdjacentDiskDirections(square)
  return directions.some(direction => {
    return isAnyFollowingDisksInDirectionTheSame(square, direction)
  })
}

function computerValidMoves() {
  const redDisks = document.querySelectorAll('.disk.' + redPlayer.color)

  const validIds = []
  redDisks.forEach(redDisk => {
    const directions = oppositeAdjacentDiskDirections(redDisk.parentElement)
    if(directions.length > 0) {
      directions.forEach(direction => {
        let squareId = direction(redDisk.parentElement.id)

        while (findSquare(squareId) &&
        findDisk(squareId) && colorOfSquare(findSquare(squareId)) !== board.currentPlayer.color) {
          squareId = direction(squareId)
        }
        if (!!squareId && !validIds.includes(squareId) && colorOfSquare(findSquare(squareId)) !== board.currentPlayer.color) {
          validIds.push(squareId)
        }
      })
    }
  })
  return validIds
}

function isSquareEmpty(square) {
  return square.classList[0] === 'square' && !square.hasChildNodes()
}

function showWinnerBanner() {
  scoreSection.classList.remove('active')
  banner.innerText = board.winner.name + ' wins'
  banner.classList.add('active')
}

function updateGameBoard(square) {
  addDisk(square)
  reassignDisks(square)
  setScore()
  if(!board.winner) {
    board.changePlayersTurn()
    showCurrentTurn()
  } else {
    showWinnerBanner()
  }
}

function play(square) {
  if (!board.winner) {
    if(board.numberOfPlayers === 2 || board.numberOfPlayers === 1 && board.currentPlayer === blackPlayer) {
      if (validMove(square)) {
        humanMove(square)
      }

      if (board.currentPlayer === redPlayer && board.numberOfPlayers === 1) {
        computerMove()
      }
    }
  }
}

function humanMove(square) {
  if (validMove(square)) {
    updateGameBoard(square)
  }
}

function computerMove() {
  const validIds = computerValidMoves()
  const square = findSquare(validIds[0])
  let timeRemaining = 3

  const timerId = setInterval(() => {
    timeRemaining--
    if(timeRemaining === 0) {
      clearInterval(timerId)
      if(isSquareEmpty(square)) {
        updateGameBoard(square)
      }
    }
  }, 500)
}

function findSquare(id) {
  return document.getElementById(id)
}

function findDisk(id) {
  return findSquare(id).querySelector('div')
}

function findImage(color) {
  return document.querySelector(color).querySelector('img')
}

function playersInitialPositions() {
  const initialPositions = {27: blackPlayer.color, 28: redPlayer.color, 35: redPlayer.color, 36: blackPlayer.color}
  const pos = Object.entries(initialPositions)
  pos.forEach(position => addColorDisks(findSquare(position[0]), position[1]))
}

function createBoard() {
  banner.classList.remove('active')
  scoreSection.classList.add('active')
  for(let i = 0; i < 64; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    square.setAttribute('id', i)
    gameBoard.append(square)
  }

  playersInitialPositions()
  setScore()
  showCurrentTurn()
}

function showCurrentTurn() {
  let color
  let otherColor
  if (board.currentPlayer.color === blackPlayer.color) {
    color = blackPlayer.color
    otherColor = redPlayer.color
  } else {
    color = redPlayer.color
    otherColor = blackPlayer.color
  }

  findImage('.' + otherColor).classList.remove('active')
  findImage('.' + color).classList.add('active')
}

function resetGameConditions() {
  board.winner = null
  board.currentPlayer = blackPlayer
}

function resetBoard() {
  while (gameBoard.firstChild) {
    gameBoard.removeChild(gameBoard.firstChild)
  }
  createBoard()
}

function resetGame() {
  resetBoard()
  resetGameConditions()
}
function addLogo(){
  const header = document.querySelector('header')
  const logo = document.createElement('img')
  logo.setAttribute('src', 'images/Othello (board game) free icon 4.jpeg')
  header.append(logo)
}

document.addEventListener('DOMContentLoaded', ()=>{
  gameBoard = document.querySelector('.game-board')
  redScore = document.querySelector('.red span')
  blackScore = document.querySelector('.black span')
  replayButton = document.querySelector('.button')
  banner = document.querySelector('.winner')
  scoreSection = document.querySelector('.score')


  // addLogo()
  // createBoard()

  gameBoard.addEventListener('click', (e) =>  play(e.target))

  replayButton.addEventListener('click', () => resetGame())

})
