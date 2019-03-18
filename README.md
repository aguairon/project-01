# General Assembly Project 1 : Simple front-end game

### Timeframe
7 days

## Technologies used
* JavaScript (ES6) 
* HTML5
* CSS + CSS Animation
* GitHub

## Installation
1. Clone or download the repo
1. Open the `index.html` in your browser of choice

## My Game - Othello
<img width="1382" alt="screenshot 2019-01-11 at 11 40 13" src="https://user-images.githubusercontent.com/9445433/51031840-b1def480-1595-11e9-8f19-41ff51a4489d.png">

### Game overview
The game is a version of the reversi game, a strategy game for two players played on a 8 X 8 board. Each player has 32 disks, either red (Desdemona) or black (Othello). The players take turns to place on the board. The player can only place a disk on an empty square that will result on an opponent's piece, or a row of opponent's pieces, to be flanked by the players disks. The surrounded pieces are then swapped for the player's disks. The player that first runs out of disks wins.

### Game Instructions
1. Choose the option you want to play on the starter page. On single player mode you will play as Othello agains the computer.
<img width="1382" alt="screenshot 2019-01-11 at 11 41 12" src="https://user-images.githubusercontent.com/9445433/51031864-d2a74a00-1595-11e9-9fa0-8843e22ac598.png">

2. Once the option is chosen the 8 X 8 board will appear with 2 disks on each colour on their initial positions. The turns are indicated by an icon next to the either Desdemona's or Othello's name.
<img width="1259" alt="Screenshot 2019-03-18 at 13 02 37" src="https://user-images.githubusercontent.com/9445433/54531821-219aa280-497e-11e9-8705-83ebda2deed5.png">

3. The player can place a disk by clicking on the square of their choice. If it is valid move the disk will appear and all the flanked opponents' pieces will be replaced. If it is not valid the shadow of a disk will appear and disappear.
![othello1](https://user-images.githubusercontent.com/9445433/54533986-52310b00-4983-11e9-85d9-2eb49c84487f.gif)

4. The winner is the first player to have played all 32 disks
<img width="1287" alt="Screenshot 2019-03-18 at 13 44 22" src="https://user-images.githubusercontent.com/9445433/54534297-f7e47a00-4983-11e9-930d-9718431b9c1e.png">

## Process

The first step was to create the game-board in which the pieces are placed. This was achieved by creating a 'game-board' div that contained 64 'square' divs. Then I placed the 4 initial blocks. I created a function that takes a square id and a player's colour. This function then creates a disk div and appends it to the square div. For these 4 initial disks the ids and colours are hardcoded. For all other disks the colour is current player's colour and the square id is the id of whichever square was clicked on.

Once this was achieved the next step was to write the logic that would allow the player to place a disk only on valid squares. The function that does this checks the square clicked to see, first, if in any direction, there is an adjacent opponents' disk and, then, if in that direction there are any of the players'. If this is the case the disk appears on the clicked square and the turn goes to the other player.

The next step was to write the logic that would reassign the flanked disks to the current players' colour. The function in control of this checks all directions to see if there are any opponents' disks surrounded by the current players' ones and changes their class. The class controls the colour of the disk.

After each turn we check if any player has no disks left, in that case there is a banner indicating who won. If not the score updates.

When I got to this point I decided to implement  the option to play against the computer.  The computer is playing as Desdemona and the human player as Othello. The computer uses basically the same logic that was already in place.  The computer checks all directions for valid moves and then chooses the a ramdom option to place a red disk. 

On the last day I added the screen in which you could choose the player mode. I also added user feedback in the case that a non-valid square was clicked on. 

### Wins

For me the greatest win was the function that checked the opponents disks on all directions to see if they had to be changed or not. The logic is quite complex and quite a few conditions had to be met.
```
function reassignDisks(square) {
  const directions = [right, left, up, down, rightdown, rightup, leftdown, leftup]
  directions.forEach(direction => {
    if (isAnyFollowingDisksInDirectionTheSame(square, direction)) {
      let squareId = direction(square.id)

      while (squareId) {
        const colorOfThisSquare = colorOfSquare(findSquare(squareId))
        const colorOfNextSquare = colorOfSquare(findSquare(direction(squareId)))
        if (colorOfThisSquare && colorOfNextSquare && colorOfThisSquare !== board.currentPlayer.color ) {
          const disk = findDisk(squareId)
          removePreviousPlayerDisks(disk)
          convertCurrentPlayerDisks(disk)
        } else {
          return
        }
        squareId = direction(squareId)
      }
    }
  })
} 
```

### Future features

It would be nice to make the site a bit more user friendly. I have noticed that people playing it were not always aware when it was their turn. Also to add a bit a bigger delay on the computer placing a disk as you wer focusing of the disks changing colour and before you really notice they are changing back not being aware the computer has already played.

