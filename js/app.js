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

function play(square) {
  // console.log(document.getElementById(parseInt(square.id) + 1).querySelector(''))

  // console.log(document.getElementById(parseInt(square.id) - 1).querySelector(blacksTurn ?  '.red' : '.black'))
  if(square.classList[0] === 'square') {
    const previous = document.getElementById(parseInt(square.id) - 1)
    const after = document.getElementById(parseInt(square.id) + 1)
    const above = document.getElementById(parseInt(square.id) + 8)
    const below = document.getElementById(parseInt(square.id) - 8)

    if (after.querySelector(blacksTurn ?  '.red' : '.black')
      || previous.querySelector(blacksTurn ?  '.red' : '.black')
      || above.querySelector(blacksTurn ?  '.red' : '.black')
      || below.querySelector(blacksTurn ?  '.red' : '.black')) {
      addDisk(square)
    }
  }
}

function findCell(x) {
  return document.getElementById(x)
}

function playerInitialPlace() {
  addDisk(findCell(27))
  addDisk(findCell(28))
  addDisk(findCell(36))
  addDisk(findCell(35))
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
