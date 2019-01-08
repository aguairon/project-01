let gameBoard
let redScore
let blackScore
let blacksTurn = true
let directions = []
let succesfulDirection

const redPlayer = {
  color: 'red',
  numberOfDisks: 30,
  calculateScore: function() {
    return 32 - parseInt(this.numberOfDisks)
  }
}

const blackPlayer = {
  color: 'black',
  numberOfDisks: 30,
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

function reduceCurrentPlayerAvailableDisks() {
  currentPlayer().numberOfDisks -= 1
}

function incrementPreviousPlayerAvailableDisks() {
  previousPlayer().numberOfDisks += 1
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
    console.log('not' , direction)
    return false
  }
  succesfulDirection = direction
  console.log('suc', succesfulDirection)
  return true
}

function reassignDisks(square) {
  const adjacent = document.getElementById(succesfulDirection(square.id)).querySelector('div')
  adjacent.classList.remove(previousPlayer().color)
  adjacent.classList.add(currentPlayer().color)
  reduceCurrentPlayerAvailableDisks()
  incrementPreviousPlayerAvailableDisks()
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
      addDisk(square)
      reassignDisks(square)
      setScore()
      changePlayersTurn()
      directions = []
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
  for(let i = 0; i < 64; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    square.setAttribute('id', i)
    gameBoard.append(square)
  }

  playersInitialPositions()
  setScore()
}

document.addEventListener('DOMContentLoaded', ()=>{
  gameBoard = document.querySelector('.game-board')
  redScore = document.querySelector('.red')
  blackScore = document.querySelector('.black')
  createBoard()

  gameBoard.addEventListener('click', (e) =>  play(e.target))

})
