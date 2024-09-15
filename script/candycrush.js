let candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
let board = [];
let rows = 10;
let cols = 10;
let curScore = 0;
const gameBoard = document.querySelector(".board");
let turns = 50;
let score = document.getElementById('score');

let currTile, otherTile, currImg = '', otherImg ='';
let currTileId, otherTileId;

window.onload = function(){
    startGame();

    //1/10th of a second
    setInterval(function(){
        crushCandy();
        slideCandy();
        generateCandy();
        checkScore();
    }, 100);
}

function randomCandy(){
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame(){
    for(let r = 0; r < rows; r++){
        let row = [];
        for(let c = 0; c < cols; c++){
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString(); //Danh dau thu tu bang id
            tile.src = "../Images/CandyCrush/" + randomCandy() + ".png";  //Gan link hinh anh

            //Drag functionality
            tile.addEventListener("dragstart", dragStart);  //Click on a candy, initialize drag process
            tile.addEventListener("dragover", dragOver);  //click on a candy, moving mouse to drag the candy
            tile.addEventListener("dragenter", dragEnter);  //dragging candy onto another candy
            tile.addEventListener("dragleave", dragLeave); //leave candy over another candy
            tile.addEventListener("drop", dragDrop); //dropping a candy over another candy
            tile.addEventListener("dragend", dragEnd); //after drag process completed, we swap candies
            

            gameBoard.append(tile);  //Chen vao gameBoard
            row.push(tile);  //Chen vao mang 1 chieu 
        }
        board.push(row); //Chen thanh mang 2 chieu (luu vi tri cua keo)
    }
}

function dragStart(){
    //this refers to tile that was clicked on for dragging
    currTile = this;
    currTileId = this.id;
}

function dragOver(e){
    e.preventDefault();
}

function dragEnter(e){
    e.preventDefault();
}

function dragLeave(){
}


function dragDrop(){
    //this refers to the target tile that was dropped on
    otherTile = this;
    otherTileId = this.id;
}

function dragEnd(){
    //Ngan di chuyen o bi trong
    if(currTile.src.includes("blank") || otherTile.src.includes("blank")){
        return;
    }

    let currCoords = currTile.id.split("-");  //id = "0-0" -> ["0", "0"];
    let r1 = parseInt(currCoords[0]);
    let c1 = parseInt(currCoords[1]);
    
    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let moveLeft = c2 == c1 - 1 && r1 == r2;
    let moveRight = c2 == c1 + 1 && r1 == r2;

    let moveUp = r2 == r1 - 1 && c1 == c2;
    let moveDown = r2 == r1 + 1 && c1 == c2;

    let isAdjacent = moveLeft || moveRight || moveUp || moveDown; //Kiem tra gan ke

    if(isAdjacent){
        currImg = currTile.src;
        otherImg = otherTile.src;

        currTile.src = otherImg;
        otherTile.src = currImg;


        if(!checkValid4()){    //Ngan di chuyen khong hop le 
            if(!checkValid3()){
                let currImg1 = currTile.src;
                let otherImg1 = otherTile.src;
                currTile.src = otherImg1;
                otherTile.src = currImg1;
                return;
            }
        }
        turns--;
        document.getElementById("turns").textContent = turns;
        console.log(turns);
    }
}

function crushCandy(){
    crushFour();
    crushThree();
}
//Crush four
function crushFour(){
    for(let r = 0; r < rows; r++){
        let checkrow = [];
        for(let c = 0; c < cols-3; c++){
            checkrow[0] = board[r][c];
            checkrow[1] = board[r][c+1];
            checkrow[2] = board[r][c+2];
            checkrow[3] = board[r][c+3];
            let color = checkrow[0].src.substring(0, 42);
            let rc = 0;
            checkrow.forEach(candy =>{
                if(candy.src.includes(color)){
                    rc++;
                }
            });
            if(rc == 4){
                checkrow.forEach(candy =>{
                    if(candy.src.includes("Striped")){
                        curScore+= 500;
                    }
                    else if(candy.src.includes("Wrapped")){
                        curScore+= 700;
                    }
                    else{
                        curScore += 300;
                    }
                    candy.src = "../Images/CandyCrush/blank.png";
                })
            }
        }
    }

    //check columns
    for(let c = 0; c < cols; c++){
        let checkcol = [];
        for(let r = 0; r < rows-3; r++){
            checkcol[0] = board[r][c];
            checkcol[1] = board[r+1][c];
            checkcol[2] = board[r+2][c];
            checkcol[3] = board[r+3][c];
            let color = checkcol[0].src.substring(0, 42);
            let cc = 0;
            checkcol.forEach(candy =>{
                if(candy.src.includes(color)){
                    cc++;
                }
            });
            if(cc == 4){
                checkcol.forEach(candy =>{
                    if(candy.src.includes("Striped")){
                        curScore+= 500;
                    }
                    else if(candy.src.includes("Wrapped")){
                        curScore+= 700;
                    }
                    else{
                        curScore += 300;
                    }
                    candy.src = "../Images/CandyCrush/blank.png";
                })
            }
            
        }
    }
}

function checkValid4(){
    for(let r = 0; r < rows; r++){
        let checkrow = [];
        for(let c = 0; c < cols-3; c++){
            checkrow[0] = board[r][c];
            checkrow[1] = board[r][c+1];
            checkrow[2] = board[r][c+2];
            checkrow[3] = board[r][c+3];
            let color = checkrow[0].src.substring(0, 42);
            let rc = 0;
            checkrow.forEach(candy =>{
                if(candy.src.includes(color)){
                    rc++;
                }
            });
            if(rc == 4){
                return true;
            }
        
        }
    }

    //check columns
    for(let c = 0; c < cols; c++){
        let checkcol = [];
        for(let r = 0; r < rows-3; r++){
            checkcol[0] = board[r][c];
            checkcol[1] = board[r+1][c];
            checkcol[2] = board[r+2][c];
            checkcol[3] = board[r+3][c];

            let color = checkcol[0].src.substring(0, 42);
            let cc = 0;
            checkcol.forEach(candy =>{
                if(candy.src.includes(color)){
                    cc++;
                }
            });
            if(cc == 4){
                return true;
            }
            
        }
    }

    return false;
}




//Crush three
function crushThree(){
//check rows
    for(let r = 0; r < rows; r++){
        let checkrow = [];
        for(let c = 0; c < cols-2; c++){
            checkrow[0] = board[r][c];
            checkrow[1] = board[r][c+1];
            checkrow[2] = board[r][c+2];

                let color = checkrow[0].src.substring(0, 42);
                console.log(color);
                let rc = 0;
                checkrow.forEach(candy =>{
                    if(candy.src.includes(color)){
                        rc++;
                    }
                });
                if(rc == 3){
                    checkrow.forEach(candy =>{
                        if(candy.src.includes("Striped")){
                            curScore+= 500;
                        }
                        else if(candy.src.includes("Wrapped")){
                            curScore+= 700;
                        }
                        else{
                            curScore += 300;
                        }
                        candy.src = "../Images/CandyCrush/blank.png";
                    })
                }
            
        }
    }

    //check columns
    for(let c = 0; c < cols; c++){
        let checkcol = [];
        for(let r = 0; r < rows-2; r++){
            checkcol[0] = board[r][c];
            checkcol[1] = board[r+1][c];
            checkcol[2] = board[r+2][c];

            let color = checkcol[0].src.substring(0, 42);
            let cc = 0;
            checkcol.forEach(candy =>{
                if(candy.src.includes(color)){
                    cc++;
                }
            });
            if(cc == 3){
                checkcol.forEach(candy =>{
                    if(candy.src.includes("Striped")){
                        curScore+= 500;
                    }
                    else if(candy.src.includes("Wrapped")){
                        curScore+= 700;
                    }
                    else{
                        curScore += 300;
                    }
                    candy.src = "../Images/CandyCrush/blank.png";
                })
            }
        }
    }
}



function checkValid3(){
//check rows
    for(let r = 0; r < rows; r++){
        let checkrow = [];
        for(let c = 0; c < cols-2; c++){
            checkrow[0] = board[r][c];
            checkrow[1] = board[r][c+1];
            checkrow[2] = board[r][c+2];
            let color = checkrow[0].src.substring(0, 42);
            let rc = 0;
            checkrow.forEach(candy =>{
                if(candy.src.includes(color)){
                    rc++;
                }
            });
            if(rc == 3){
                return true;
            }
        }
    }

    //check columns
    for(let c = 0; c < cols; c++){
        let checkcol = [];
        for(let r = 0; r < rows-2; r++){
            checkcol[0] = board[r][c];
            checkcol[1] = board[r+1][c];
            checkcol[2] = board[r+2][c];
            let color = checkcol[0].src.substring(0, 42);
            let cc = 0;
            checkcol.forEach(candy =>{
                if(candy.src.includes(color)){
                    cc++;
                }
            });
            if(cc == 3){
                return true;
            }
            
        }
    }
    return false;
}

function slideCandy(){
    for(let c = 0; c < cols; c++){
        let index = rows -1;
        for(let r = cols -1; r >= 0; r--){
            if(!board[r][c].src.includes("blank")){
                board[index][c].src = board[r][c].src;
                index -=1;
            }
        }

        for(let r = index; r >= 0; r--){
            board[r][c].src = "../Images/CandyCrush/blank.png";
        }
    }
}

function generateCandy(){
    for(let c = 0; c < cols; c++){
        if(board[0][c].src.includes("blank")){
            let rand = Math.random();
            let randColor = candies[Math.floor(Math.random()* candies.length)]; 
            if(rand > 0.5){
                board[0][c].src = "../Images/CandyCrush/" + randomCandy() + ".png";
            }
            else if(rand <= 0.5 && rand > 0.3){  
                board[0][c].src = `../Images/CandyCrush/${randColor}-Striped-Vertical.png`; 
            }
            else if(rand <= 0.3 && rand > 0.1){
                board[0][c].src = `../Images/CandyCrush/${randColor}-Striped-Horizontal.png`; 
            }
            else if(rand <= 0.1 && rand >= 0){
                board[0][c].src = `../Images/CandyCrush/${randColor}-Wrapped.png`;
            }
            
        }
    }
}


function checkScore(){
    if(turns == 50){
        curScore = 0;
    }
    score.innerHTML = `${curScore}/100000`;
    if(curScore >= 100000){
        setTimeout(()=>{
            document.querySelector(".continue-container").style.display = "block";
        }, 500);
        return;
    }
    if(turns <= 0 && curScore < 100000){
        document.querySelector(".failed-container").style.display = "block";
        return;
    }
}


//Buttons
const exchange = document.querySelector('.exchange');
exchange.addEventListener("click", ()=>{
    if(turns >= 5){
        turns -= 5;
        document.getElementById("turns").textContent = turns;
        curScore += 5000;
        checkScore();
    }
    else{
        alert("Không đủ lượt để trao đổi!");
    }
})

const shuffle = document.querySelector(".shuffle");
shuffle.addEventListener("click", ()=>{
    if(curScore >= 10000){
        curScore -= 10000;
        reset();
    }
    else{
        alert("Không đủ điểm để làm mới!");
    }
})

function reset(){
    for(let i = 0; i < rows; i++){
        for(let j =0; j <cols; j++){
            board[i][j].src = '../Images/CandyCrush/blank.png';
        }
    }
}

const restarts = document.querySelectorAll(".restart");
restarts.forEach(restart =>{
    restart.addEventListener("click", ()=>{
        turns = 50;
        document.querySelector(".failed-container").style.display = "none";
        document.getElementById("turns").textContent = turns;
        curScore = 0;
        checkScore();
        reset();
    })
})


