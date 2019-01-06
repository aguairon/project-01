let gameBoard
let columns
let black = true
let colour

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
  const red = document.querySelector('.red')
  red.innerText= redPlayer.calculateScore()

  const black = document.querySelector('.black')
  black.innerText= blackPlayer.calculateScore()
}

function currentPlayer() {
  return black ? blackPlayer.color : redPlayer.color = 'red'
}

function addDisks(square) {
  if(square.nodeName !== 'SPAN') {
    colour = currentPlayer()
    // take number of disks used from available disks
    black ? blackPlayer.numberOfDisks -=  1 : redPlayer.numberOfDisks -= 1

    //change turns
    black = !black

    const disk = document.createElement('span')
    disk.classList.add('disk')
    disk.classList.add(colour)
    square.append(disk)
    setScore()
  }
}

function findCell(x, y) {
  return document.querySelector('.column'+ x).querySelector('.row' + y)
}

function disksInitialPlace() {
  addDisks(findCell(3, 3), redPlayer.color)
  addDisks(findCell(3, 4), blackPlayer.color)
  addDisks(findCell(4, 4), redPlayer.color)
  addDisks(findCell(4, 3), blackPlayer.color)
}

function createBoard() {
  for(let i = 0; i < 8; i++) {
    const newColumn = document.createElement('div')
    newColumn.classList.add('column')
    newColumn.classList.add('column'+ i)
    gameBoard.append(newColumn)
  }

  columns = document.querySelectorAll('.column')

  columns.forEach(column => {
    for(let i = 0; i < 8; i++) {
      const newRow = document.createElement('div')
      newRow.classList.add('row')
      newRow.classList.add('row' + i)
      column.append(newRow)
    }
  })

  disksInitialPlace()
}

document.addEventListener('DOMContentLoaded', ()=>{
  gameBoard = document.querySelector('.game-board')

  createBoard()

  gameBoard.addEventListener('click', (e) =>  addDisks(e.target))
})
