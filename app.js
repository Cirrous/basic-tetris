document.addEventListener('DOMContentLoaded' , () =>{
const grid = document.querySelector('.grid')
let field = Array.from(document.querySelectorAll('.grid div'))
const scoreDisplay =document.querySelector('#score')
const startButton =document.querySelector('#start-button')
const gridSpacing = 10

//Tetrominos
const lTetromino = [
    [1, gridSpacing + 1, gridSpacing * 2 + 1, 2],
    [gridSpacing, gridSpacing + 1, gridSpacing + 2, gridSpacing * 2 + 2],
    [1, gridSpacing + 1, gridSpacing * 2 + 1, gridSpacing * 2],
    [gridSpacing, gridSpacing * 2, gridSpacing * 2 + 1, gridSpacing * 2 + 2]
  ]

const zTetromino = [
    [0,gridSpacing,gridSpacing+1,gridSpacing*2+1],
    [gridSpacing+1, gridSpacing+2,gridSpacing*2,gridSpacing*2+1],
    [0,gridSpacing,gridSpacing+1,gridSpacing*2+1],
    [gridSpacing+1, gridSpacing+2,gridSpacing*2,gridSpacing*2+1]
]

  const tTetromino = [
    [1,gridSpacing,gridSpacing+1,gridSpacing+2],
    [1,gridSpacing+1,gridSpacing+2,gridSpacing*2+1],
    [gridSpacing,gridSpacing+1,gridSpacing+2,gridSpacing*2+1],
    [1,gridSpacing,gridSpacing+1,gridSpacing*2+1]
  ]

  const oTetromino = [
    [0,1,gridSpacing,gridSpacing+1],
    [0,1,gridSpacing,gridSpacing+1],
    [0,1,gridSpacing,gridSpacing+1],
    [0,1,gridSpacing,gridSpacing+1]
  ]

  const iTetromino = [
    [1,gridSpacing+1,gridSpacing*2+1,gridSpacing*3+1],
    [gridSpacing,gridSpacing+1,gridSpacing+2,gridSpacing+3],
    [1,gridSpacing+1,gridSpacing*2+1,gridSpacing*3+1],
    [gridSpacing,gridSpacing+1,gridSpacing+2,gridSpacing+3]
  ]

  const tetrominos = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

  let currentPosition = 4
  let currentRotation = 0

//Wählt einen zufälligen Tetromino unrotiert aus
let random = Math.floor(Math.random()*tetrominos.length)
  let tetromino = tetrominos[random][currentRotation]

  //Zieht ein Tetromino
  function draw(){
    tetromino.forEach(square => {
        field[currentPosition + square].classList.add('tetromino')
    })
  }

  //Löscht ein Tetromino
  function undraw(){
    tetromino.forEach(square =>{
        field[currentPosition + square].classList.remove('tetromino')
    })
  }

  //Läst das Tetromino jede Sekunde ein Block runterfallen
  timerId = setInterval(moveDown ,  1000)


  //Deklariert die Steuerung
  function control(e){
    if (e.keyCode === 65 || e.keyCode === 37) {moveLeft()}
    else if (e.keyCode === 68 || e.keyCode === 39) {moveRight()}
    else if (e.keyCode === 83 || e.keyCode === 40) {moveDown()}
    else if (e.keyCode === 87 || e.keyCode === 38) {rotate()}
}
document.addEventListener('keydown', control)

  //Logik für das runterfallen des Tetrominos
  function moveDown(){
    undraw()
    currentPosition += gridSpacing 
    draw()
    freeze()
  }

//Lässt das Tetromino einfrieren wenn es den Boden oder ein anderes Tetromino trifft
function freeze(){
    if(tetromino.some(square => field[currentPosition + square + gridSpacing].classList.contains('taken'))){
        tetromino.forEach(square =>field[currentPosition + square].classList.add('taken'))
        //Lässt das nächste Tetromino fallen
        random = Math.floor(Math.random()*tetrominos.length)
        tetromino = tetrominos[random][currentRotation]
        currentPosition = 4
        draw()
    }
}

//Lässt das Tetromino nach links bewägen, es sei den ein Block oder das Ende des Spielfeldes ist im Weg
function moveLeft(){
    undraw()
    const isAtLeftEdge = tetromino.some(square => (currentPosition + square) % gridSpacing === 0)

    if (!isAtLeftEdge) currentPosition -=1

    if(tetromino.some(square => field[currentPosition + square].classList.contains('taken'))){
currentPosition +=1
}
draw()
}

//Lässt das Tetromino nach rechts bewägen, es sei den ein Block oder das Ende des Spielfeldes ist im Weg
function moveRight(){
    undraw()
    const isAtRightEdge = tetromino.some(square => (currentPosition + square) % gridSpacing === gridSpacing-1)

    if (!isAtRightEdge) currentPosition +=1

    if(tetromino.some(square => field[currentPosition + square].classList.contains('taken'))){
currentPosition -=1
}
draw()
}

//Lässt das Tetromino rotieren
function rotate(){
undraw()
currentRotation ++
if(currentRotation === tetromino.length){ //Lässt den Wert bei 4 zurück auf 0 springen
    currentRotation = 0
}
tetromino = tetrominos[random][currentRotation]
draw()
}
})