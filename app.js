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
    displayWidth = 4
    displayHight = 4

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
    let currentHold
    let temp
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
            setTimeout(() => {
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
        if (currentHold == null){
            undraw()
            currentHold = upNextTetrominoes[random]
            temp = theTetrominoes[random][0]
            currentPosition = 4
            currentSpin = 0
            showNextPiece()
            current = theTetrominoes[random][currentSpin]
            draw()
            drawShadow()

        } else{
            undraw()
            currentHold.forEach(index => holdSquares[index+displayWidth].classList.remove("tetromino"))
            currentHold = upNextTetrominoes[random]
            current = temp
            temp = theTetrominoes[random][0]
            currentPosition = 4
            currentSpin = 0
            draw()
            drawShadow()
        }

        currentHold.forEach(index => holdSquares[index+displayWidth].classList.add("tetromino"))
    }


})