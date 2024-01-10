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
})