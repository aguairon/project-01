document.addEventListener('DOMContentLoaded', ()=>{
  const gameBoard = document.querySelector('.game-board')

  for(let i = 0; i < 8; i++) {
    const newColumn = document.createElement('div')
    newColumn.classList.add('column')
    gameBoard.append(newColumn)
  }

  const columns = document.querySelectorAll('.column')

  columns.forEach(column => {
    for(let i = 0; i < 8; i++) {
      const newRow = document.createElement('div')
      newRow.classList.add('row')
      column.append(newRow)
      console.log(newRow)
    }
  })
})
