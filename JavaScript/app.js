document.addEventListener("DOMContentLoader", () =>{
    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const width = 10;
    const ScoreDisplay = document.querySelector("#score");
    const StartBin = docuemnt.querySelector("#start-button");

    // Tetrominoes

    /*
    [
        [],
        [],
        [],
        []]
    */ 
    const iTetromino = [
        [width, width+1, width+2, width+3],
        [2, width+2, width*2+2, width*3+2],
        [width, width+1, width+2, width+3],
        [2, width+2, width*2+2, width*3+2]]
    
    const lTetromino = [
        [0, width, width+1, width+2],
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2]]
    
    const jTetromino = [
        [width, width+1, width+2, 2],
        [1, width+1, width*2+1, width*2+2],
        [width, width+1, width+2, width*2],
        [0, 1, width+1, width*2+1]]
    
    const oTetromino = [
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1],
        [0, 1, width, width+1]]
    
    const zTetromino = [
        [1, 2, width, width+1],
        [1, width+1, width+2, width*2+2],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width+2, width*2+1]]

    const tTetromino = [
        [1, width, width+1, width+2],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]]

    const sTetromino = [
        [0, 1, width+1, width+2],
        [2, width+1, width+2, width*2+1],
        [width, width+1, width*2+1, width*2+2],
        [1, width, width+1, width*2]]
    
})