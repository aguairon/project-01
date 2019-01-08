let gameBoard
let redScore
let blackScore
let blacksTurn = true
let directions = []

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

function previousPlayer() {
  return blacksTurn ?  redPlayer : blackPlayer
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
  if (square && square.querySelector('div') ) {
    return square.querySelector('div').classList[1]
  }
}

function isAdjacentDiskOpposite(square) {
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
  return directions
}

function isAdjacentDiskOppositeInDirection(square, direction) {
  const adjacent = document.getElementById(direction(square.id))
  const adjacentColor = colorOfSquare(adjacent)
  return !!adjacentColor && adjacentColor !== currentPlayer().color
}

function isAnyFollowingDisksInDirectionTheSame(square, direction) {
  let nextSqId = direction(square.id)
  const followingSqId = direction(nextSqId)
  const followingSquare = document.getElementById(followingSqId)
  const followingColor = colorOfSquare(followingSquare)

  while(followingColor !== currentPlayer().color) {
    nextSqId = followingSqId
    return false
  }
  return true
}

function reassignDisks(square) {
  const adjacent = document.getElementById(left(square.id)).querySelector('div')
  adjacent.classList.remove(currentPlayer().color)
  adjacent.classList.add(previousPlayer().color)
  console.log(currentPlayer().color)
}


function validMove(square) {
  const directions = isAdjacentDiskOpposite(square)
  if (directions.length > 0) {
    return directions.map(direction => {
      isAnyFollowingDisksInDirectionTheSame(square, direction)
    })
  }
}

function isSquareEmpty(square) {
  return square.classList[0] === 'square'
}

function play(square) {
  if(isSquareEmpty(square)) {
    if (validMove(square)) {
      playDisk(square)
      reassignDisks(square)
      directions = []
    }
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
