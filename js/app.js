let gameBoard
let columns

function addDisks(square, color) {
  if(!square.querySelector('span')) {
    const disk = document.createElement('span')
    disk.classList.add('disk')
    disk.classList.add(color)
    square.append(disk)
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

  gameBoard.addEventListener('click', (e) =>  addDisks(e.target, 'red'))
})
