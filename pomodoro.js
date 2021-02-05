let minutes = 20;
let seconds = 0;

let timePomodoro = 20*60;
let timeSB = 5*60;
let timeLB = 15*60;

let timeLeft = timePomodoro;
let modeTime = timePomodoro;
let running = false;
let finishedCycle = false;

let activeFont = "kumbh";
let activeColor = "red";

let currentMode = "pomodoro";

//Section for handling the canvas timer

function drawArc(){
    let timerCanvas = document.getElementById("timer-canvas").getContext("2d");
    timerCanvas.strokeStyle = "#F87070";
    timerCanvas.lineWidth = 10;
    timerCanvas.lineCap = "round";
    timerCanvas.clearRect(0,0,340, 340);
    timerCanvas.beginPath();
    timerCanvas.arc(170,170,160,Math.PI*1.5,Math.PI*(-0.5 + 1.999999*(timeLeft/modeTime)),false);
    timerCanvas.stroke();
}

drawArc();

let currentSettings = {
    tPomodoro: 20,
    tSB: 5,
    tLB: 15,
    fontType: "kumbh",
    colorType: "red"
}

let settingsMarshall = {
    tPomodoro: 20,
    tSB: 5,
    tLB: 15,
    fontType: "kumbh",
    colorType: "red"
}

function applyFont(fontClass){
    $('button').addClass(fontClass);
}

function applyColor(colorClass){
    $('button').addClass(colorClass);
}

function changeSettings(){
    let changeBuffer = {
        newFont: activeFont,
        newColor: activeColor
    };

    return changeBuffer;
}

function changeMode(mode){
    clearInterval(pomodoro);
    running = false;
    finishedCycle = false;
    switch(mode){
        case "pomodoro":
            timeLeft = timePomodoro;
            modeTime = timePomodoro;
            currentMode = "pomodoro";
            break;
        case "shortbreak":
            timeLeft = timeSB;
            modeTime = timeSB;
            currentMode = "shortbreak";
            break;
        case "longbreak":
            timeLeft = timeLB;
            modeTime = timeLB;
            currentMode = "longbreak";
            break;
        default:
            timeLeft = timePomodoro;
            modeTime = timePomodoro;
            currentMode = "pomodoro";
            console.log("ERROR: Cannot set time of mode named " + mode);
    }
    
    //console.log("Mode time set to " + modeTime)
    setTime(timeLeft);
    $(".timer-control").text("START");
}

$("#mode-pomodoro").click(function(){
    if (!$("#mode-pomodoro").is("disabled")){
        changeMode("pomodoro");
        $("#mode-pomodoro").addClass("mode-active");
        $("#mode-pomodoro").prop("disabled", true);
        $("#mode-longbreak").prop("disabled", false);
        $("#mode-shortbreak").prop("disabled", false);
        $("#mode-longbreak").removeClass("mode-active");
        $("#mode-shortbreak").removeClass("mode-active");
    }
})

$("#mode-longbreak").click(function(){
    if (!$("#mode-longbreak").is("disabled")){
        changeMode("longbreak");
        $("#mode-longbreak").addClass("mode-active");
        $("#mode-pomodoro").prop("disabled", false);
        $("#mode-longbreak").prop("disabled", true);
        $("#mode-shortbreak").prop("disabled", false);
        $("#mode-pomodoro").removeClass("mode-active");
        $("#mode-shortbreak").removeClass("mode-active");
    }
})

$("#mode-shortbreak").click(function(){
    if (!$("#mode-shortbreak").is("disabled")){
        changeMode("shortbreak");
        $("#mode-shortbreak").addClass("mode-active");
        $("#mode-pomodoro").prop("disabled", false);
        $("#mode-longbreak").prop("disabled", false);
        $("#mode-shortbreak").prop("disabled", true);
        $("#mode-longbreak").removeClass("mode-active");
        $("#mode-pomodoro").removeClass("mode-active");
    }
})

function setTime(time){
    minutes = Math.floor(time/60);
    seconds = time % 60;
                
    (minutes >= 10) ? $(".timer-minutes").text(minutes) : $(".timer-minutes").text("0" + minutes);
    (seconds >= 10) ? $(".timer-seconds").text(seconds) : $(".timer-seconds").text("0" + seconds);
    drawArc();
}

setTime(timeLeft);

let pomodoro;

$(".timer-control").click(function(){
    if(!finishedCycle){
        if (!running){
            running = true;
            $(".timer-control").text("PAUSE");
            pomodoro = setInterval(function(){
                timeLeft--;
                setTime(timeLeft);
                if(timeLeft<=0){
                    finishedCycle = true;
                    running = false;
                    $(".timer-control").text("RESTART");
                    clearInterval(pomodoro);
                }
            }, 1000);
        } else {
            running = false;
            $(".timer-control").text("RESUME");
            clearInterval(pomodoro);
        }
    } else {
        timeLeft = modeTime;
        setTime(timeLeft);
        finishedCycle = false;
        $(".timer-control").text("START");
    }
    
})

//SETTINGS MODAL SECTION

$(".button-open-settings").click(function(){
    $(".settings-overlay-backing").addClass("modal-active");
})

$(".button-close-settings").click(function(){
    settingsMarshall = currentSettings;
    $(".settings-overlay-backing").removeClass("modal-active");
})

//Handle hovering of SVGs because they do *not* like to behave
$(".modal-svg > img").mouseenter(function(){
    let vsrc = $(this).attr("src");
    switch(vsrc){
        case "assets/icon-close.svg":
            $(this).attr("src", "assets/icon-close-hover.svg");
            break;
        case "assets/icon-arrow-up.svg":
            $(this).attr("src", "assets/icon-arrow-up-hover.svg");
            break;
        case "assets/icon-arrow-down.svg":
            $(this).attr("src", "assets/icon-arrow-down-hover.svg");
            break;
        default:
            break;
    }
})

$(".modal-svg > img").mouseleave(function(){
    let vsrc = $(this).attr("src");
    switch(vsrc){
        case "assets/icon-close-hover.svg":
            $(this).attr("src", "assets/icon-close.svg");
            break;
        case "assets/icon-arrow-up-hover.svg":
            $(this).attr("src", "assets/icon-arrow-up.svg");
            break;
        case "assets/icon-arrow-down-hover.svg":
            $(this).attr("src", "assets/icon-arrow-down.svg");
            break;
        default:
            break;
    }
})

//SETTINGS FOR MINUTES

$("#jq-pomodoro-up").click(function(){
    settingsMarshall.tPomodoro += 1;
    $("#jq-pomodoro-minutes").text(settingsMarshall.tPomodoro);
})

$("#jq-pomodoro-down").click(function(){
    if (settingsMarshall.tPomodoro <= 1){
        return;
    }
    settingsMarshall.tPomodoro -= 1;
    $("#jq-pomodoro-minutes").text(settingsMarshall.tPomodoro);
})

$("#jq-shortbreak-up").click(function(){
    settingsMarshall.tSB += 1;
    $("#jq-shortbreak-minutes").text(settingsMarshall.tSB);
})

$("#jq-shortbreak-down").click(function(){
    if (settingsMarshall.tSB <= 1){
        return;
    }
    settingsMarshall.tSB -= 1;
    $("#jq-shortbreak-minutes").text(settingsMarshall.tSB);
})

$("#jq-longbreak-up").click(function(){
    settingsMarshall.tLB += 1;
    $("#jq-longbreak-minutes").text(settingsMarshall.tLB);
})

$("#jq-longbreak-down").click(function(){
    if (settingsMarshall.tLB <= 1){
        return;
    }
    settingsMarshall.tLB -= 1;
    $("#jq-longbreak-minutes").text(settingsMarshall.tLB);
})


//Submit the settings data to the rest of the app
$(".button-apply").click(function(){
    //console.log("Applying marshall with settings; " + settingsMarshall.tPomodoro);
    //Apply the settings
    timePomodoro = settingsMarshall.tPomodoro*60;
    timeSB = settingsMarshall.tSB*60;
    timeLB = settingsMarshall.tLB*60;
    currentSettings = settingsMarshall;

    switch (currentMode){
        case("pomodoro"):
            modeTime = timePomodoro;
            break;
        case("longbreak"):
            modeTime = timeLB;
            break;
        case("shortbreak"):
            modeTime = timeSB;
            break;
        default:
            console.log("Error applying Marshall settings to main settings");
    }
    
    //console.log("Mode is " + currentMode + " and current mode time is; " + modeTime/60);

    //Reset the timer
    timeLeft = modeTime;
    setTime(timeLeft);
    finishedCycle = false;
    $(".timer-control").text("START");

    //Close the modal
    $(".settings-overlay-backing").removeClass("modal-active");
})

applyFont("font-kumbh");
$("#mode-pomodoro").prop("disabled", true);