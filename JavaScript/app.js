document.addEventListener("DOMContentLoaded", () =>{
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const ScoreDisplay = document.querySelector("#score");
    const StartBin = document.querySelector("#start-button");
    const width = 10;
    const height = 20;

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
    

    let currentPosition = 4
    let currentSpin = 0;
    let currentTetromino = Math.floor(Math.random() * theTetrominoes.length);
    let current = theTetrominoes[currentTetromino][currentSpin];
    console.log(theTetrominoes)

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

    draw()

    // ket keyboard events

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

        if((e.keyCode === 40 || e.keyCode == 83) && !(current.some(index => squares[currentPosition + index + width].classList.contains("taken"))) ){
            moveDown()
        }
    }
    document.addEventListener("keydown", control)

    // move the tetromino down

    var timerId = setInterval(moveDown, 1000);

    function moveDown(){
        undraw();
        currentPosition += width;
        frozen()
        draw()
        
    }

    // Frozen tetromino current.forEach(index => squares[currentPosition + index].classList.add("taken"))
    
    function frozen(){
        if (current.some(index => squares[currentPosition + index + width].classList.contains("taken"))){
            clearInterval(timerId);
            frozenId = setTimeout(() => {current.forEach(index => squares[currentPosition + index].classList.add("taken"))
            
            if (current.some(index => !squares[currentPosition + index + width].classList.contains("taken"))){
                moveDown()
                timerId = setInterval(moveDown, 1000);
                clearTimeout(frozenId)
            }else{
            currentTetromino = Math.floor(Math.random() * theTetrominoes.length)
            current = theTetrominoes[currentTetromino][currentSpin]
            currentPosition = 4
            draw()
            timerId = setInterval(moveDown, 1000);}
            }, 1000)
            
        
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
    }

    // Spin Tetromino

    //spinId = setInterval(spin, 500);

    function spin(){
        undraw()
        currentSpin += 1
        if (currentSpin == 4){
            currentSpin = 0;
        }
        console.log(currentSpin)
        current = theTetrominoes[currentTetromino][currentSpin];
        console.log(current)
        draw()
    }

})