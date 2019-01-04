let gameBoard
let columns

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

  addDisks(3, 3)
  addDisks(3, 4)
  addDisks(4, 4)
  addDisks(4, 3)
}

function addDisks(x, y) {
  const disk = document.createElement('span')
  disk.classList.add('disk')
  findSquare(x, y).append(disk)
}

function findSquare(x, y) {
  const a = document.querySelector('.column'+ x).querySelector('.row' + y)
  return a
}

document.addEventListener('DOMContentLoaded', ()=>{
  gameBoard = document.querySelector('.game-board')

  createBoard()
})
