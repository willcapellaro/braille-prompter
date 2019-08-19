let globalIndex = 0;
let stopFlag = false;
let timer = 0;
let isPaused = false;
let equivalence = [{ char: ' ', value: 'space' },
    { char: '?', value: 'question-mark' },
    { char: ':', value: 'colon' },
    { char: '\n', value: 'return' }
];
let array = [];

document.addEventListener('DOMContentLoaded', disabled, false);

function disabled() {
    document.getElementById('play').disabled = true;
    document.getElementById('stop').disabled = true;
    document.getElementById('restart').disabled = true;
};

function allLetter(inputtxt) {
    var letters = /^[a-zA-Z\s.,:;\-!?]*$/;
    if (letters.test(inputtxt)) {
        return true;
    } else {
        return false;
    }
}

async function sleep(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
}

function recreateImg(imageName, index, array) {
    let item = document.getElementById("parent-img");
    while (item.firstChild) {
        item.removeChild(item.firstChild);
    }
    let imgString = '<img src= "imgs/' + imageName + '" class="rounded mx-auto d-block animated bounce" width="500" height="200">'
    if (index === array.length) {
        imgString = '<img src= "imgs/letter-end.svg" class="rounded mx-auto d-block" width="500" height="200">'
    }
    let div = document.createElement('div');
    div.innerHTML = imgString.trim();
    item.appendChild(div.firstChild);
}

function restart() {
    globalIndex = 0;
    clearInterval(timer);
    stopFlag = false;
    let value = document.getElementById("textBox").value;
    array = value.split("");
    let index = 0;
    letterTransition(index);
}

function stop() {
    clearInterval(timer);
    timer = 0;
    stopFlag = true;
    let imageName = '';
    if (array[globalIndex] === ' ' || array[globalIndex] === '?' || array[globalIndex] === ':' || array[globalIndex] === '\n') {
        imageName = equivalence.filter(x => x.char === array[globalIndex])[0].value;
    } else {
        imageName = array[globalIndex];
    }
    recreateImg("letter-" + imageName + ".svg", globalIndex, array);
}

function play() {
    let index = globalIndex;
    let value = (document.getElementById("textBox").value);
    array = value.split("");
    if (index === (array.length - 1)) {
        index = 0
    }
    letterTransition(index);
}

function letterTransition(index) {
    clearInterval(timer);
    stopFlag = false;
    let speed = document.getElementById("speed").value;

    timer = setInterval(() => {
        if (!isPaused) {
            let imageName = '';
            if (stopFlag === false && index < (array.length)) {
                if (array[index] === ' ' || array[index] === '?' || array[index] === ':' || array[index] === '\n') {
                    imageName = equivalence.filter(x => x.char === array[index])[0].value;
                } else {
                    imageName = array[index];
                }
                recreateImg("letter-" + imageName + ".svg", index, array);
                isPaused = true;
                setTimeout(() => {
                    setTimeout(() => {
                        if (stopFlag === false) {
                            recreateImg('blank.png', index, array);
                        }
                        isPaused = false;
                    }, speed * 0.1);
                }, speed);
                globalIndex = index;
                index++;
            } else {
                active('');
                clearInterval(timer);
            }
        }
    }, speed);
}

function textCount() {
    string = document.getElementById("textBox").value;
    if (string === '') {
        document.getElementById('play').disabled = true;
        document.getElementById('stop').disabled = true;
        document.getElementById('restart').disabled = true;
    } else {
        document.getElementById('play').disabled = false;
        document.getElementById('stop').disabled = false;
        document.getElementById('restart').disabled = false;
    }
    if (allLetter(string)) {
        document.getElementById("counter").innerHTML = string.length + '/700';
    } else {
        document.getElementById("textBox").value = string.slice(0, -1);
    }
}

function active(id) {
    document.getElementById('play').disabled = false;
    document.getElementById('stop').disabled = false;
    document.getElementById('restart').disabled = false;
    if (id !== '') {
        document.getElementById(id).disabled = true;
    }
}