let gameBoard
let columns

function addDisks(x, y, color) {
  const disk = document.createElement('span')
  disk.classList.add('disk')
  disk.classList.add(color)
  findSquare(x, y).append(disk)
}

function findSquare(x, y) {
  const a = document.querySelector('.column'+ x).querySelector('.row' + y)
  return a
}

function disksInitialPlace() {
  addDisks(3, 3, 'red')
  addDisks(3, 4, 'black')
  addDisks(4, 4, 'red')
  addDisks(4, 3, 'black')
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
})
