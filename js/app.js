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

function addDisk(square) {
  blacksTurn ? blackPlayer.numberOfDisks -=  1 : redPlayer.numberOfDisks -= 1
  const player  = currentPlayer()
  const disk = document.createElement('div')
  disk.classList.add('disk')
  disk.classList.add(player.color)
  square.append(disk)

  blacksTurn = !blacksTurn
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
  return (
    isAdjacentDiskOppositeInDirection(square, right) ||
    isAdjacentDiskOppositeInDirection(square, left) ||
    isAdjacentDiskOppositeInDirection(square, up) ||
    isAdjacentDiskOppositeInDirection(square, down)
  )
}

function isAdjacentDiskOppositeInDirection(square, direction) {
  const adjacent = document.getElementById(direction(square.id))
  const adjacentColor = colorOfSquare(adjacent)
  return !!adjacentColor && adjacentColor !== currentPlayer().color
}

function isAnyDiskToTheRightTheSame(square) {

}

function play(square) {
  if(square.classList[0] === 'square') {
    console.log(isAdjacentDiskOpposite(square))



  }
}

function playerInitialPlace() {
  addDisk(document.getElementById(27))
  addDisk(document.getElementById(28))
  addDisk(document.getElementById(36))
  addDisk(document.getElementById(35))
}

function createBoard() {
  for(let i = 0; i < 64; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    square.setAttribute('id', i)
    gameBoard.append(square)
  }

  playerInitialPlace()
}

document.addEventListener('DOMContentLoaded', ()=>{
  gameBoard = document.querySelector('.game-board')
  redScore = document.querySelector('.red')
  blackScore = document.querySelector('.black')
  createBoard()


  gameBoard.addEventListener('click', (e) =>  play(e.target))
})
