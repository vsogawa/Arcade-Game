let deaths = 0;
let leastDeaths = 0;
let mostDeaths = 0;
let numberOfPlays = 0;
let row1 = 314; row2 = 231; row3 = 148; row4 = 65;


// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor(x, y, direction) {
        if (direction === -1) {this.sprite = 'images/enemy-bug-left.png'}
        else {this.sprite = 'images/enemy-bug.png'}
        this.x = x
        this.y = y
        this.rate = direction * (200 + Math.floor(Math.random() * 200))
    }

    recycleBugs() {
        if (this.x > 500) {
            this.x = -90;
            this.sprite = 'images/enemy-bug.png';
            this.rate = (200 + Math.floor(Math.random() * 200));
            let possibleRows = [row2, row4];
            let randomRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];
            this.y = randomRow;
        }
        if (this.x < -95) {
            this.x = 500;
            this.sprite = 'images/enemy-bug-left.png';
            this.rate = -1 * (200 + Math.floor(Math.random() * 200));
            let possibleRows = [row1, row3];
            let randomRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];
            this.y = randomRow;
        }
    }

    checkCollisions() {
        if (this.y === (player.y - 8) && this.x < (player.x + 70) && this.x > (player.x - 70)) {
            player.y = 405;
            deaths++;
            $("#deaths").empty().append(`<p id="deaths"><span id="deathtext">Deaths:</span> ${deaths}</p>`);
        }
    }
        // Update the enemy's position, required method for game
        // Parameter: dt, a time delta between ticks
    update(dt) {
        this.x = this.x + (dt * this.rate);
        this.recycleBugs();
        this.checkCollisions();
    }
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor() {
        this.sprite = 'images/char-boy.png'
        this.x = 202
        this.y = 405
    }

    update() {
        if (this.y === -10) {

            if (numberOfPlays === 0) {
                mostDeaths = deaths; 
                leastDeaths = deaths;
                $("#bestrun").empty().append(`<span id="green">Best run: ${leastDeaths} deaths</span>`);
                $("#green").addClass("blinkgreen");
                $("#worstrun").empty().append(`<span id="red">Worst run: ${mostDeaths} deaths</span`);
                $("#red").addClass("blinkred");
            }
            else if (deaths > mostDeaths) {
                mostDeaths = deaths;
                $("#worstrun").empty().append(`<span id="red">Worst run: ${mostDeaths} deaths</span`);
                $("#red").addClass("blinkred");
            }
            else if (deaths < leastDeaths) {
                leastDeaths = deaths;
                $("#bestrun").empty().append(`<span id="green">Best run: ${leastDeaths} deaths</span>`);
                $("#green").addClass("blinkgreen");
            }


            deaths = 0;
            $("#deaths").empty().append(`<p id="deaths"><span id="deathtext">Deaths:</span> ${deaths}</p>`);
            this.y = 405;
            numberOfPlays++;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(directionArray) {
        if (event.which === 37 && this.x !==0) {
            this.x -= 101;
        }
        if (event.which === 39 && this.x !==909) {
            this.x += 101;
        }   
        if (event.which === 38 && this.y !== -10) {
            this.y -= 83;
        }
        if (event.which === 40 && this.y !== 405) {
            this.y += 83;
        }     
    }
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


let allEnemies = [];

function addBugs(){
    for (let i = 0; i < 3; i++) {
        let possibleRows = [row2, row4];
        let randomRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];
        let bug = new Enemy (Math.random() * 500, randomRow, 1);
        allEnemies.push(bug);
    }
    for (let i = 0; i < 3; i++) {
        let possibleRows = [row1, row3];
        let randomRow = possibleRows[Math.floor(Math.random() * possibleRows.length)];
        let bug = new Enemy (Math.random() * 500, randomRow, -1);
        allEnemies.push(bug);
    }
}

addBugs();

let player = new Player;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

document.addEventListener('click', function(e) {
    if (player.y !== -10 && window.innerWidth <=400) {
        player.y -= 83;
    }    
});

