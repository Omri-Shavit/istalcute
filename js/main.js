console.log(
    "III       L      OOO  V   V EEEEE       Y   Y  OOO  U   U       TTTTT   A   L     \n" +
    " I        L     O   O V   V E            Y Y  O   O U   U         T    A A  L     \n" +
    " I        L     O   O V   V EEEE          Y   O   O U   U         T   AAAAA L     \n" +
    " I        L     O   O  V V  E             Y   O   O U   U         T   A   A L     \n" +
    "III       LLLLL  OOO    V   EEEEE         Y    OOO   UUU          T   A   A LLLLL "
);

let messages = [
    "Tal is absolutely cute!",
    "YES! Tal is cute.",
    "Tal is completely cute!",
    "Tal is beyond cute!",
    "Tal is positively cute!",
    "Tal is certainly cute!",
    "Tal sure is cute!",
    "Tal is definitely cute.",
    "Tal is totally cute!",
    "Tal is extremely cute!",
    "Tal is the cutest!",
    "Tal is very cute!",
]

let wheel = document.querySelector('.spinner'),
    spinBtn = document.querySelector('.spinBtn'),
    fullRotations = 0,
    whichGreen = 0,
    epsilon = 0,
    wheelSound = new Audio('sounds/prizeWheel.mp3'),
    pop = [
        new Audio('sounds/partyPopper.mp3'),
        new Audio('sounds/partyPopper.mp3'),
        new Audio('sounds/partyPopper.mp3'),
        new Audio('sounds/partyPopper.mp3')
    ],
    message = document.querySelector('.message'),
    wheelContainer = document.querySelector('.container'),
    title = document.querySelector('title'),
    favi = document.querySelector('link');

function celebrate(msg){
    title.innerHTML = msg;
    favi.href = 'favicon2.ico';
    message.innerHTML = msg;
    message.style.display = 'default';
    message.style.transform = 'translateY(0%)'; // translate it up to correct spot
    setTimeout(()=>{
        message.style.transform = 'translateY(200%)'; // hide message
    },3*1000);
    for (let i=0; i<1+Math.floor(2*Math.random()); i++){
        setTimeout(()=>{
            pop[i].play();
            confetti({
                particleCount: 100,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
        },1000*Math.random());
    }
    for (let i=0; i<1+Math.floor(2*Math.random()); i++){
        setTimeout(()=>{
            pop[i+2].play();
            confetti({
                particleCount: 100,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });
        },1000*Math.random());
    }
}

function spin(){
    wheelSound.currentTime = 0; wheelSound.play();
    fullRotations += Math.floor(2*Math.random()) + 2; // between 2-4 full rotations
    whichGreen = Math.floor(12*Math.random());
    epsilon = Math.floor(120*Math.random()-60)/10;
    let theta = 360 * fullRotations + 30 * whichGreen + epsilon;
    wheel.style.transform = `rotate(${theta}deg)`;
    setTimeout(((uuid,idx)=>{
    let myId = uuid;
    let myIdx = idx;
    return ()=>{
        if (fullRotations === myId){
            celebrate(messages[myIdx]);
        }
    }})(fullRotations, whichGreen),5*1000);
}

spinBtn.onclick = spin;
setTimeout(()=>{
    wheelContainer.style.display = 'flex';
}, 4000);
setTimeout(()=>{
    wheelContainer.style.transform = 'translateY(0%)';
}, 4100);
