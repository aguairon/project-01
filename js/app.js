let gameBoard
let columns
let black = true
let colour
let redScore
let blackScore
let redDisks = 32
let blackDisks = 32

function calculateScore() {
  redScore = 32 - redDisks
  blackScore = 32 - blackDisks
}

function setScore() {
  const red = document.querySelector('.red')
  red.innerText= redScore

  const black = document.querySelector('.black')
  black.innerText= blackScore
}

function currentPlayer() {
  return black ? colour = 'black' : colour = 'red'
}

function addDisks(square) {
  if(square.nodeName !== 'SPAN') {
    colour = currentPlayer()
    // take number of disks used from available disks
    black ? blackDisks -=  1 : redDisks -= 1
    console.log(blackDisks)
    //change turns
    black = !black

    const disk = document.createElement('span')
    disk.classList.add('disk')
    disk.classList.add(colour)
    square.append(disk)
    calculateScore()
    setScore()
  }
}

function findCell(x, y) {
  return document.querySelector('.column'+ x).querySelector('.row' + y)
}

function disksInitialPlace() {
  addDisks(findCell(3, 3), 'red')
  addDisks(findCell(3, 4), 'black')
  addDisks(findCell(4, 4), 'red')
  addDisks(findCell(4, 3), 'black')
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
  calculateScore()
  setScore()

  gameBoard.addEventListener('click', (e) =>  addDisks(e.target))
})
