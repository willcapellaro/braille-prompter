let globalIndex = 0;
let stopFlag = false;
let timer = 0;

function allLetter(inputtxt) {
    var letters = /^[a-zA-Z\s]*$/;
    if (letters.test(inputtxt)) {
        return true;
    } else {
        return false;
    }
}

function restart() {
    clearInterval(timer);
    globalIndex = 0;
    stopFlag = false;
    let value = document.getElementById("textBox").value;
    let speed = document.getElementById("speed-slider").value;
    let array = value.replace(/\s/g, "").split("");
    let index = 0;
    timer = setInterval(function() {
        if (stopFlag === false && index < (array.length)) {
            document.getElementById("alphabeth-image").src = "imgs/letter-" + array[index] + ".svg";
            globalIndex = index;
            index++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

function stop() {
    clearInterval(timer);
    timer = 0;
    stopFlag = true;
}

function play() {
    clearInterval(timer);
    stopFlag = false;
    let value = (document.getElementById("textBox").value).trim();
    let speed = document.getElementById("speed-slider").value;
    let array = value.replace(/\s/g, "").split("");
    let index = globalIndex;
    if (index === (array.length - 1)) {
        index = 0
    }
    timer = setInterval(function() {
        if (stopFlag === false && index < (array.length)) {
            document.getElementById("alphabeth-image").src = "imgs/letter-" + array[index] + ".svg";
            globalIndex = index;
            index++;
        } else {
            clearInterval(timer);
        }
    }, speed);
}

function textCount() {
    string = document.getElementById("textBox").value;
    if (allLetter(string)) {
        document.getElementById("counter").innerHTML = string.length + '/700';
    } else {
        document.getElementById("textBox").value = string.slice(0, -1);
    }
}