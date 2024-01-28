document.addEventListener('DOMContentLoaded' , () =>{
const grid = document.querySelector('.grid')
let field = Array.from(document.querySelectorAll('.grid div'))
const scoreDisplay =document.querySelector('#score')
const startButton =document.querySelector('#start-button')
const displayWidth = 10
let timerId 
let score = 0
var playAudio = true
const colors = [
  'url(images/blue_block.png)',
  'url(images/pink_block.png)',
  'url(images/purple_block.png)',
  'url(images/peach_block.png)',
  'url(images/yellow_block.png)'
]
//Tetrominos
const lTetromino = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [displayWidth, displayWidth + 1, displayWidth + 2, displayWidth * 2 + 2],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2],
    [displayWidth, displayWidth * 2, displayWidth * 2 + 1, displayWidth * 2 + 2]
  ]

const zTetromino = [
    [0,displayWidth,displayWidth+1,displayWidth*2+1],
    [displayWidth+1, displayWidth+2,displayWidth*2,displayWidth*2+1],
    [0,displayWidth,displayWidth+1,displayWidth*2+1],
    [displayWidth+1, displayWidth+2,displayWidth*2,displayWidth*2+1]
]

  const tTetromino = [
    [1,displayWidth,displayWidth+1,displayWidth+2],
    [1,displayWidth+1,displayWidth+2,displayWidth*2+1],
    [displayWidth,displayWidth+1,displayWidth+2,displayWidth*2+1],
    [1,displayWidth,displayWidth+1,displayWidth*2+1]
  ]

  const oTetromino = [
    [0,1,displayWidth,displayWidth+1],
    [0,1,displayWidth,displayWidth+1],
    [0,1,displayWidth,displayWidth+1],
    [0,1,displayWidth,displayWidth+1]
  ]

  const iTetromino = [
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1],
    [displayWidth,displayWidth+1,displayWidth+2,displayWidth+3],
    [1,displayWidth+1,displayWidth*2+1,displayWidth*3+1],
    [displayWidth,displayWidth+1,displayWidth+2,displayWidth+3]
  ]

  const tetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0
  let nextRandom = 0

//Wählt einen zufälligen Tetromino unrotiert aus
let random = Math.floor(Math.random()*tetrominos.length)
  let tetromino = tetrominos[random][currentRotation]

  //Zieht ein Tetromino
  function draw(){
    tetromino.forEach(square => {
        field[currentPosition + square].classList.add('tetromino')
        field[currentPosition +square].style.backgroundImage = colors[random]
    })
  }

  //Löscht ein Tetromino
  function undraw(){
    tetromino.forEach(square =>{
        field[currentPosition + square].classList.remove('tetromino')
        field[currentPosition +square].style.backgroundImage ='none'
    })
  }

  //Deklariert die Steuerung
  function control(e){
    if (e.keyCode === 65 && (timerId)|| e.keyCode === 37 && (timerId)) {moveLeft()}
    else if (e.keyCode === 68 && (timerId)|| e.keyCode === 39&& (timerId)) {moveRight()}
    else if (e.keyCode === 83 && (timerId)|| e.keyCode === 40&& (timerId)) {moveDown()}
    else if (e.keyCode === 87 && (timerId)|| e.keyCode === 38&& (timerId)) {rotate()}
}
document.addEventListener('keydown', control)

  //Logik für das Runterfallen des Tetrominos
  function moveDown(){
    if(!tetromino.some(square => field[currentPosition + square + displayWidth].classList.contains('taken'))) {
    undraw()
    currentPosition += displayWidth 
    draw()
    } else {
    freeze()
    }
  }

//Lässt das Tetromino einfrieren, wenn es den Boden oder ein anderes Tetromino trifft
function freeze(){
    tetromino.forEach(square => field[currentPosition + square].classList.add('taken'))
        //Lässt das nächste Tetromino fallen
        random = nextRandom
        nextRandom = Math.floor(Math.random()*tetrominos.length)
        tetromino = tetrominos[random][currentRotation]
        currentPosition = 4
        addScore()
        draw()
        displayShape()
        gameOver()
}

// Funktion, um das Tetromino sofort nach unten zu bewegen (Funktioniert noch nicht richtig)
function instantDrop() {
    while (!tetromino.some(square => field[currentPosition + square + displayWidth].classList.contains('taken'))) {
      undraw();
      currentPosition += displayWidth;
      draw();
    }
    freeze();
  }
//Lässt das Tetromino nach links bewegen, es sei denn ein Block oder das Ende des Spielfeldes ist im Weg
function moveLeft(){
    undraw()
    const isAtLeftEdge = tetromino.some(square => (currentPosition + square) % displayWidth === 0)

    if (!isAtLeftEdge) currentPosition -=1

    if(tetromino.some(square => field[currentPosition + square].classList.contains('taken'))){
currentPosition +=1
}
draw()
}

//Lässt das Tetromino nach rechts bewegen, es sei denn ein Block oder das Ende des Spielfeldes ist im Weg
function moveRight(){
    undraw()
    const isAtRightEdge = tetromino.some(square => (currentPosition + square) % displayWidth === displayWidth-1)

    if (!isAtRightEdge) currentPosition +=1

    if(tetromino.some(square => field[currentPosition + square].classList.contains('taken'))){
currentPosition -=1
}
draw()
}

//Lässt das Tetromino rotieren
function rotate() {

  const isAtLeftEdge = tetromino.some(square => (currentPosition + square) % displayWidth === 0);
  const isAtRightEdge = tetromino.some(square => (currentPosition + square) % displayWidth === (displayWidth - 1));

  if (!(isAtLeftEdge | isAtRightEdge)) {
      undraw();
      currentRotation++;
      if (currentRotation === tetromino.length) {
          //if currentRotation value is greater that 4 than reset same to 0
          currentRotation = 0;
      }
      tetromino = tetrominos[random][currentRotation];
  }
  draw();
}

//Logik für das nächste Tetromino in der Box neben dem Spielfeld anzeigen
const displaySquares = document.querySelectorAll('.next-Tetromino-Grid div')
const displayTetWidth = 4
const displayIndex = 0

//Liste mit Tetrominos die als nächstes rankommen können (unrotiert)
const upNextTetrominos = [
    [1, displayTetWidth + 1, displayTetWidth * 2 + 1, 2], //l Tetromino
    [0,displayTetWidth,displayTetWidth+1,displayTetWidth*2+1], //z Tetromino
    [1,displayTetWidth,displayTetWidth+1,displayTetWidth+2],//t Tetromino
    [0,1,displayTetWidth,displayTetWidth+1],//o Tetromino
    [1,displayTetWidth+1,displayTetWidth*2+1,displayTetWidth*3+1]//i Tetromino
]

//Zeigt das nächste Tetromino in der Box neben dem Spielfeld an
function displayShape(){
    displaySquares.forEach(square =>{
        square.classList.remove('tetromino')
        square.style.backgroundImage = 'none'
    })
    upNextTetrominos[nextRandom].forEach(square => {
        displaySquares[displayIndex + square].classList.add('tetromino')
        displaySquares[displayIndex + square].style.backgroundImage = colors[nextRandom]
    })
}

//Startet oder pausiert das Spiel
startButton.addEventListener('click' , () => {
    if (timerId) {
        clearInterval(timerId)
        timerId = null 
    } else {
        draw()
        timerId = setInterval(moveDown, 1000)
        nextRandom = Math.floor(Math.random()*tetrominos.length)
        displayShape()
    }
    //Spielt die Hintergrundmusik ab
    if (playAudio){
      
    var audio = new Audio("musik/tetris_theme.mp3")
    audio.loop = true
    audio.volume = 0.05
    audio.play();
    playAudio = false
}
})

//Wenn eine ganze Reihe gefüllt ist, verschwindet diese und der Score wird erhöht
function addScore(){
    for (let i = 0; i< 199; i+=displayWidth){
        const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9,]

        if(row.every(square => field[square].classList.contains('taken'))) {
            score += 100
            scoreDisplay.innerHTML = score
            row.forEach(square => {
                field[square].classList.remove('taken')
                field[square].classList.remove('tetromino')
                field[square].style.backgroundImage = 'none'
            })
            const squaresRemoved = field.splice(i, displayWidth)
            field = squaresRemoved.concat(field)
            field.forEach(cell => grid.appendChild(cell))
        }
    }
}

//Game Over Bildschirm
function gameOver(){
    if (tetromino.some(square => field[currentPosition+square].classList.contains('taken'))){
    scoreDisplay.innerHTML = 'end'
    clearInterval(timerId)
    }
}

})