let optionsnake = document.getElementById("option-snake");
let optiontron = document.getElementById("option-tron");
let optiondino = document.getElementById("option-dino");
let options = document.getElementById("options");
let gameover = document.getElementById("gameover");
let pause = document.getElementById("pause");
let dup = document.getElementById("d-up");
let ddown = document.getElementById("d-down");
let dright = document.getElementById("d-right");
let dleft = document.getElementById("d-left");
let win = document.getElementById("win");
let lose = document.getElementById("lose");

//Do not display gameover or pause title
gameover.style.display = "none";
pause.style.display = "none";
win.style.display = "none";
lose.style.display = "none";



//If SNAKE was picked as the option COMPLETED
optionsnake.onclick = (function () {
    optionsnake.style.display = "none";
    optiontron.style.display = "none";
    optiondino.style.display = "none";
    options.style.display = "none";

//Get all elements from document
    let tiles = document.getElementsByTagName('td'); //Gets all grid spaces in the game
    let score = document.getElementById("score");

//Initiate score as 0
    var scorevalue = 0;


//Initiate Tail of snake as an array
    var tails = [];

//Function to get a random number between the given max and min
    function getRandomBetween(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        //Get random position as long as not part of tail
        var value = Math.floor(Math.random() * (max - min)) + min;
        while (tails.includes(value)) { //Ensures food is not in tail location
            value = Math.floor(Math.random() * (max - min)) + min;
        }
        return value;
    }

//Initiate food and random position for food not on snakes tail
    var foodStartPos = getRandomBetween(0, 2500);
    var food;

//Create random food somewhere in 50x50 grid
    function generateFood() {
        food = tiles.item(foodStartPos);
        food.style.backgroundColor = "darkred";
        food.style.borderRadius = "50%";
    }

//Generate the food at the start
    generateFood();

//Starting position of snake
    tiles.item(1225).style.backgroundColor = "green";

//Get current position of head of snake
    function CurrentPos() {
        for (var i = 0; i < tiles.length; i++) {
            if (tiles.item(i).style.backgroundColor === "green") {
                return i;
            }
        }
    }

//Get current position of head of snake
    function CurrentFoodPos() {
        return foodStartPos;
    }

//Function that displays tail length depending on current scorevalue
    function displayTail() {
        for (var i = 0; i < tails.length; i++) {
            tiles.item(tails[i]).style.backgroundColor = 'rgba(46,73,12,0.38)';//color tail black
        }
    }

//Function that update tails length value
    function updateTail() {
        while (tails.length !== scorevalue) {
            tiles.item(tails[0]).style.backgroundColor = "yellowgreen";//clear tail
            tails.shift();//remove end
        }
    }

//Function that changes position of the snake head
    function ChangePos(value) {
        //Save head position
        var curr = CurrentPos();
        tiles.item(curr).style.backgroundColor = "yellowgreen";
        //Head position
        tiles.item(curr + value).style.backgroundColor = "green";

        //If snake eats food
        if (CurrentPos() === CurrentFoodPos()) {
            //Generate new food
            food.style.borderRadius = "0";
            foodStartPos = getRandomBetween(0, 2500);
            generateFood();
            //Update score
            scorevalue += 1;
            score.innerText = scorevalue;
        }

        //If snake touches tail game is over
        if (tails.includes(CurrentPos())) {
            gameover.style.display = "block";
            var ite = 0;
            var id = setInterval(frame, 1000);

            function frame() {
                if (ite === 0) {
                    gameover.style.display = "block";
                    ite++;
                } else {
                    clearInterval(id);
                    location.reload();//restarts game
                }
            }
        }

        //Save it in tail array
        tails.push(curr);
        updateTail();
        displayTail();
    }


//Controls which direction the snake will be moving
    var upcontrol = false;
    var downcontrol = false;
    var rightcontrol = false;
    var leftcontrol = false;
    var paused = false;
    var savedmove = null;

//Function to check if the snake is currently moving
    function Moving() {
        if (upcontrol === true) {
            return true;
        } else if (rightcontrol === true) {
            return true;
        } else if (leftcontrol === true) {
            return true;
        } else if (downcontrol === true) {
            return true;
        }
        return false;
    }

//Moving the snake
    document.onkeydown = function (event) {
        if (!Moving()) {
            MoveUp();
            MoveDown();
            MoveRight();
            MoveLeft();
        }
        switch (event.keyCode) {
            case 32:
                if (paused === false) {
                    if (upcontrol) {
                        savedmove = "up";
                    } else if (downcontrol) {
                        savedmove = "down";
                    } else if (rightcontrol) {
                        savedmove = "right";
                    } else if (leftcontrol) {
                        savedmove = "left";
                    }
                    upcontrol = false;
                    downcontrol = false;
                    rightcontrol = false;
                    leftcontrol = false;
                    paused = true;
                    pause.style.display = "block";
                    break;
                } else {
                    if (savedmove === "up") {
                        upcontrol = true;
                    } else if (savedmove === "down") {
                        downcontrol = true;
                    } else if (savedmove === "right") {
                        rightcontrol = true;
                    } else if (savedmove === "left") {
                        leftcontrol = true;
                    }
                    paused = false;
                    pause.style.display = "none";
                    break;
                }

            case 37:
                pause.style.display = "none";
                if (leftcontrol === false) {
                    MoveLeft();
                    upcontrol = false;
                    downcontrol = false;
                    leftcontrol = true;
                    rightcontrol = false;
                    break;
                }
                break;
            case 38:
                pause.style.display = "none";
                if (upcontrol === false) {
                    MoveUp();
                    downcontrol = false;
                    upcontrol = true;
                    leftcontrol = false;
                    rightcontrol = false;
                    break;
                }
                break;
            case 39:
                pause.style.display = "none";
                if (rightcontrol === false) {
                    MoveRight();
                    upcontrol = false;
                    downcontrol = false;
                    leftcontrol = false;
                    rightcontrol = true;
                    break;
                }
                break;
            case 40:
                pause.style.display = "none";
                if (downcontrol === false) {
                    MoveDown();
                    upcontrol = false;
                    downcontrol = true;
                    leftcontrol = false;
                    rightcontrol = false;
                    break;
                }
                break;
        }
    };

//Moves Snake using onscreen D-pad
    dup.onclick = (function () {
        if (upcontrol === false) {
            MoveUp();
            downcontrol = false;
            upcontrol = true;
            leftcontrol = false;
            rightcontrol = false;
        }
    })
    ddown.onclick = (function () {
        if (downcontrol === false) {
            MoveDown();
            upcontrol = false;
            downcontrol = true;
            leftcontrol = false;
            rightcontrol = false;
        }
    })
    dright.onclick = (function () {
        if (rightcontrol === false) {
            MoveRight();
            upcontrol = false;
            downcontrol = false;
            leftcontrol = false;
            rightcontrol = true;
        }
    })
    dleft.onclick = (function () {
        if (rightcontrol === false) {
            MoveLeft();
            upcontrol = false;
            downcontrol = false;
            leftcontrol = true;
            rightcontrol = false;
        }
    })

//Function that moves up
    function MoveUp() {
        var id = setInterval(frame, 100);

        function frame() {
            if (!upcontrol) {
                clearInterval(id);
            }
            if ((CurrentPos() - 50) > 0) {
                ChangePos(-50);
            } else {
                ChangePos(2450);
            }
        }
    }

//Function that moves down
    function MoveDown() {
        var id = setInterval(frame, 100);

        function frame() {
            if (!downcontrol) {
                clearInterval(id);
            }
            if ((CurrentPos() + 50) < 2499) {
                ChangePos(50);
            } else {
                ChangePos(-2450);
            }
        }
    }

//Function that moves right
    function MoveRight() {
        var id = setInterval(frame, 100);

        function frame() {
            if (!rightcontrol) {
                clearInterval(id);
            }
            if (CurrentPos() % 50 === 49) {
                ChangePos(-49);
            } else {
                ChangePos(1);
            }
        }
    }

//Function that moves left
    function MoveLeft() {
        var id = setInterval(frame, 100);

        function frame() {
            if (!leftcontrol) {
                clearInterval(id);
            }
            if (CurrentPos() % 50 === 0) {
                ChangePos(49);
            } else {
                ChangePos(-1);
            }
        }
    }
})

//If BM-Tron was picked as the option
optiontron.onclick = (function () {
    document.getElementById("score").innerText= "Survive the Longest";
    optionsnake.style.display = "none";
    optiontron.style.display = "none";
    optiondino.style.display = "none";
    options.style.display = "none";


    play1 = document.getElementById("player1");
    play2 = document.getElementById("player2");
    play1.style.display = "block";
    play2.style.display = "block";


    play1.onclick = (function () {
    play1.style.display = "none";
    play2.style.display = "none";

        //Get all elements from document
    let tiles = document.getElementsByTagName('td'); //Gets all grid spaces in the game
    //Initiate Tails of snake as an array
    var comptails = [];
    var tails = [];
    var border = [];

    //Create border
    for (var i =0;i<50;i++){
        tiles.item(i).style.backgroundColor= "black";
        border.push(i);
    }
    for (var i =0;i<50;i++){
        tiles.item(2450+i).style.backgroundColor= "black";
        border.push(2450+i);
    }
    for (var i =0;i<50;i++){
        tiles.item(49+(i*50)).style.backgroundColor= "black";
        border.push(49+(i*50));
    }
    for (var i =0;i<50;i++){
        tiles.item(i*50).style.backgroundColor= "black";
        border.push(i*50);
    }

    //Starting position of snake
    tiles.item(1235).style.backgroundColor = "green";
    //Starting position of comp snake
    tiles.item(1215).style.backgroundColor = "darkred";

    //Function to get a random move for computer snake
    function getRandomMove(except,rem) {
        var list = [0,1,2,3];
        if (rem){
            list.splice(except,1);}

        min = Math.ceil(0);
        max = Math.floor(list.length);

        //Get random position as long as not part of tail
        var choice = Math.floor(Math.random() * (max - min)) + min;
        var value = list[choice];
        var result;

        if (value===0){
            result = "up";}
        else if (value===1){
            result ="right";}
        else if (value===2){
            result ="left";}
        else{
            result = "down";}

        if (validmove(result)){
            return result;}
        else{
            getRandomMove(except,rem);
        }
    }
    //URDL
    function getRandomMove2(){
        if (validmove("up")){
            return "up";
        }
        else if (validmove("right")){
            return "right";
        }
        else if (validmove("down")){
            return "down";
        }
        else{
            return "left";
        }
    }
    //DLUR
    function getRandomMove3(){
        if (validmove("down")){
            return "down";
        }
        else if (validmove("left")){
            return "left";
        }
        else if (validmove("up")){
            return "up";
        }
        else{
            return "right";
        }
    }
    //RDLU
    function getRandomMove4(){
        if (validmove("right")){
            return "right";
        }
        else if (validmove("down")){
            return "down";
        }
        else if (validmove("left")){
            return "left";
        }
        else{
            return "up";
        }
    }
    //LURD
    function getRandomMove5(){
        if (validmove("left")){
            return "left";
        }
        else if (validmove("up")){
            return "up";
        }
        else if (validmove("right")){
            return "right";
        }
        else{
            return "down";
        }
    }

    //Controls which direction the snake will be moving
    var cupcontrol = false;
    var cdowncontrol = false;
    var crightcontrol = false;
    var cleftcontrol = false;

    //Function to change the position of comp snake head
    function ChangeCompPos(value) {
        const curr = CurrentCompPos();
        tiles.item(curr).style.backgroundColor = "red";
        comptails.push(curr);

        //If snake touches black border, game over
        if (border.includes(curr+value)){
            //Stops movement
            cupcontrol = false;cdowncontrol = false;crightcontrol = false;cleftcontrol = false;
            upcontrol = false;downcontrol = false;rightcontrol = false;leftcontrol = false;
            win.style.display = "block";

            var ite1 = 0;
            var id1 = setInterval(frame, 500);

            function frame() {
                if (ite1 === 0) {
                    win.style.display = "block";
                    ite1++;
                } else {
                    clearInterval(id1);
                    location.reload();//restarts game
                }
            }
        }
        //If snake touches tail game is over
        if (tails.includes(curr+value)) {
            cupcontrol = false;
            cdowncontrol = false;
            crightcontrol = false;
            cleftcontrol = false;
            upcontrol = false;downcontrol = false;rightcontrol = false;leftcontrol = false;
            win.style.display = "block";
            var ite2 = 0;
            var id2 = setInterval(frame, 500);

            function frame() {
                if (ite2 === 0) {
                    win.style.display = "block";
                    ite2++;
                } else {
                    clearInterval(id2);
                    location.reload();//restarts game
                }
            }
        }
        //If snake touches tail game is over
        if (comptails.includes(curr+value)) {
            cupcontrol = false;
            cdowncontrol = false;
            crightcontrol = false;
            cleftcontrol = false;
            upcontrol = false;downcontrol = false;rightcontrol = false;leftcontrol = false;
            win.style.display = "block";
            var ite3 = 0;
            var id3 = setInterval(frame, 500);

            function frame() {
                if (ite3 === 0) {
                    win.style.display = "block";
                    ite3++;
                } else {
                    clearInterval(id3);
                    location.reload();//restarts game
                }
            }
        }

        //Head position
        tiles.item(curr + value).style.backgroundColor = "darkred";
        }
    //Function that checks if all comp snake movement options are invalid
    function allinvalid() {
        if (border.includes(CurrentCompPos() - 50)){
            if (border.includes(CurrentCompPos() + 50)){
               if (border.includes(CurrentCompPos() + 1)){
                   if (border.includes(CurrentCompPos() -1)){
                       return false;
                   }
                   else if (tails.includes(CurrentCompPos() -1)){
                       return false;
                   }
                   else if(comptails.includes(CurrentCompPos() - 1)){
                       return false;
                   }
                   return true;
                }
                else if (tails.includes(CurrentCompPos() + 1)){
                   if (border.includes(CurrentCompPos() -1)){
                       return false;
                   }
                   else if (tails.includes(CurrentCompPos() -1)){
                       return false;
                   }
                   else if(comptails.includes(CurrentCompPos() - 1)){
                       return false;
                   }
                   return true;
                }
                else if (comptails.includes(CurrentCompPos() + 1)){
                   if (border.includes(CurrentCompPos() -1)){
                       return false;
                   }
                   else if (tails.includes(CurrentCompPos() -1)){
                       return false;
                   }
                   else if(comptails.includes(CurrentCompPos() - 1)){
                       return false;
                   }
                   return true;
                }
                return true;
            }
            else if (tails.includes(CurrentCompPos() + 50)){
                if (border.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (tails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (comptails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                return true;
            }
            else if (comptails.includes(CurrentCompPos() + 50)){
                if (border.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (tails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (comptails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                return true;
            }
            return true;
        }
        else if (tails.includes(CurrentCompPos() - 50)){
            if (border.includes(CurrentCompPos() + 50)){
                if (border.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (tails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (comptails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                return true;
            }
            else if (tails.includes(CurrentCompPos() + 50)){
                if (border.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (tails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (comptails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                return true;
            }
            else if (comptails.includes(CurrentCompPos() + 50)){
                if (border.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (tails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (comptails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                return true;
            }
            return true;
        }
        else if (comptails.includes(CurrentCompPos() - 50)){
            if (border.includes(CurrentCompPos() + 50)){
                if (border.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (tails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (comptails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                return true;
            }
            else if (tails.includes(CurrentCompPos() + 50)){
                if (border.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (tails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (comptails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                return true;
            }
            else if (comptails.includes(CurrentCompPos() + 50)){
                if (border.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (tails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                else if (comptails.includes(CurrentCompPos() + 1)){
                    if (border.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if (tails.includes(CurrentCompPos() -1)){
                        return false;
                    }
                    else if(comptails.includes(CurrentCompPos() - 1)){
                        return false;
                    }
                    return true;
                }
                return true;
            }
            return true;
        }
        return true;
    }
    //Checks if comp snakes next move is valid up to 15 spaces away
    function validmove(value) {
        var curr = CurrentCompPos();
        if (value==="up"){
            if (border.includes(curr - 750)){
                return false;
            }
            else if (tails.includes(curr- 750)){
                return false;
            }
            else if (comptails.includes(curr- 750)){
                return false;
            }
            else if (border.includes(curr - 700)){
                return false;
            }
            else if (tails.includes(curr- 700)){
                return false;
            }
            else if (comptails.includes(curr- 700)){
                return false;
            }
            else if (border.includes(curr - 650)){
                return false;
            }
            else if (tails.includes(curr- 650)){
                return false;
            }
            else if (comptails.includes(curr- 650)){
                return false;
            }
            else if (border.includes(curr - 600)){
                return false;
            }
            else if (tails.includes(curr- 600)){
                return false;
            }
            else if (comptails.includes(curr- 600)){
                return false;
            }
            else if (border.includes(curr - 550)){
                return false;
            }
            else if (tails.includes(curr- 550)){
                return false;
            }
            else if (comptails.includes(curr- 550)){
                return false;
            }

            else if (border.includes(curr - 500)){
                return false;
            }
            else if (tails.includes(curr- 500)){
                return false;
            }
            else if (comptails.includes(curr- 500)){
                return false;
            }
            else if (border.includes(curr - 450)){
                return false;
            }
            else if (tails.includes(curr- 450)){
                return false;
            }
            else if (comptails.includes(curr- 450)){
                return false;
            }
            else if (border.includes(curr - 400)){
                return false;
            }
            else if (tails.includes(curr- 400)){
                return false;
            }
            else if (comptails.includes(curr- 400)){
                return false;
            }
            else if (border.includes(curr - 350)){
                return false;
            }
            else if (tails.includes(curr- 350)){
                return false;
            }
            else if (comptails.includes(curr- 350)){
                return false;
            }
            else if (border.includes(curr - 300)){
                return false;
            }
            else if (tails.includes(curr- 300)){
                return false;
            }
            else if (comptails.includes(curr- 300)){
                return false;
            }

            if (border.includes(curr - 250)){
                return false;
            }
            else if (tails.includes(curr - 250)){
                return false;
            }
            else if (comptails.includes(curr - 250)){
                return false;
            }
            else if (border.includes(curr - 200)){
                return false;
            }
            else if (tails.includes(curr - 200)){
                return false;
            }
            else if (comptails.includes(curr - 200)){
                return false;
            }
            else if (border.includes(curr - 150)){
                return false;
            }
            else if (tails.includes(curr - 150)){
                return false;
            }
            else if (comptails.includes(curr - 150)){
                return false;
            }
            else if (border.includes(curr - 100)){
                return false;
            }
            else if (tails.includes(curr - 100)){
                return false;
            }
            else if (comptails.includes(curr - 100)){
                return false;
            }
            else if (border.includes(curr - 50)){
                return false;
            }
            else if (tails.includes(curr - 50)){
                return false;
            }
            else if (comptails.includes(curr - 50)){
                return false;
            }
            return true;
        }
        else if (value==="down"){
            if (border.includes(curr + 750)){
                return false;
            }
            else if (tails.includes(curr+ 750)){
                return false;
            }
            else if (comptails.includes(curr+ 750)){
                return false;
            }
            else if (border.includes(curr + 700)){
                return false;
            }
            else if (tails.includes(curr+ 700)){
                return false;
            }
            else if (comptails.includes(curr+ 700)){
                return false;
            }
            else if (border.includes(curr + 650)){
                return false;
            }
            else if (tails.includes(curr+ 650)){
                return false;
            }
            else if (comptails.includes(curr+ 650)){
                return false;
            }
            else if (border.includes(curr + 600)){
                return false;
            }
            else if (tails.includes(curr+ 600)){
                return false;
            }
            else if (comptails.includes(curr+ 600)){
                return false;
            }
            else if (border.includes(curr + 550)){
                return false;
            }
            else if (tails.includes(curr+ 550)){
                return false;
            }
            else if (comptails.includes(curr+ 550)){
                return false;
            }

            else if (border.includes(curr + 500)){
                return false;
            }
            else if (tails.includes(curr+ 500)){
                return false;
            }
            else if (comptails.includes(curr+ 500)){
                return false;
            }
            else if (border.includes(curr + 450)){
                return false;
            }
            else if (tails.includes(curr+ 450)){
                return false;
            }
            else if (comptails.includes(curr+ 450)){
                return false;
            }
            else if (border.includes(curr + 400)){
                return false;
            }
            else if (tails.includes(curr+ 400)){
                return false;
            }
            else if (comptails.includes(curr+ 400)){
                return false;
            }
            else if (border.includes(curr + 350)){
                return false;
            }
            else if (tails.includes(curr+ 350)){
                return false;
            }
            else if (comptails.includes(curr+ 350)){
                return false;
            }
            else if (border.includes(curr + 300)){
                return false;
            }
            else if (tails.includes(curr+ 300)){
                return false;
            }
            else if (comptails.includes(curr+ 300)){
                return false;
            }

            else if (border.includes(curr + 250)){
                return false;
            }
            else if (tails.includes(curr+ 250)){
                return false;
            }
            else if (comptails.includes(curr+ 250)){
                return false;
            }
            else if (border.includes(curr + 200)){
                return false;
            }
            else if (tails.includes(curr + 200)){
                return false;
            }
            else if (comptails.includes(curr + 200)){
                return false;
            }
            else if (border.includes(curr + 150)){
                return false;
            }
            else if (tails.includes(curr + 150)){
                return false;
            }
            else if (comptails.includes(curr + 150)){
                return false;
            }
            else if (border.includes(curr + 100)){
                return false;
            }
            else if (tails.includes(curr + 100)){
                return false;
            }
            else if (comptails.includes(curr + 100)){
                return false;
            }
            else if (border.includes(curr + 50)){
                return false;
            }
            else if (tails.includes(curr + 50)){
                return false;
            }
            else if (comptails.includes(curr + 50)){
                return false;
            }
            return true;
        }
        else if (value==="right"){
            if (border.includes(curr+15)){
                return false;
            }
            else if (tails.includes(curr +15)){
                return false;
            }
            else if (comptails.includes(curr +15)){
                return false;
            }
            else if (border.includes(curr+14)){
                return false;
            }
            else if (tails.includes(curr +14)){
                return false;
            }
            else if (comptails.includes(curr +14)){
                return false;
            }
            else if (border.includes(curr+13)){
                return false;
            }
            else if (tails.includes(curr +13)){
                return false;
            }
            else if (comptails.includes(curr +13)){
                return false;
            }
            else if (border.includes(curr+12)){
                return false;
            }
            else if (tails.includes(curr +12)){
                return false;
            }
            else if (comptails.includes(curr +12)){
                return false;
            }
            else if (border.includes(curr+11)){
                return false;
            }
            else if (tails.includes(curr +11)){
                return false;
            }
            else if (comptails.includes(curr +11)){
                return false;
            }
            else if (border.includes(curr+10)){
                return false;
            }
            else if (tails.includes(curr +10)){
                return false;
            }
            else if (comptails.includes(curr +10)){
                return false;
            }
            else if (border.includes(curr+9)){
                return false;
            }
            else if (tails.includes(curr +9)){
                return false;
            }
            else if (comptails.includes(curr +9)){
                return false;
            }
            else if (border.includes(curr+8)){
                return false;
            }
            else if (tails.includes(curr +8)){
                return false;
            }
            else if (comptails.includes(curr +8)){
                return false;
            }
            else if (border.includes(curr+7)){
                return false;
            }
            else if (tails.includes(curr +7)){
                return false;
            }
            else if (comptails.includes(curr +7)){
                return false;
            }
            else if (border.includes(curr+6)){
                return false;
            }
            else if (tails.includes(curr +6)){
                return false;
            }
            else if (comptails.includes(curr +6)){
                return false;
            }
            else if (border.includes(curr + 5)){
                return false;
            }
            else if (tails.includes(curr + 5)){
                return false;
            }
            else if (comptails.includes(curr + 5)){
                return false;
            }
            else if (border.includes(curr + 4)){
                return false;
            }
            else if (tails.includes(curr + 4)){
                return false;
            }
            else if (comptails.includes(curr + 4)){
                return false;
            }
            else if (border.includes(curr + 3)){
                return false;
            }
            else if (tails.includes(curr + 3)){
                return false;
            }
            else if (comptails.includes(curr + 2)){
                return false;
            }
            else if (border.includes(curr + 2)){
                return false;
            }
            else if (tails.includes(curr + 2)){
                return false;
            }
            else if (comptails.includes(curr + 2)){
                return false;
            }
            else if (border.includes(curr + 1)){
                return false;
            }
            else if (tails.includes(curr + 1)){
                return false;
            }
            else if (comptails.includes(curr + 1)){
                return false;
            }
            return true;
        }
        else{
            if (border.includes(curr-15)){
                return false;
            }
            else if (tails.includes(curr -15)){
                return false;
            }
            else if (comptails.includes(curr -15)){
                return false;
            }
            else if (border.includes(curr-14)){
                return false;
            }
            else if (tails.includes(curr -14)){
                return false;
            }
            else if (comptails.includes(curr -14)){
                return false;
            }
            else if (border.includes(curr-13)){
                return false;
            }
            else if (tails.includes(curr -13)){
                return false;
            }
            else if (comptails.includes(curr -13)){
                return false;
            }
            else if (border.includes(curr-12)){
                return false;
            }
            else if (tails.includes(curr -12)){
                return false;
            }
            else if (comptails.includes(curr -12)){
                return false;
            }
            else if (border.includes(curr-11)){
                return false;
            }
            else if (tails.includes(curr -11)){
                return false;
            }
            else if (comptails.includes(curr -11)){
                return false;
            }
            else if (border.includes(curr-10)){
                return false;
            }
            else if (tails.includes(curr -10)){
                return false;
            }
            else if (comptails.includes(curr -10)){
                return false;
            }
            else if (border.includes(curr-9)){
                return false;
            }
            else if (tails.includes(curr -9)){
                return false;
            }
            else if (comptails.includes(curr -9)){
                return false;
            }
            else if (border.includes(curr-8)){
                return false;
            }
            else if (tails.includes(curr -8)){
                return false;
            }
            else if (comptails.includes(curr -8)){
                return false;
            }
            else if (border.includes(curr-7)){
                return false;
            }
            else if (tails.includes(curr -7)){
                return false;
            }
            else if (comptails.includes(curr -7)){
                return false;
            }
            else if (border.includes(curr-6)){
                return false;
            }
            else if (tails.includes(curr -6)){
                return false;
            }
            else if (comptails.includes(curr -6)){
                return false;
            }
            else if (border.includes(curr-5)){
                return false;
            }
            else if (tails.includes(curr -5)){
                return false;
            }
            else if (comptails.includes(curr -5)){
                return false;
            }
            else if (border.includes(curr-4)){
                return false;
            }
            else if (tails.includes(curr -4)){
                return false;
            }
            else if (comptails.includes(curr -4)){
                return false;
            }
            else if (border.includes(curr-3)){
                return false;
            }
            else if (tails.includes(curr -3)){
                return false;
            }
            else if (comptails.includes(curr -3)){
                return false;
            }
            else if (border.includes(curr-2)){
                return false;
            }
            else if (tails.includes(curr -2)){
                return false;
            }
            else if (comptails.includes(curr -2)){
                return false;
            }
            else if (border.includes(curr-1)){
                return false;
            }
            else if (tails.includes(curr -1)){
                return false;
            }
            else if (comptails.includes(curr -1)){
                return false;
            }
            return true;
        }
    }

    //Starts when player starts
    var time = 100;
    //Function that runs computer snake movements
    function RunComp(){
        var id = setInterval(frame,time);
        function frame() {
            min = Math.ceil(0);
            max = Math.floor(1);
            var choice = Math.floor(Math.random() * (max - min)) + min;
            var move;
            if (choice===0){move = getRandomMove5();}
            else if (choice===2){move = getRandomMove3();}
            else if (choice===1){move = getRandomMove4();}
            else{move = getRandomMove2();}

            //Perform actual movement
            if (move === "up") {
                if (cupcontrol === false) {
                    cMoveUp();
                    cdowncontrol = false;
                    cupcontrol = true;
                    cleftcontrol = false;
                    crightcontrol = false;
                }

            } else if (move === "down") {
                if (cdowncontrol === false) {
                    cMoveDown();
                    cdowncontrol = true;
                    cupcontrol = false;
                    cleftcontrol = false;
                    crightcontrol = false;
                }

            } else if (move === "right") {
                if (crightcontrol === false) {
                    cMoveRight();
                    cdowncontrol = false;
                    cupcontrol = false;
                    cleftcontrol = false;
                    crightcontrol = true;
                }

            } else {
                if (cleftcontrol === false) {
                    cMoveLeft();
                    cdowncontrol = false;
                    cupcontrol = false;
                    cleftcontrol = true;
                    crightcontrol = false;
                }
            }
        }
    }


    //Get current position of head of snake
    function CurrentPos() {
        for (var i = 0; i < tiles.length; i++) {
            if (tiles.item(i).style.backgroundColor === "green") {
                return i;
            }
        }
    }
    //Get current position of head of comp snake
    function CurrentCompPos() {
        for (var i = 0; i < tiles.length; i++) {
            if (tiles.item(i).style.backgroundColor === "darkred") {
                return i;
            }
        }
    }
    //Function that changes position of the snake head
    function ChangePos(value) {
        //Save head position
        const curr = CurrentPos();
        tiles.item(curr).style.backgroundColor = "darkgreen";
        if ((curr!==1235)&&(curr!==1236)&&(curr!==1185)){
            tails.push(curr);}

        //If snake touches black border, game over
        if (border.includes(curr+value)){
            //Stops movement
            upcontrol = false;downcontrol = false;rightcontrol = false;leftcontrol = false;
            cupcontrol = false;cdowncontrol = false;crightcontrol = false;cleftcontrol = false;
            lose.style.display = "block";
            var ite = 0;
            var id = setInterval(frame, 1000);

            function frame() {
                if (ite === 0) {
                    lose.style.display = "block";
                    ite++;
                } else {
                    clearInterval(id);
                    location.reload();//restarts game
                }
            }
        }
        //If snake touches tail game is over
        if (tails.includes(curr+value)){
            upcontrol = false;downcontrol = false;rightcontrol = false;leftcontrol = false;
            cupcontrol = false;cdowncontrol = false;crightcontrol = false;cleftcontrol = false;
            lose.style.display = "block";
            var ite = 0;
            var id = setInterval(frame, 1000);
            function frame() {
                if (ite === 0) {
                    lose.style.display = "block";
                    ite++;
                } else {
                    clearInterval(id);
                    location.reload();//restarts game
                }
            }
        }
        //If snake touches comp tail game is over
        if (comptails.includes(curr+value)){
            upcontrol = false;downcontrol = false;rightcontrol = false;leftcontrol = false;
            cupcontrol = false;cdowncontrol = false;crightcontrol = false;cleftcontrol = false;
            lose.style.display = "block";
            var ite = 0;
            var id = setInterval(frame, 1000);
            function frame() {
                if (ite === 0) {
                    lose.style.display = "block";
                    ite++;
                } else {
                    clearInterval(id);
                    location.reload();//restarts game
                }
            }
        }
        //Head position
        tiles.item(curr + value).style.backgroundColor = "green";
    }


    //Controls which direction the snake will be moving
    var upcontrol = false;
    var downcontrol = false;
    var rightcontrol = false;
    var leftcontrol = false;
    var paused = false;

    var savedmove = null;
    var savedmovec = null;

    //Function to check if the snake is currently moving
    function Moving() {
        if (upcontrol === true) {
            return true;
        } else if (rightcontrol === true) {
            return true;
        } else if (leftcontrol === true) {
            return true;
        } else if (downcontrol === true) {
            return true;
        }
        return false;
    }

    var start = true;

    //Moving the snake
    document.onkeydown = function (event) {
        //Ensures that comp runs once
        if (start){
            RunComp();
        }
        start = false;

        if (!Moving()) {
            MoveUp();
            MoveDown();
            MoveRight();
            MoveLeft();
        }
        switch (event.keyCode) {
            //Pressed the spacebar
            case 32:
                if (paused === false) {
                    if (upcontrol) {
                        savedmove = "up";
                    } else if (downcontrol) {
                        savedmove = "down";
                    } else if (rightcontrol) {
                        savedmove = "right";
                    } else{
                        savedmove = "left";
                    }
                    if (cupcontrol){
                        savedmovec = "up";
                    } else if (cdowncontrol) {
                        savedmovec = "down";
                    } else if (crightcontrol) {
                        savedmovec = "right";
                    } else{
                        savedmovec = "left";
                    }
                    //pause player
                    upcontrol = false;
                    downcontrol = false;
                    rightcontrol = false;
                    leftcontrol = false;
                    //pause comp
                    cupcontrol = false;
                    cdowncontrol = false;
                    crightcontrol = false;
                    cleftcontrol = false;
                    paused = true;
                    pause.style.display = "block";
                    break;
                } else {
                    if (savedmove === "up") {
                        upcontrol = true;
                    } else if (savedmove === "down") {
                        downcontrol = true;
                    } else if (savedmove === "right") {
                        rightcontrol = true;
                    } else{
                        leftcontrol = true;
                    }

                    if (csavedmove === "up") {
                        cupcontrol = true;
                    } else if (csavedmove === "down") {
                        cdowncontrol = true;
                    } else if (csavedmove === "right") {
                        crightcontrol = true;
                    } else{
                        cleftcontrol = true;
                    }
                    paused = false;
                    pause.style.display = "none";
                    break;
                }

            case 37:
                pause.style.display = "none";
                if (leftcontrol === false) {
                    MoveLeft();
                    upcontrol = false;
                    downcontrol = false;
                    leftcontrol = true;
                    rightcontrol = false;
                    break;
                }
                break;
            case 38:
                pause.style.display = "none";
                if (upcontrol === false) {
                    MoveUp();
                    downcontrol = false;
                    upcontrol = true;
                    leftcontrol = false;
                    rightcontrol = false;
                    break;
                }
                break;
            case 39:
                pause.style.display = "none";
                if (rightcontrol === false) {
                    MoveRight();
                    upcontrol = false;
                    downcontrol = false;
                    leftcontrol = false;
                    rightcontrol = true;
                    break;
                }
                break;
            case 40:
                pause.style.display = "none";
                if (downcontrol === false) {
                    MoveDown();
                    upcontrol = false;
                    downcontrol = true;
                    leftcontrol = false;
                    rightcontrol = false;
                    break;
                }
                break;
        }
    };
    //Moves Snake using onscreen D-pad
    dup.onclick = (function () {
        if (upcontrol === false) {
            MoveUp();
            downcontrol = false;
            upcontrol = true;
            leftcontrol = false;
            rightcontrol = false;
        }
    })
    ddown.onclick = (function () {
        if (downcontrol === false) {
            MoveDown();
            upcontrol = false;
            downcontrol = true;
            leftcontrol = false;
            rightcontrol = false;
        }
    })
    dright.onclick = (function () {
        if (rightcontrol === false) {
            MoveRight();
            upcontrol = false;
            downcontrol = false;
            leftcontrol = false;
            rightcontrol = true;
        }
    })
    dleft.onclick = (function () {
        if (rightcontrol === false) {
            MoveLeft();
            upcontrol = false;
            downcontrol = false;
            leftcontrol = true;
            rightcontrol = false;
        }
    })

    var speed = 100;
    //Function that moves up
    function MoveUp() {
        var id = setInterval(frame, speed);

        function frame() {
            if (!upcontrol) {
                clearInterval(id);
            }
            if ((CurrentPos() - 50) > 0) {
                ChangePos(-50);
            } else {
                ChangePos(2450);
            }
        }
    }
    //Function that moves down
    function MoveDown() {
        var id = setInterval(frame, speed);

        function frame() {
            if (!downcontrol) {
                clearInterval(id);
            }
            if ((CurrentPos() + 50) < 2499) {
                ChangePos(50);
            } else {
                ChangePos(-2450);
            }
        }
    }
    //Function that moves right
    function MoveRight() {
        var id = setInterval(frame, speed);

        function frame() {
            if (!rightcontrol) {
                clearInterval(id);
            }
            if (CurrentPos() % 50 === 49) {
                ChangePos(-49);
            } else {
                ChangePos(1);
            }
        }
    }
    //Function that moves left
    function MoveLeft() {
        var id = setInterval(frame, speed);

        function frame() {
            if (!leftcontrol) {
                clearInterval(id);
            }
            if (CurrentPos() % 50 === 0) {
                ChangePos(49);
            } else {
                ChangePos(-1);
            }
        }
    }

    //Computer movements
    //Function that moves up
    function cMoveUp() {
        var id = setInterval(frame, speed);

        function frame() {
            if (!cupcontrol) {
                clearInterval(id);
            }
            else{
                ChangeCompPos(-50);}
        }
    }
    //Function that moves down
    function cMoveDown() {
        var id = setInterval(frame, speed);

        function frame() {
            if (!cdowncontrol) {
                clearInterval(id);
            }
            else{
                ChangeCompPos(50);
            }
            }
        }
    //Function that moves right
    function cMoveRight() {
        var id = setInterval(frame, speed);

        function frame() {
            if (!crightcontrol) {
                clearInterval(id);
            }
            else{
            ChangeCompPos(1);}
        }
    }
    //Function that moves left
    function cMoveLeft() {
        var id = setInterval(frame, speed);

        function frame() {
            if (!cleftcontrol) {
                clearInterval(id);
            }
            else {
                ChangeCompPos(-1);
            }
        }
    }
})

    //When 2 players is selected
    play2.onclick = (function () {
        play1.style.display = "none";
        play2.style.display = "none";
        win.innerText = "Player 1 Wins";
        lose.innerText = "Player 2 Wins";

        //Get all elements from document
        let tiles = document.getElementsByTagName('td'); //Gets all grid spaces in the game
        //Initiate Tails of snake as an array
        var comptails = [];
        var tails = [];
        var border = [];

        //Create border
        for (var i =0;i<50;i++){
            tiles.item(i).style.backgroundColor= "black";
            border.push(i);
        }
        for (var i =0;i<50;i++){
            tiles.item(2450+i).style.backgroundColor= "black";
            border.push(2450+i);
        }
        for (var i =0;i<50;i++){
            tiles.item(49+(i*50)).style.backgroundColor= "black";
            border.push(49+(i*50));
        }
        for (var i =0;i<50;i++){
            tiles.item(i*50).style.backgroundColor= "black";
            border.push(i*50);
        }

        //Starting position of snake
        tiles.item(1235).style.backgroundColor = "green";
        //Starting position of comp snake
        tiles.item(1215).style.backgroundColor = "darkred";

        //Function to change the position of snake head 2
        function ChangeCompPos(value) {
            const curr = CurrentCompPos();
            tiles.item(curr).style.backgroundColor = "red";
            if ((curr!==1215)&&(curr!==1216)&&(curr!==1165)){
                comptails.push(curr);}


            //If snake touches black border, game over
            if (border.includes(curr+value)){
                //Stops movement
                cupcontrol = false;cdowncontrol = false;crightcontrol = false;cleftcontrol = false;
                upcontrol = false;downcontrol = false;rightcontrol = false;leftcontrol = false;
                win.style.display = "block";

                var ite1 = 0;
                var id1 = setInterval(frame, 500);

                function frame() {
                    if (ite1 === 0) {
                        win.style.display = "block";
                        ite1++;
                    } else {
                        clearInterval(id1);
                        location.reload();//restarts game
                    }
                }
            }
            //If snake touches tail game is over
            if (tails.includes(curr+value)) {
                cupcontrol = false;
                cdowncontrol = false;
                crightcontrol = false;
                cleftcontrol = false;
                upcontrol = false;downcontrol = false;rightcontrol = false;leftcontrol = false;
                win.innerText = "Player 1 Wins"
                win.style.display = "block";
                var ite2 = 0;
                var id2 = setInterval(frame, 500);

                function frame() {
                    if (ite2 === 0) {
                        win.style.display = "block";
                        ite2++;
                    } else {
                        clearInterval(id2);
                        location.reload();//restarts game
                    }
                }
            }
            //If snake touches tail game is over
            if (comptails.includes(curr+value)) {
                cupcontrol = false;
                cdowncontrol = false;
                crightcontrol = false;
                cleftcontrol = false;
                upcontrol = false;downcontrol = false;rightcontrol = false;leftcontrol = false;
                win.style.display = "block";
                var ite3 = 0;
                var id3 = setInterval(frame, 500);

                function frame() {
                    if (ite3 === 0) {
                        win.style.display = "block";
                        ite3++;
                    } else {
                        clearInterval(id3);
                        location.reload();//restarts game
                    }
                }
            }

            //Head position
            tiles.item(curr + value).style.backgroundColor = "darkred";
        }
        //Get current position of head of snake
        function CurrentPos() {
            for (var i = 0; i < tiles.length; i++) {
                if (tiles.item(i).style.backgroundColor === "green") {
                    return i;
                }
            }
        }
        //Get current position of head of snake 2
        function CurrentCompPos() {
            for (var i = 0; i < tiles.length; i++) {
                if (tiles.item(i).style.backgroundColor === "darkred") {
                    return i;
                }
            }
        }
        //Function that changes position of the snake head
        function ChangePos(value) {
            //Save head position
            const curr = CurrentPos();
            tiles.item(curr).style.backgroundColor = "darkgreen";
            if ((curr!==1235)&&(curr!==1236)&&(curr!==1185)){
                tails.push(curr);}

            //If snake touches black border, game over
            if (border.includes(curr+value)){
                //Stops movement
                upcontrol = false;downcontrol = false;rightcontrol = false;leftcontrol = false;
                cupcontrol = false;cdowncontrol = false;crightcontrol = false;cleftcontrol = false;
                lose.style.display = "block";
                var ite = 0;
                var id = setInterval(frame, 1000);

                function frame() {
                    if (ite === 0) {
                        lose.style.display = "block";
                        ite++;
                    } else {
                        clearInterval(id);
                        location.reload();//restarts game
                    }
                }
            }
            //If snake touches tail game is over
            if (tails.includes(curr+value)){
                upcontrol = false;downcontrol = false;rightcontrol = false;leftcontrol = false;
                cupcontrol = false;cdowncontrol = false;crightcontrol = false;cleftcontrol = false;
                lose.style.display = "block";
                var ite = 0;
                var id = setInterval(frame, 1000);
                function frame() {
                    if (ite === 0) {
                        lose.style.display = "block";
                        ite++;
                    } else {
                        clearInterval(id);
                        location.reload();//restarts game
                    }
                }
            }
            //If snake touches comp tail game is over
            if (comptails.includes(curr+value)){
                upcontrol = false;downcontrol = false;rightcontrol = false;leftcontrol = false;
                cupcontrol = false;cdowncontrol = false;crightcontrol = false;cleftcontrol = false;
                lose.style.display = "block";
                var ite = 0;
                var id = setInterval(frame, 1000);
                function frame() {
                    if (ite === 0) {
                        lose.style.display = "block";
                        ite++;
                    } else {
                        clearInterval(id);
                        location.reload();//restarts game
                    }
                }
            }
            //Head position
            tiles.item(curr + value).style.backgroundColor = "green";
        }


        //Controls which direction the snake will be moving
        var cupcontrol = false;
        var cdowncontrol = false;
        var crightcontrol = false;
        var cleftcontrol = false;
        var upcontrol = false;
        var downcontrol = false;
        var rightcontrol = false;
        var leftcontrol = false;

        //Controls when game is paused
        var paused = false;
        var savedmove = null;
        var savedmovec = null;

        //Function to check if the snake is currently moving
        function Moving() {
            if (upcontrol === true) {
                return true;
            } else if (rightcontrol === true) {
                return true;
            } else if (leftcontrol === true) {
                return true;
            } else if (downcontrol === true) {
                return true;
            }
            return false;
        }
        function cMoving() {
            if (cupcontrol === true) {
                return true;
            } else if (crightcontrol === true) {
                return true;
            } else if (cleftcontrol === true) {
                return true;
            } else if (cdowncontrol === true) {
                return true;
            }
            return false;
        }

        //Moving the snake
        document.onkeydown = function (event) {
            if (!Moving()) {
                MoveUp();
                MoveDown();
                MoveRight();
                MoveLeft();
            }
            if (!cMoving()) {
                cMoveUp();
                cMoveDown();
                cMoveRight();
                cMoveLeft();
            }
            switch (event.keyCode) {
                //Pressed the spacebar
                case 32:
                    if (paused === false) {
                        if (upcontrol) {
                            savedmove = "up";
                        } else if (downcontrol) {
                            savedmove = "down";
                        } else if (rightcontrol) {
                            savedmove = "right";
                        } else {
                            savedmove = "left";
                        }
                        if (cupcontrol) {
                            savedmovec = "up";
                        } else if (cdowncontrol) {
                            savedmovec = "down";
                        } else if (crightcontrol) {
                            savedmovec = "right";
                        } else {
                            savedmovec = "left";
                        }
                        //pause player
                        upcontrol = false;
                        downcontrol = false;
                        rightcontrol = false;
                        leftcontrol = false;
                        //pause comp
                        cupcontrol = false;
                        cdowncontrol = false;
                        crightcontrol = false;
                        cleftcontrol = false;
                        paused = true;
                        pause.style.display = "block";
                        break;
                    } else {
                        if (savedmove === "up") {
                            upcontrol = true;
                        } else if (savedmove === "down") {
                            downcontrol = true;
                        } else if (savedmove === "right") {
                            rightcontrol = true;
                        } else {
                            leftcontrol = true;
                        }

                        if (csavedmove === "up") {
                            cupcontrol = true;
                        } else if (csavedmove === "down") {
                            cdowncontrol = true;
                        } else if (csavedmove === "right") {
                            crightcontrol = true;
                        } else {
                            cleftcontrol = true;
                        }
                        paused = false;
                        pause.style.display = "none";
                        break;
                    }

                case 37:
                    pause.style.display = "none";
                    if (leftcontrol === false) {
                        MoveLeft();
                        upcontrol = false;
                        downcontrol = false;
                        leftcontrol = true;
                        rightcontrol = false;
                        break;
                    }
                    break;
                case 38:
                    pause.style.display = "none";
                    if (upcontrol === false) {
                        MoveUp();
                        downcontrol = false;
                        upcontrol = true;
                        leftcontrol = false;
                        rightcontrol = false;
                        break;
                    }
                    break;
                case 39:
                    pause.style.display = "none";
                    if (rightcontrol === false) {
                        MoveRight();
                        upcontrol = false;
                        downcontrol = false;
                        leftcontrol = false;
                        rightcontrol = true;
                        break;
                    }
                    break;
                case 40:
                    pause.style.display = "none";
                    if (downcontrol === false) {
                        MoveDown();
                        upcontrol = false;
                        downcontrol = true;
                        leftcontrol = false;
                        rightcontrol = false;
                        break;
                    }
                    break;
                //Second player controls
                case 65:
                    pause.style.display = "none";
                    if (cleftcontrol === false) {
                        cMoveLeft();
                        cupcontrol = false;
                        cdowncontrol = false;
                        cleftcontrol = true;
                        crightcontrol = false;
                        break;
                    }
                    break;
                case 87:
                    pause.style.display = "none";
                    if (cupcontrol === false) {
                        cMoveUp();
                        cdowncontrol = false;
                        cupcontrol = true;
                        cleftcontrol = false;
                        crightcontrol = false;
                        break;
                    }
                    break;
                case 68:
                    pause.style.display = "none";
                    if (crightcontrol === false) {
                        cMoveRight();
                        cupcontrol = false;
                        cdowncontrol = false;
                        cleftcontrol = false;
                        crightcontrol = true;
                        break;
                    }
                    break;
                case 83:
                    pause.style.display = "none";
                    if (cdowncontrol === false) {
                        cMoveDown();
                        cupcontrol = false;
                        cdowncontrol = true;
                        cleftcontrol = false;
                        crightcontrol = false;
                        break;
                    }
                    break;
            }
        };
        var speed = 100;
        //Function that moves up
        function MoveUp() {
            var id = setInterval(frame, speed);

            function frame() {
                if (!upcontrol) {
                    clearInterval(id);
                }
                if ((CurrentPos() - 50) > 0) {
                    ChangePos(-50);
                } else {
                    ChangePos(2450);
                }
            }
        }
        //Function that moves down
        function MoveDown() {
            var id = setInterval(frame, speed);

            function frame() {
                if (!downcontrol) {
                    clearInterval(id);
                }
                if ((CurrentPos() + 50) < 2499) {
                    ChangePos(50);
                } else {
                    ChangePos(-2450);
                }
            }
        }
        //Function that moves right
        function MoveRight() {
            var id = setInterval(frame, speed);

            function frame() {
                if (!rightcontrol) {
                    clearInterval(id);
                }
                if (CurrentPos() % 50 === 49) {
                    ChangePos(-49);
                } else {
                    ChangePos(1);
                }
            }
        }
        //Function that moves left
        function MoveLeft() {
            var id = setInterval(frame, speed);

            function frame() {
                if (!leftcontrol) {
                    clearInterval(id);
                }
                if (CurrentPos() % 50 === 0) {
                    ChangePos(49);
                } else {
                    ChangePos(-1);
                }
            }
        }
        //Function that moves up
        function cMoveUp() {
            var id = setInterval(frame, speed);

            function frame() {
                if (!cupcontrol) {
                    clearInterval(id);
                }
                if ((CurrentCompPos() - 50) > 0) {
                    ChangeCompPos(-50);
                } else {
                    ChangeCompPos(2450);
                }
            }
        }
        //Function that moves down
        function cMoveDown() {
            var id = setInterval(frame, speed);

            function frame() {
                if (!cdowncontrol) {
                    clearInterval(id);
                }
                if ((CurrentCompPos() + 50) < 2499) {
                    ChangeCompPos(50);
                } else {
                    ChangeCompPos(-2450);
                }
            }
        }
        //Function that moves right
        function cMoveRight() {
            var id = setInterval(frame, speed);

            function frame() {
                if (!crightcontrol) {
                    clearInterval(id);
                }
                if (CurrentCompPos() % 50 === 49) {
                    ChangeCompPos(-49);
                } else {
                    ChangeCompPos(1);
                }
            }
        }
        //Function that moves left
        function cMoveLeft() {
            var id = setInterval(frame, speed);

            function frame() {
                if (!cleftcontrol) {
                    clearInterval(id);
                }
                if (CurrentCompPos() % 50 === 0) {
                    ChangeCompPos(49);
                } else {
                    ChangeCompPos(-1);
                }
            }
        }
    })

})

//If DINO RUN was picked as the option
optiondino.onclick = (function () {
    optionsnake.style.display = "none";
    optiontron.style.display = "none";
    optiondino.style.display = "none";
    options.style.display = "none";
    //Get all elements from document
    let tiles = document.getElementsByTagName('td'); //Gets all grid spaces in the game
    let score = document.getElementById("score");

    //Initiate score as 0
    var scorevalue = 0;

    //Create border
    for (var i =0;i<50;i++){
        tiles.item(1500+i).style.backgroundColor= "black";
    }

    //Draw dino
    drawDino(0);

    //Function that draws and clears trex drawing
    function drawDino(jump) {
        //Draw dino
        tiles.item(1452+jump).style.backgroundColor= "green";
        tiles.item(1403+jump).style.backgroundColor= "green";
        tiles.item(1454+jump).style.backgroundColor= "green";
        tiles.item(1402+jump).style.backgroundColor= "green";
        tiles.item(1404+jump).style.backgroundColor= "green";
        tiles.item(1401+jump).style.backgroundColor= "green";
        tiles.item(1350+jump).style.backgroundColor= "green";
        tiles.item(1300+jump).style.backgroundColor= "green";
        tiles.item(1351+jump).style.backgroundColor= "green";
        tiles.item(1352+jump).style.backgroundColor= "green";
        tiles.item(1353+jump).style.backgroundColor= "green";
        tiles.item(1354+jump).style.backgroundColor= "green";
        tiles.item(1354+jump).style.backgroundColor= "green";
        tiles.item(1304+jump).style.backgroundColor= "green";
        tiles.item(1305+jump).style.backgroundColor= "green";
        tiles.item(1303+jump).style.backgroundColor= "green";
        tiles.item(1302+jump).style.backgroundColor= "green";
        tiles.item(1253+jump).style.backgroundColor= "green";
        tiles.item(1254+jump).style.backgroundColor= "green";
        tiles.item(1204+jump).style.backgroundColor= "green";
        tiles.item(1203+jump).style.backgroundColor= "green";
        tiles.item(1205+jump).style.backgroundColor= "green";
        tiles.item(1206+jump).style.backgroundColor= "green";
        tiles.item(1155+jump).style.backgroundColor= "green";
        tiles.item(1156+jump).style.backgroundColor= "green";
        tiles.item(1154+jump).style.backgroundColor= "green";
        tiles.item(1153+jump).style.backgroundColor= "green";
    }
    function clearDino() {
        for (var i = 0;i<tiles.length;i++){
            if (tiles.item(i).style.backgroundColor==="green"){
                tiles.item(i).style.backgroundColor="yellowgreen";
            }
        }
    }

    //Trex jumping process
    var time = 25;
    function jump(){
        var inc = 50;
        var id = setInterval(frame,time);
        function frame() {
            if (inc === 500){
                clearInterval(id);
                land(inc);
            }
            else{
                clearDino();
                drawDino(-inc);
                inc+=50;
                time+=5;
            }
        }
    }
    function land(inc){
        var id2 = setInterval(frame2,time);
        function frame2() {
            if (inc === -50){
                clearInterval(id2);
                jumped = false;
                time = 10;
            }
            else{
                clearDino();
                drawDino(-inc);
                inc-=50;
                time-=5;
            }
        }
    }

    function genH(){
        min = Math.ceil(0);
        max = Math.floor(3);
        var h = Math.floor(Math.random() * (max - min)) + min;
        return h;
    }

    //Function that generates rock
    function genRock(h,value){
        for(var i=0;i<h+1;i++){
            if (tiles.item(1499-(i*50)+value).style.backgroundColor==="green"){
                gamedone = true;
                gameover.style.display = "block";
                var ite = 0;
                var id = setInterval(frame, 1000);

                function frame() {
                    if (ite === 0) {
                        gameover.style.display = "block";
                        ite++;
                    } else {
                        clearInterval(id);
                        location.reload();//restarts game
                    }
                }
            }
            tiles.item(1499-(i*50)+value).style.backgroundColor="gray";

        }
        for(var i=0;i<h+1;i++){
            tiles.item(1499-(i*50)+value+1).style.backgroundColor="yellowgreen";
        }
    }

    //Function that generates rock
    function genCloud(value){
        tiles.item(474+value).style.backgroundColor="white";
        tiles.item(473+value).style.backgroundColor="white";
        tiles.item(525+value).style.backgroundColor="white";
        tiles.item(522+value).style.backgroundColor="white";
        tiles.item(523+value).style.backgroundColor="white";
        tiles.item(524+value).style.backgroundColor="white";
        tiles.item(575+value).style.backgroundColor="white";
        tiles.item(572+value).style.backgroundColor="white";
        tiles.item(573+value).style.backgroundColor="white";
        tiles.item(574+value).style.backgroundColor="white";
        tiles.item(571+value).style.backgroundColor="white";
        tiles.item(576+value).style.backgroundColor="white";
        tiles.item(577+value).style.backgroundColor="white";
        tiles.item(526+value).style.backgroundColor="white";

        tiles.item(474+value+2).style.backgroundColor="yellowgreen";
        tiles.item(473+value+2).style.backgroundColor="yellowgreen";
        tiles.item(525+value+5).style.backgroundColor="yellowgreen";
        tiles.item(522+value+5).style.backgroundColor="yellowgreen";
        tiles.item(523+value+5).style.backgroundColor="yellowgreen";
        tiles.item(524+value+5).style.backgroundColor="yellowgreen";
        tiles.item(575+value+7).style.backgroundColor="yellowgreen";
        tiles.item(572+value+7).style.backgroundColor="yellowgreen";
        tiles.item(573+value+7).style.backgroundColor="yellowgreen";
        tiles.item(574+value+7).style.backgroundColor="yellowgreen";
        tiles.item(571+value+7).style.backgroundColor="yellowgreen";
        tiles.item(576+value+7).style.backgroundColor="yellowgreen";
        tiles.item(577+value+7).style.backgroundColor="yellowgreen";
        tiles.item(526+value+5).style.backgroundColor="yellowgreen";
    }

    function clearend() {
        tiles.item(1400).style.backgroundColor="yellowgreen";
        tiles.item(1450).style.backgroundColor="yellowgreen";
        tiles.item(1350).style.backgroundColor="yellowgreen";
        tiles.item(1500).style.backgroundColor="black";
    }

    function clearcloud() {
        tiles.item(450).style.backgroundColor="yellowgreen";
        tiles.item(502).style.backgroundColor="yellowgreen";
        tiles.item(449).style.backgroundColor="yellowgreen";

    }


    var trackspeed = 50;
    var rockpos = 0;
    var height = genH();
    var gamedone = false;

    function startRun(){
        var id = setInterval(frame,trackspeed);
        function frame() {
            if (gamedone){
                clearInterval(id);
            }
            clearend();
            scorevalue+=1;
            score.innerText = scorevalue;
            if (rockpos===-50){
                clearInterval(id);
                height = genH();
                rockpos=0;
                if (trackspeed!==20){
                    trackspeed-=0.5;}
                startRun();
            }
            genRock(height,rockpos);
            rockpos-=1;
        }
    }
    var cloudspeed = 100;
    var cloudpos = 29;
    function cloudRun(){
        clearcloud();
        var id = setInterval(frame,cloudspeed);
        function frame() {
            if (gamedone){
                clearInterval(id);
            }
            if (cloudpos===-25){
                clearInterval(id);
                cloudpos = 25;
                cloudRun();
            }
            genCloud(cloudpos);
            cloudpos-=1;
        }
    }

    var jumped = false;
    var started = false;
    document.onkeydown = function (event) {
        if (!started) {
            startRun();
            cloudRun();
            started = true;
        }
        switch (event.keyCode) {
            //Pressed the spacebar/jump
            case 32:
                if (!jumped){
                    jump();
                    jumped = true;
                }
                break;
        }
        }

})






//Creates and colors circular button design on screen
var canvas = document.getElementById('button4');
var context = canvas.getContext('2d');
var centerX = canvas.width / 2;
var centerY = canvas.height / 2;
var radius = 70;

context.beginPath();
context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
context.fillStyle = 'green';
context.fill();
context.lineWidth = 5;
context.strokeStyle = 'rgba(80,139,68,0.4)';
context.stroke();

var canvas2 = document.getElementById('button3');
var context2 = canvas2.getContext('2d');
var centerX2 = canvas2.width / 2;
var centerY2 = canvas2.height / 2;
var radius2 = 70;

context2.beginPath();
context2.arc(centerX2, centerY2, radius2, 0, 2 * Math.PI, false);
context2.fillStyle = 'red';
context2.fill();
context2.lineWidth = 5;
context2.strokeStyle = 'rgba(102,26,26,0.51)';
context2.stroke();

var canvas3 = document.getElementById('button1');
var context3 = canvas3.getContext('2d');
var centerX3 = canvas3.width / 2;
var centerY3 = canvas3.height / 2;
var radius3 = 70;

context3.beginPath();
context3.arc(centerX3, centerY3, radius3, 0, 2 * Math.PI, false);
context3.fillStyle = 'blue';
context3.fill();
context3.lineWidth = 5;
context3.strokeStyle = 'rgba(72,91,142,0.58)';
context3.stroke();

var canvas4 = document.getElementById('button2');
var context4 = canvas4.getContext('2d');
var centerX4 = canvas4.width / 2;
var centerY4 = canvas4.height / 2;
var radius4 = 70;

context4.beginPath();
context4.arc(centerX4, centerY4, radius4, 0, 2 * Math.PI, false);
context4.fillStyle = 'yellow';
context4.fill();
context4.lineWidth = 5;
context4.strokeStyle = 'rgba(199,175,78,0.47)';
context4.stroke();