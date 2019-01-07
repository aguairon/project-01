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
  if(square.classList[0] === 'square') {
    const directions = [-1, + 1, -8, +8]

    directions.forEach(direction => {
      if(document.getElementById(parseInt(square.id) + direction)) {
        if (document.getElementById(parseInt(square.id) + direction).querySelector('div')) {
          if(document.getElementById(parseInt(square.id) + direction).querySelector('div').classList[1] !== currentPlayer().color){
            //check other tiles in same direction
            console.log(document.getElementById(parseInt(square.id) + direction).querySelector('div'))
            addDisk(square)
          } else {
            console.log('nay')
          }
        } else {
          return
        }
      }
    })
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
