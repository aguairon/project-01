let gameBoard
let columns

function addDisks(square, color) {
  const disk = document.createElement('span')
  disk.classList.add('disk')
  disk.classList.add(color)
  square.append(disk)
}

function findSquare(x, y) {
  return document.querySelector('.column'+ x).querySelector('.row' + y)
}

function disksInitialPlace() {
  addDisks(findSquare(3, 3), 'red')
  addDisks(findSquare(3, 4), 'black')
  addDisks(findSquare(4, 4), 'red')
  addDisks(findSquare(4, 3), 'black')
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

function aver(e) {
  console.log('pepe')
  console.log(e.target)
}

document.addEventListener('DOMContentLoaded', ()=>{
  gameBoard = document.querySelector('.game-board')

  createBoard()

  gameBoard.addEventListener('click', aver)
})
