let minutes = 20;
let seconds = 0;

let timePomodoro = 20*60;
let timeSB = 5*60;
let timeLB = 15*60;

let timeLeft = timePomodoro;
let modeTime = timePomodoro;
let running = false;
let finishedCycle = false;

let activeFont = "font-kumbh";
let activeColor = "#F87070";

const colorRed = "#F87070";
const colorCyan = "#70F3F8";
const colorPink = "#D881F8";

let currentMode = "pomodoro";

var soundFinished = new Audio("assets/finished.mp3");

let currentSettings = {
    tPomodoro: 20,
    tSB: 5,
    tLB: 15,
    fontType: "font-kumbh",
    colorType: activeColor
}

let settingsMarshall = {
    tPomodoro: 20,
    tSB: 5,
    tLB: 15,
    fontType: "font-kumbh",
    colorType: activeColor
}

//Section for handling the canvas timer

function drawArc(){
    let timerCanvas = document.getElementById("timer-canvas").getContext("2d");
    timerCanvas.strokeStyle = currentSettings.colorType;
    timerCanvas.lineWidth = 10;
    timerCanvas.lineCap = "round";
    timerCanvas.clearRect(0,0,340, 340);
    timerCanvas.beginPath();
    timerCanvas.arc(170,170,160,Math.PI*1.5,Math.PI*(-0.5 + 1.999999*(timeLeft/modeTime)),false);
    timerCanvas.stroke();
}

drawArc();



function applyFont(fontClass){
    switch(fontClass){
        case "font-kumbh":
            $('body').css("font-family", "Kumbh Sans");
            break;
        case "font-roboto":
            $('body').css("font-family", "Roboto Slab");
            break;
        case "font-space":
            $('body').css("font-family", "Space Mono");
            break;
        default:
            break;
    }

    $('button').removeClass("font-kumbh");
    $('button').removeClass("font-roboto");
    $('button').removeClass("font-space");

    $('button').addClass(fontClass);
}

function applyColor(colorClass){
    $('.mode-active').css("background-color", colorClass);
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

//I would like to sincerely apologize for the following spaghetti code

$("#mode-pomodoro").click(function(){
    if (!$(this).is("disabled")){
        changeMode("pomodoro");
        $(this).addClass("mode-active");
        $(this).prop("disabled", true);
        $(this).css("background-color", currentSettings.colorType);
        $("#mode-longbreak").prop("disabled", false);
        $("#mode-shortbreak").prop("disabled", false);
        $("#mode-longbreak").removeClass("mode-active");
        $("#mode-shortbreak").removeClass("mode-active");
        $("#mode-longbreak").css("background-color", "transparent");
        $("#mode-shortbreak").css("background-color", "transparent");
    }
})

$("#mode-longbreak").click(function(){
    if (!$(this).is("disabled")){
        changeMode("longbreak");
        $(this).addClass("mode-active");
        $("#mode-pomodoro").prop("disabled", false);
        $(this).prop("disabled", true);
        $(this).css("background-color", currentSettings.colorType);
        $("#mode-shortbreak").prop("disabled", false);
        $("#mode-pomodoro").removeClass("mode-active");
        $("#mode-shortbreak").removeClass("mode-active");
        $("#mode-pomodoro").css("background-color", "transparent");
        $("#mode-shortbreak").css("background-color", "transparent");
    }
})

$("#mode-shortbreak").click(function(){
    if (!$(this).is("disabled")){
        changeMode("shortbreak");
        $(this).addClass("mode-active");
        $("#mode-pomodoro").prop("disabled", false);
        $("#mode-longbreak").prop("disabled", false);
        $(this).prop("disabled", true);
        $(this).css("background-color", currentSettings.colorType);
        $("#mode-longbreak").removeClass("mode-active");
        $("#mode-pomodoro").removeClass("mode-active");
        $("#mode-longbreak").css("background-color", "transparent");
        $("#mode-pomodoro").css("background-color", "transparent");
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
                    soundFinished.play();
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
    settingsMarshall = {...currentSettings};
    $(".button-font").removeClass("button-font-selected");
    $(".button-color").html("");

    switch(currentSettings.fontType){
        case "font-kumbh":
            $(".button-kumbh").addClass("button-font-selected");
            break;
        case "font-roboto":
            $(".button-roboto").addClass("button-font-selected");
            break;
        case "font-space":
            $(".button-space").addClass("button-font-selected");
            break;
        default:
            break;
    }

    switch(currentSettings.colorType){
        case colorRed:
            $(".button-red").html("<img src='assets/checkmark.svg' alt='' />");
            break;
        case colorCyan:
            $(".button-cyan").html("<img src='assets/checkmark.svg' alt='' />");
            break;
        case colorPink:
            $(".button-pink").html("<img src='assets/checkmark.svg' alt='' />");
            break;
        default:
            break;
    }

    $("#jq-pomodoro-minutes").text(currentSettings.tPomodoro);
    $("#jq-shortbreak-minutes").text(currentSettings.tSB);
    $("#jq-longbreak-minutes").text(currentSettings.tLB);

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

//SETTINGS FOR FONTS

$(".button-kumbh").click(function(){
    $(".button-font").removeClass("button-font-selected");
    $(this).addClass("button-font-selected");
    settingsMarshall.fontType = "font-kumbh";
})

$(".button-roboto").click(function(){
    $(".button-font").removeClass("button-font-selected");
    $(this).addClass("button-font-selected");
    settingsMarshall.fontType = "font-roboto";
})

$(".button-space").click(function(){
    $(".button-font").removeClass("button-font-selected");
    $(this).addClass("button-font-selected");
    settingsMarshall.fontType = "font-space";
})

//SETTINGS FOR COLORS

$(".button-red").click(function(){
    $(".button-color").html("");
    $(this).html("<img src='assets/checkmark.svg' alt='' />")
    settingsMarshall.colorType = colorRed;
})

$(".button-cyan").click(function(){
    $(".button-color").html("");
    $(this).html("<img src='assets/checkmark.svg' alt='' />")
    settingsMarshall.colorType = colorCyan;
})

$(".button-pink").click(function(){
    $(".button-color").html("");
    $(this).html("<img src='assets/checkmark.svg' alt='' />")
    settingsMarshall.colorType = colorPink;
})

//Submit the settings data to the rest of the app
$(".button-apply").click(function(){
    //Apply the settings
    timePomodoro = settingsMarshall.tPomodoro*60;
    timeSB = settingsMarshall.tSB*60;
    timeLB = settingsMarshall.tLB*60;
    currentSettings = {...settingsMarshall};

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

    //Set the font

    applyFont(settingsMarshall.fontType);

    //Set the new color

    applyColor(settingsMarshall.colorType);

    //Reset the timer
    timeLeft = modeTime;
    setTime(timeLeft);
    finishedCycle = false;
    running = false;
    clearInterval(pomodoro);
    $(".timer-control").text("START");

    //Close the modal
    $(".settings-overlay-backing").removeClass("modal-active");
})

applyFont("font-kumbh");
$("#mode-pomodoro").prop("disabled", true);