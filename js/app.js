let gameBoard
let redScore
let blackScore
let blacksTurn = true

const redPlayer = {
  color: 'red',
  numberOfDisks: 32,
  calculateScore: function() {
    return 32 - parseInt(this.numberOfDisks)
  }
}

const blackPlayer = {
  color: 'black',
  numberOfDisks: 32,
  calculateScore: function() {
    return 32 - parseInt(this.numberOfDisks)
  }
}

function setScore() {
  redScore.innerText= redPlayer.calculateScore()
  blackScore.innerText= blackPlayer.calculateScore()
}

function currentPlayer() {
  return blacksTurn ? blackPlayer : redPlayer
}

function reduceAvailableDisks() {
  currentPlayer().numberOfDisks -= 1
}

function changePlayersTurn() {
  blacksTurn = !blacksTurn
}

function addDisk(square) {
  const disk = document.createElement('div')
  disk.classList.add('disk')
  disk.classList.add(currentPlayer().color)
  square.append(disk)
}

function playDisk(square) {
  addDisk(square)
  reduceAvailableDisks()
  changePlayersTurn()
  setScore()
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

function colorOfSquare(square) {
  const disk = square.querySelector('div')
  if (disk) {
    return disk.classList[1]
  }
}

function isAdjacentDiskOpposite(square) {
  if (isAdjacentDiskOppositeInDirection(square, right)) {
    return 'right'
  } else if (isAdjacentDiskOppositeInDirection(square, left)) {
    return 'left'
  } else if (isAdjacentDiskOppositeInDirection(square, up)) {
    return 'up'
  } else if (isAdjacentDiskOppositeInDirection(square, down)) {
    return 'down'
  }
}

function isAdjacentDiskOppositeInDirection(square, direction) {
  const adjacent = document.getElementById(direction(square.id))
  const adjacentColor = colorOfSquare(adjacent)
  return !!adjacentColor && adjacentColor !== currentPlayer().color
}

function isAnyDiskToTheRightTheSame(square) {
  const direction = isAdjacentDiskOpposite(square)
  console.log(direction)
}

function isSquareEmpty(square) {
  return square.classList[0] === 'square'
}

function play(square) {
  if(isSquareEmpty(square)) {
    isAnyDiskToTheRightTheSame(square) //todo
    if (isAdjacentDiskOpposite(square)) playDisk(square)
  }
}

function findSquare(id) {
  return document.getElementById(id)
}

function playersInitialPositions() {
  const initialPositions = [27, 28, 36, 35]
  initialPositions.forEach(position => playDisk(findSquare(position)))
}

function createBoard() {
  for(let i = 0; i < 64; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    square.setAttribute('id', i)
    gameBoard.append(square)
  }

  playersInitialPositions()
}

document.addEventListener('DOMContentLoaded', ()=>{
  gameBoard = document.querySelector('.game-board')
  redScore = document.querySelector('.red')
  blackScore = document.querySelector('.black')
  createBoard()

  gameBoard.addEventListener('click', (e) =>  play(e.target))
})
