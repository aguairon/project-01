let gameBoard
let columns

function createBoard() {
  for(let i = 0; i < 8; i++) {
    const newColumn = document.createElement('div')
    newColumn.classList.add('column')
    newColumn.classList.add(i)
    newColumn.setAttribute('id', i)
    gameBoard.append(newColumn)
  }

  columns = document.querySelectorAll('.column')

  columns.forEach(column => {
    for(let i = 0; i < 8; i++) {
      const newRow = document.createElement('div')
      newRow.classList.add('row')
      newRow.classList.add(i)
      newRow.setAttribute('id', i)
      column.append(newRow)
    }
  })
}

function findSquare(x, y) {
  return document.querySelector('.column', `.${x}`).querySelector('.row', `.${y}`)
}

document.addEventListener('DOMContentLoaded', ()=>{
  gameBoard = document.querySelector('.game-board')

  createBoard()

  const dot = document.createElement('span')
  dot.classList.add('dot')
  findSquare(0, 0).append(dot)
})
