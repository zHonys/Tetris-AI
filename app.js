/** to do: 
 * hold()
 * fix bugs
*/

document.addEventListener("DOMContentLoaded", () =>{


    const holdGrid = document.querySelector(".hold")
    const grid = document.querySelector(".grid");
    const miniGrid = document.querySelector(".miniGrid")
    const scoreDisplay = document.querySelector("#score")
    const width = 10
    const hight = 20
    let displayWidth = 4
    let displayHight = 4
    let score = 0

    for (i=0; i<16;i++){  // create all the hold area divs
        var div = document.createElement('div');
        holdGrid.appendChild(div);
    }

    for (i=0; i<width*hight+(width*hight)/10;i++){   // create all the grid area divs
        var div = document.createElement('div');
        grid.appendChild(div);
        if (i > width*hight-1){
            div.className = "taken"
        }
    }

    for (i=0; i<16;i++){   // create all the miniGrid area divs
        var div = document.createElement('div');
        miniGrid.appendChild(div);
    }

    let holdSquares = Array.from(document.querySelectorAll(".hold div"));
    let squares = Array.from(document.querySelectorAll(".grid div"));
    let miniSquares = Array.from(document.querySelectorAll(".miniGrid div"));


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

    
    const upNextTetrominoes = [
        [displayWidth, displayWidth+1, displayWidth+2, displayWidth+3], // iTetromino
        [0, displayWidth, displayWidth+1, displayWidth+2],              // lTetromino
        [displayWidth, displayWidth+1, displayWidth+2, 2],              // jTetromino
        [0, 1, displayWidth, displayWidth+1],                           // oTetromino
        [1, 2, displayWidth, displayWidth+1],                           // zTetromino
        [1, displayWidth, displayWidth+1, displayWidth+2],              // tTetromino
        [0, 1, displayWidth+1, displayWidth+2]                          // sTetromino
    ]

    
    const theTetrominoes = [iTetromino, lTetromino, jTetromino, oTetromino, zTetromino, tTetromino, sTetromino]


    // Define some variables


    let currentPosition = 4
    let shadowPosition = currentPosition
    let currentSpin = 0
    let nextRandom = Math.floor(Math.random()*theTetrominoes.length)
    showNextPiece()
    let current = theTetrominoes[random][currentSpin]
    let currentShadow = current
    let currentHold = null
    let temp
    let frozeId = null
    drawShadow()
    draw()
    

    // draw and undraw functions


    function draw(){
        current.forEach(index => squares[currentPosition + index].classList.add("tetromino"))
    }

    function undraw(){
        current.forEach(index => squares[currentPosition + index].classList.remove("tetromino"))
    }


    // movement functions


    timerId = setInterval(moveDown, 1000)

    function moveDown(t){
        if (!current.some(index => squares[currentPosition + index + width].classList.contains("taken"))){
            undraw()
            currentPosition += width
            draw()
        }
        frozen(t)
    }

    function moveLeft(){
        undraw()
        if (!current.some(index => (currentPosition + index) % 10 === 0 )){
            currentPosition --
        }

        if (current.some(index => squares[currentPosition + index].classList.contains("taken"))){
            currentPosition ++
        }
        draw()
        drawShadow()

    }

    function moveRight(){
        undraw()
        if (!current.some(index => (currentPosition + index) % 10 === 9 )){
            currentPosition ++
        }

        if (current.some(index => squares[currentPosition + index].classList.contains("taken"))){
            currentPosition --
        }
        draw()
        drawShadow()
    }

    function spin(){
        undraw()
        currentSpin ++
        if (currentSpin === current.length){
            currentSpin = 0
        }
        current = theTetrominoes[random][currentSpin]
        draw()
        drawShadow()
    }

    function frozen(t=1000){
        if (current.some(index => squares[currentPosition + index + width].classList.contains("taken"))){
            frozeId = setTimeout(() => {
                if (current.every(index => !squares[currentPosition + index + width].classList.contains("taken"))){
                    //moveDown()
                }
                
                else{
                    current.forEach(index => squares[currentPosition + index].classList.add("taken"))
                    current.forEach(index => squares[currentPosition + index].classList.add("tetromino"))
                    showNextPiece()
                    currentPosition = 4
                    currentSpin = 0
                    current = theTetrominoes[random][currentSpin]
                    draw()
                    drawShadow()
                    addScore()
                }
            },t)
        }
    }


    // keyBindings


    function control(e){
        if(e.keyCode === 37 || e.keyCode == 65) {
            moveLeft()
        }

        else if(e.keyCode === 39 || e.keyCode == 68) {
            moveRight()
        }

        else if(e.keyCode === 38 || e.keyCode == 87) {
            spin()
        }

        else if((e.keyCode === 40 || e.keyCode == 83)){
            moveDown()
        }

        else if (e.keyCode === 32){
            while (!current.some(index => squares[currentPosition + index + width].classList.contains("taken"))){
                if (!frozeId === null){
                    clearTimeout(frozeId)
                }
                moveDown(0)
            }
        }

        else if (e.keyCode === 67){
            hold()
        }
    }
    document.addEventListener("keydown", control)


    // show next piece


    function showNextPiece(){
        upNextTetrominoes[nextRandom].forEach(index => miniSquares[index + displayWidth].classList.remove("tetromino")) // remove old piece
        random = nextRandom  // pass the nextTetromino to the current tetromino
        nextRandom = Math.floor(Math.random()*theTetrominoes.length) // create a new nextTetromino
        upNextTetrominoes[nextRandom].forEach(index => miniSquares[index + displayWidth].classList.add("tetromino"))  // add new piece
    }


    // shadowTetromino


    function drawShadow(){
        currentShadow.forEach(index => squares[shadowPosition + index].classList.remove("shadow"))
        shadowPosition = currentPosition
        currentShadow = current
        while (!currentShadow.some(index => squares[shadowPosition + index + width].classList.contains("taken"))){
            shadowPosition += width
        }
        currentShadow.forEach(index => squares[shadowPosition + index].classList.add("shadow"))
    }


    // hold


    function hold(){
        holdSquares.forEach(index => index.classList.remove("tetromino"))
        if (currentHold === null){
            undraw()
            currentHold = random
            showNextPiece()
            currentPosition = 4
            currentSpin = 0
            current = theTetrominoes[random][currentSpin]
            draw()
            drawShadow()
        }
        else{
            undraw()
            temp = random
            current = theTetrominoes[currentHold][currentSpin]
            random = currentHold
            currentHold = temp
            currentPosition = 4
            currentSpin = 0
            console.log(random)
            draw()
            drawShadow()
        }
        upNextTetrominoes[currentHold].forEach(index => holdSquares[index+displayWidth].classList.add("tetromino"))
    }


    // cleaning lines and adding score


    function addScore(){
        for(i=0;i<width*hight-1;i+=10){
            let row = []
            for(i2=0;i2< width;i2++){
                row.push(i+i2)
            }
            if(row.every(index => squares[index].classList.contains("taken"))){
                undraw()
                score ++
                scoreDisplay.innerHTML = score
                row.forEach(index => squares[index].classList.remove("taken"))
                row.forEach(index => squares[index].classList.remove("tetromino"))
                row.forEach(index => squares[index].classList.remove("shadow"))
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
                draw()
                drawShadow()
            }
        }
    }


})