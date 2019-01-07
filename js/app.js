let gameBoard
let blacksTurn = true
let redScore
let blackScore

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

function play(square) {
  console.log(square.classList[0])
  if(square.classList[0] === 'square') {
    const player  = currentPlayer()
    blacksTurn ? blackPlayer.numberOfDisks -=  1 : redPlayer.numberOfDisks -= 1

    //change turns
    blacksTurn = !blacksTurn

    const disk = document.createElement('div')
    disk.classList.add('disk')
    disk.classList.add(player.color)
    square.append(disk)
    setScore()
  }
}

function findCell(x) {
  return document.getElementById(x)
}

function playerInitialPlace() {
  play(findCell(27), redPlayer.color)
  play(findCell(28), blackPlayer.color)
  play(findCell(35), redPlayer.color)
  play(findCell(36), blackPlayer.color)
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
