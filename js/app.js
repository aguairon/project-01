let gameBoard
let redScore
let blackScore
let replayButton
let banner
let scoreSection

const redPlayer = {
  name: 'Desdemona',
  color: 'red',
  initialNumberOfDisks: 32,
  calculateCurrentNumberOfDisks: function() {
    return this.initialNumberOfDisks - board.calculateScore(this.color)
  }
}

const blackPlayer = {
  name: 'Othello',
  color: 'black',
  initialNumberOfDisks: 32,
  calculateCurrentNumberOfDisks: function() {
    return parseInt(this.initialNumberOfDisks) - board.calculateScore(this.color)
  }
}

const board = {
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
    // console.log(document.querySelectorAll(`.disk.${color}`))
    return document.querySelectorAll(`.disk.${color}`).length
  },
  isThereAWinner: function() {
    if(this.currentPlayer.calculateCurrentNumberOfDisks() <= 0) {
      this.winner = this.currentPlayer
    }
  }
}

function setScore() {
  redScore.innerText= board.calculateScore('red')
  blackScore.innerText= board.calculateScore('black')
}

function addDisk(square) {
  const disk = document.createElement('div')
  disk.classList.add('disk')
  disk.classList.add(board.currentPlayer.color)
  square.append(disk)
}

function addInitialDisks(square, color) {
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
  const directions = []
  if (isAdjacentDiskOppositeInDirection(square, right)) {
    directions.push(right)
  }
  if (isAdjacentDiskOppositeInDirection(square, left)) {
    directions.push(left)
  }
  if (isAdjacentDiskOppositeInDirection(square, up)) {
    directions.push(up)
  }
  if (isAdjacentDiskOppositeInDirection(square, down)) {
    directions.push(down)
  }

  if (isAdjacentDiskOppositeInDirection(square, rightdown)) {
    directions.push(rightdown)
  }

  if (isAdjacentDiskOppositeInDirection(square, rightup)) {
    directions.push(rightup)
  }

  if (isAdjacentDiskOppositeInDirection(square, leftdown)) {
    directions.push(leftdown)
  }

  if (isAdjacentDiskOppositeInDirection(square, leftup)) {
    directions.push(leftup)
  }

  return directions
}

function isAdjacentDiskOppositeInDirection(square, direction) {
  const adjacent = document.getElementById(direction(square.id))
  const adjacentColor = colorOfSquare(adjacent)
  return !!adjacentColor && adjacentColor !== board.currentPlayer.color
}

function isAnyFollowingDisksInDirectionTheSame(square, direction) {
  let squareId = direction(square.id)

  while (squareId) {
    if (colorOfSquare(document.getElementById(squareId)) === board.currentPlayer.color) {
      return true
    }
    squareId = direction(squareId)
  }

  return false
}

function removePreviousPlayerDisks(disk) {
  let classToRemove
  board.currentPlayer.color === 'black' ? classToRemove = 'red' : classToRemove = 'black'
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
        if (colorOfSquare(document.getElementById(squareId)) !== board.currentPlayer.color) {
          const disk = document.getElementById(squareId).querySelector('div')
          if (disk) {
            removePreviousPlayerDisks(disk)
            convertCurrentPlayerDisks(disk)
          }
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

function isSquareEmpty(square) {
  return square.classList[0] === 'square' && !square.hasChildNodes()
}

function showWinnerBanner() {
  scoreSection.classList.remove('active')
  banner.innerText = board.winner.name + ' wins'
  banner.classList.add('active')
}

function play(square) {
  if (!board.winner) {
    if(isSquareEmpty(square)) {
      if (validMove(square)) {
        addDisk(square)
        reassignDisks(square)
        setScore()
        board.isThereAWinner()
        if(!board.winner) {
          board.changePlayersTurn()
          showCurrentTurn()
        } else {
          showWinnerBanner()
        }
      }
    }
  }
}

function findSquare(id) {
  return document.getElementById(id)
}

function playersInitialPositions() {
  const initialPositions = {27: 'black', 28: 'red', 35: 'red', 36: 'black'}
  const pos = Object.entries(initialPositions)
  pos.forEach(position => addInitialDisks(findSquare(position[0]), position[1]))
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
  if (board.currentPlayer.color === 'black') {
    color = 'black'
    otherColor = 'red'
  } else {
    color = 'red'
    otherColor = 'black'
  }

  document.querySelector('.' + otherColor).querySelector('img').classList.remove('active')
  document.querySelector('.' + color).querySelector('img').classList.add('active')
}

function resetBoard() {
  board.winner = null
  board.currentPlayer = blackPlayer
}


document.addEventListener('DOMContentLoaded', ()=>{
  gameBoard = document.querySelector('.game-board')
  redScore = document.querySelector('.red span')
  blackScore = document.querySelector('.black span')
  replayButton = document.querySelector('.button')
  banner = document.querySelector('.winner')
  scoreSection = document.querySelector('.score')

  createBoard()

  gameBoard.addEventListener('click', (e) =>  play(e.target))

  replayButton.addEventListener('click', () => {
    resetBoard()

    while (gameBoard.firstChild) {
      gameBoard.removeChild(gameBoard.firstChild)
    }
    createBoard()
  })

})
