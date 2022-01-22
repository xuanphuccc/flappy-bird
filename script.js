
var bg = document.querySelector('.foreground');
bg.innerHTML = `
<div class="base"><img id="img1" src="./assets/sprites/base.png" alt=""></div>
<div class="base"><img id="img2" src="./assets/sprites/base.png" alt=""></div>
`;
var base = document.querySelectorAll('.base');
var bird = document.querySelector('.bird');
var birdImg = document.querySelector('.bird img');
var rootClick = document.querySelector('.game-container');

var pipes = document.querySelector('.pipes');
var pipe = document.getElementById('pipe1');
    pipes.style.left = '300px';


bird.style.top = '210px';
bird.style.left = '80px';
var str0 = bird.style.left;
var posBirdLeft = str0.slice(0, 2) * 1;

var birdWidth = bird.clientWidth;
var birdHeight = bird.clientHeight;
var pipeWidth = pipes.clientWidth;
var pipeHeight = pipe.clientHeight;

console.log('bird width = ' + birdWidth);
console.log('bird height = ' + birdHeight);
console.log('pipe width = ' + pipeWidth);
console.log('pipe height = ' + pipeHeight);



function flappyBird () {
    
    var gamePlay = true;

    var baseWidth = base[0].clientWidth;
    var pos1 = 0;
    var pos2 = baseWidth;
    var count = 0;

    
    function slideToLeft () {

        if (count == 0) {
            if (pos1 == -baseWidth) {
                pos1 = baseWidth;
                count = 1;
            }
            if (pos2 == -baseWidth) {
                pos2 = baseWidth;
                count = 1;
            }
        } else {
            if (pos1 == -baseWidth) {
                pos1 = baseWidth;
            }
            if (pos2 == -baseWidth) {
                pos2 = baseWidth;
            }
        }

        pos1 -= 3;
        pos2 -= 3;
        base[0].style.left = pos1 + 'px';
        base[1].style.left = pos2 + 'px';
        if (gamePlay == false) {
            return;
        }
        requestAnimationFrame(slideToLeft);
    }
    slideToLeft();

    //Flapping:
    function flapping () {
        setInterval(midUpDown, 66);
        
        var status = 0;
        function midUpDown () {
            if (status == 0) {
                birdImg.src = './assets/sprites/yellowbird-midflap.png';
                status = 1;
            } else if (status == 1) {
                birdImg.src = './assets/sprites/yellowbird-downflap.png';
                status = 2;
            } else {
                birdImg.src = './assets/sprites/yellowbird-upflap.png';
                status = 0;
            }
        }
    }
    flapping();


    /* // Floatting:
    function floating (isStop = 0) {

        var status = 0;
        if (isStop == 0) {
            setInterval(floatUpDown, 300);
            function floatUpDown () {
                if (status == 0) {
                    bird.style.top = '206px';
                    status = 1;
                } else {
                    bird.style.top = '214px';
                    status = 0;
                }
            }
        } else return;
    }
    // floating(); */


    var str = bird.style.top;
    var pos = str.slice(0, 3) * 1;
    console.log(pos);

    var rotateBird = 0;

    function dropping () {
        if (rotateBird <= 80) {
            rotateBird += 1.5;
        }
        birdImg.style.transform = `rotate(${rotateBird}deg)`;
        
        pos += 5;
        // console.log(pos);
        bird.style.top = pos + 'px';
        if (gamePlay == false) {
            return;
        }
        requestAnimationFrame(dropping);
        
    }
    dropping();

    
    rootClick.addEventListener('mousedown', jumping);
    var tmp = 0;
    function jumping () {
        if (gamePlay == false) {
            return;
        } else {
            if (rotateBird >= -24) {
                rotateBird -= 8;
            }
            birdImg.style.transform = `rotate(${rotateBird}deg)`;
            tmp += 8;
            pos -= 8;
            // console.log(pos);
            bird.style.top = pos + 'px';
            
            
    
            if (tmp <= 90) {
                requestAnimationFrame(jumping);
            }
            if (tmp > 90) {
                tmp = 0;
            }
        }
        
    }



    var str = pipes.style.left;
    var pipesPos = str.slice(0, 3) * 1;
    var pos3 = pipesPos;

    var pipeLog = [-30, -40, -50, -60, -70, -80, -90, -100, -110, -120,
                    -130, -140, -150, -160, -170, -180, -190, -200, -210, -220, -230, -240];
    
    var random = Math.floor(Math.random() * 22);
    pipes.style.top = pipeLog[random] + 'px';
    console.log('test RANDOM: ', random);

    function pipesSlidetoLeft () {
        if (pos3 <= -pipes.clientWidth) {
            pos3 = pipesPos;
            random = Math.floor(Math.random() * 22);
            pipes.style.top = pipeLog[random] + 'px';
            console.log('random: ', random);
        }
        pos3 -= 2.6;
        pipes.style.left = pos3 + 'px';

        if (gamePlay == false) {
            return;
        }

        requestAnimationFrame(pipesSlidetoLeft);
    }
    setTimeout(pipesSlidetoLeft, 3000);


    function gameOver () {
        if (pos > 380) {
            gamePlay = false;
            console.log('GAME OVER!!!');
            // return;
        }

        // console.log("POS 3: " + pos3);
        if (((posBirdLeft + birdWidth) >= pos3) && ((posBirdLeft + birdWidth) <= (pos3 +pipeWidth))) {
            // pipe_X <= bird_X <= (pipe_X + pipe_Width)

            /* console.log('test Random: ' + pipeLog[random]);
            console.log('test pos: ', pos);
            console.log('test pipe: ' + (pipeLog[random] + pipeHeight)); */

            if (pos <= (pipeLog[random] + pipeHeight) || (pos + birdHeight) >= (pipeLog[random] + pipeHeight + 100)) {
            // bird_Y <= top_Pipe                     || bird_Y  >= bottom_Pipe
                gamePlay = false;
                console.log('GAME OVER222!!!');
                // return;
            }
            
            
        }

        if (gamePlay == false) {
            droppingFast();
            return;
        }

        requestAnimationFrame(gameOver);
    }
    gameOver();


    function droppingFast () {
        
        if (pos >= 380) {
            return;
        } else {
            if (rotateBird <= 80) {
                rotateBird += 10;
            }
            birdImg.style.transform = `rotate(${rotateBird}deg)`;
            
            pos += 26;
            // console.log(pos);
            bird.style.top = pos + 'px';
            requestAnimationFrame(droppingFast);
        }
    }
}

flappyBird();


// Floatting:
function floating (isStop = 0) {

    var status = 0;
    if (isStop == 0) {
        setInterval(floatUpDown, 300);
        function floatUpDown () {
            if (status == 0) {
                bird.style.top = '206px';
                status = 1;
            } else {
                bird.style.top = '214px';
                status = 0;
            }
        }
    } else return;
}
// floating();