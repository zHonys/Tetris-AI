document.addEventListener("DOMContentLoaded", () =>{
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const scoreDisplay = document.querySelector("#score");
    const startBin = document.querySelector("#start-button");
    const width = 10;
    const height = 20;
    let timerId = null
    let state = true
    score = 0

    // Tetrominoes
    const iTetromino = [
        [width, width+1, width+2, width+3],
        [2, width+2, width*2+2, width*3+2],
        [width, width+1, width+2, width+3],
        [2, width+2, width*2+2, width*3+2]];
    
    const lTetromino = [
        [0, width, width+1, width+2],
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2]];
    
    const jTetromino = [
        [width, width+1, width+2, 2],
        [1, width+1, width*2+1, width*2+2],
        [width, width+1, width+2, width*2],
        [0, 1, width+1, width*2+1]];
    
    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]];
    
    const zTetromino = [
        [1, 2, width, width+1],
        [1, width+1, width+2, width*2+2],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1]];

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]];

    const sTetromino = [
        [0, 1, width+1, width+2],
        [2, width+1, width+2, width*2+1],
        [width, width+1, width*2+1, width*2+2],
        [1, width, width+1, width*2]];

    
    const theTetrominoes = [iTetromino, lTetromino, jTetromino, oTetromino, zTetromino, tTetromino, sTetromino];
    
    let nextRandom = []
    let currentPosition = 4
    let currentSpin = 0;
    let currentTetromino = Math.floor(Math.random() * theTetrominoes.length);
    var currentSpectre = []
    let current = theTetrominoes[currentTetromino][currentSpin];

    draw()
    drawSpectre()
    timerId = setInterval(moveDown, 500)

    // draw function

    function draw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.add('tetromino');
        })
    }

    function undraw(){
        current.forEach(index => {
            squares[currentPosition + index].classList.remove("tetromino");
        })
    }

    // ket keyboard events

    function control(e){
        if (!state){}
        else if(e.keyCode === 37 || e.keyCode == 65) {
            moveLeft()
        }

        else if(e.keyCode === 39 || e.keyCode == 68) {
            moveRight()
        }

        else if(e.keyCode === 38 || e.keyCode == 87) {
            spin()
        }

        else if((e.keyCode === 40 || e.keyCode == 83) && !(current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) ){
            moveDown()
        }

        else if (e.keyCode === 32){
            undrawSpectre(currentSpectre)
            while (true){
                if (current.some(index => squares[currentPosition + index + width].classList.contains("taken"))){
                    break
                }
                moveDown(0)
            }
        }
    }
    document.addEventListener("keydown", control)

    // move the tetromino down

    function moveDown(t){
        undraw();
        currentPosition += width;
        frozen(t)
        draw()
        
    }

    // Frozen tetromino current.forEach(index => squares[currentPosition + index].classList.add("taken"))
    
    function frozen(t=1000){
        if (current.some(index => squares[currentPosition + index + width].classList.contains("taken"))){
            clearInterval(timerId)
            frozenId = setTimeout(() => {
                if (current.every(index => !squares[currentPosition + index + width].classList.contains("taken"))){
                    moveDown()
                    timerId = setInterval(moveDown, 1000);
                }
                
                else{
                    current.forEach(index => squares[currentPosition + index].classList.add("taken"))
                    currentTetromino = nextRandom[0]
                    nextRandom.shift()
                    nextTetrominoShape()
                    currentSpin = 0
                    current = theTetrominoes[currentTetromino][currentSpin]
                    currentPosition = 4
                    addScore()
                    draw()
                    drawSpectre()
                    timerId = setInterval(moveDown, 1000)
                    displayShape()
                    gameOver()
                }

            }, t);
        }
        
    }

    //move to the left and right

    function moveLeft(){
        undraw()
        const isLeftEdge = current.some(index => (currentPosition + index) % width === 0)
        if (!isLeftEdge){
            currentPosition -= 1
        }

        if (current.some(index => squares[currentPosition + index].classList.contains("taken"))){
            currentPosition+=1
        }
        draw()
        drawSpectre()
    }

    function moveRight(){
        undraw()
        const isLeftEdge = current.some(index => (currentPosition + index) % width === 9)
        if (!isLeftEdge){
            currentPosition += 1
        }

        if (current.some(index => squares[currentPosition + index].classList.contains("taken"))){
            currentPosition -= 1
        }
        draw()
        drawSpectre()
    }

    // Spin Tetromino

    function spin(){
        undraw()
        currentSpin ++
        if (currentSpin == current.length){
            currentSpin = 0;
        }
        current = theTetrominoes[currentTetromino][currentSpin];
        draw()
        drawSpectre()
    }

    // Tetromino Spectre

    function drawSpectre(){
        undrawSpectre()
        currentSpectre = []
        current.forEach(index => currentSpectre.push(currentPosition + index + width))
        //console.log(currentSpectre)
        while (true){
            currentSpectre.forEach(index => {
                if (!squares[index].classList.contains("taken")){
                    squares[index].classList.add("spectre")
            }
            })

            if (currentSpectre.some(index => squares[index+width].classList.contains("taken"))){
                break
            }
            undrawSpectre()
            for (i = 0; i < currentSpectre.length; i++){
                currentSpectre[i] += 10
            }
        }
    }

    function undrawSpectre(){
        currentSpectre.forEach(index => squares[index].classList.remove("spectre"))
    }

    // show the next tetrominoes

    const displaySquares = document.querySelectorAll(".miniGrid div")
    const displayWidth = 4
    let displayIndex = 0

    const upNextTetrominoes = [
        [displayWidth, displayWidth+1, displayWidth+2, displayWidth+3], // iTetromino
        [0, displayWidth, displayWidth+1, displayWidth+2],              // lTetromino
        [displayWidth, displayWidth+1, displayWidth+2, 2],              // jTetromino
        [0, 1, displayWidth, displayWidth+1],                           // oTetromino
        [1, 2, displayWidth, displayWidth+1],                           // zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2],              // tTetromino
        [0, 1, displayWidth+1, displayWidth+2]                          // sTetromino
    ]

    nextTetrominoShape()
    displayShape()

    function nextTetrominoShape(){
        while (nextRandom.length != 5){
            nextRandom.push(Math.floor(Math.random()*upNextTetrominoes.length)) 
        }
    }

    function displayShape(){
        displaySquares.forEach(index => index.classList.remove("tetromino"))
        upNextTetrominoes[nextRandom[1]].forEach(index => displaySquares[index+displayWidth].classList.add("tetromino"))
        upNextTetrominoes[nextRandom[2]].forEach(index => displaySquares[index+displayWidth**2].classList.add("tetromino"))
        nextRandom.shift()
        nextTetrominoShape()
    }

    // add score to the game

    function addScore(){
        for (let i=0; i < 200; i+=width){
            let row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]

            if (row.every(index => squares[index].classList.contains("taken"))){
                score += 10
                scoreDisplay.innerHTML = score
                row.forEach(index => squares[index].classList.remove("taken"))
                row.forEach(index => squares[index].classList.remove("tetromino"))
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }


    // game over

    function gameOver(){
        if (current.some(index => squares[currentPosition + index].classList.contains("taken"))){
            scoreDisplay.innerHTML = score + " - end"
            clearInterval(timerId)
            state = false
            undrawSpectre()
        }
    }


})  