// main variables

let startGameFace = document.querySelector(".start-game");

let startGameButton = document.querySelector(".start-button");

let userName = document.querySelector(".username .name");

let losesCount = document.querySelector(".result .number");

let containerOfBlocks = document.querySelector(".imgs");

let gameOverFace = document.querySelector(".lose-case");
let gameOverMessage = document.querySelector(".lose-case .game-over");
let tryAgainButton = document.querySelector(".lose-case .game-over .try-again");

let winAudio = document.querySelector(".win");
let loseAudio = document.querySelector(".lose");

let blocks = Array.from(document.querySelectorAll(".imgs .block"));

// functin of start game and store player username.
startGameButton.onclick = function () {
    startGameButton.remove()
    setTimeout(() => {
        let userNameValue = prompt("Please Put Your User Name");
        if (userNameValue == null || userNameValue == "") {
            userName.textContent = "Unknown";
        } else {
            userName.textContent = userNameValue;
        }
        startGameFace.remove();
    }, 0);
};

let randoIndex = Array.from(Array(blocks.length).keys());

shufelling(randoIndex);

blocks.forEach((block, index) => {
    block.style.order = randoIndex[index];
    block.addEventListener("click", function() {
        rotate(block);
    });
})

function rotate (box) {
    box.classList.add("rotated");

    let rotatedBoxes = blocks.filter(rotatedBox => rotatedBox.classList.contains("rotated"));

    if (rotatedBoxes.length === 2) {
        
        stopClick ();

        checkUp (rotatedBoxes[0], rotatedBoxes[1]);
    }
}

// function of stop clickig and continue
function stopClick () {
    containerOfBlocks.classList.add("stop-click");
    setTimeout(() => {
        containerOfBlocks.classList.remove("stop-click")
    }, 1000);
};

// function of checking
function checkUp (firstBlock, secondBlock) {
    if (firstBlock.getAttribute("data-kind") === secondBlock.getAttribute("data-kind")) {
        winAudio.play();
        firstBlock.classList.remove("rotated");
        secondBlock.classList.remove("rotated");

        firstBlock.classList.add("done");
        secondBlock.classList.add("done");
    } else {
        setTimeout(() => {
            loseAudio.play();
            +losesCount.textContent++;
            if (+losesCount.textContent >= 15) {
                gameOverFace.style.display = "block"
                containerOfBlocks.style.pointerEvents = "none"
                tryAgain ();
            }
            firstBlock.classList.remove("rotated");
            secondBlock.classList.remove("rotated");
        }, 400);
    }
}

//try again function
function tryAgain () {
    tryAgainButton.onclick = function() {
        location.reload();
    }
}

//functin of shufelling
function shufelling (array) {

    let current = array.length,
        store,
        random;
    
    while (current > 0) {
        random = Math.floor(Math.random() * current) 
        current--
        //[1] save current in store
        store = array[current];
        //[2] current = random
        array[current] = array[random];
        //[3] random = store
        array[random] = store;
    }
    return array;
};






        