const startBtn = document.querySelector('.startBtn');
const mainStartBtn = document.querySelector('.mainStartBtn');

const lapBtn = document.querySelector('.lapBtn');
const resetBtn = document.querySelector('.resetBtn');


const laps = document.querySelector('.laps');

let time = document.querySelector('.time');
let int = null;

// temporizador
let milisec = 0;
let sec = 0;
let min = 0;

let m = 0;
let s = 0;
let ms = 0;

let itsTimeStarted = false;

let allLaps = [];
let lapsNumber = 1;

// botón de start
startBtn.addEventListener('click', () => {
    if (!itsTimeStarted) {
        itsTimeStarted = true;
        int = setInterval(displayTimer, 10);
    } else {
        itsTimeStarted = false;
        clearInterval(int);
    }
    changeStartBtn();
    checkReset();
});

// Función temporizador
function displayTimer() {
    milisec++;
    if (milisec >= 99) {
        sec++;
        milisec = 0;
    }
    if (sec >= 60) {
        min++;
        sec = 0;
    }

    // min, seg y miliseg
    m = min < 10 ? "0" + min : min;
    s = sec < 10 ? "0" + sec : sec;
    ms = milisec < 10 ? "0" + milisec : milisec;

    // mostrar el tiempo 
    time.innerHTML = `${m}:${s},${ms}`;
}

// generando el stop del time, cambiando con las clases y estilo con css
function changeStartBtn() {
    if(itsTimeStarted === true){
        //generamos un stop en el button de start
        startBtn.innerHTML = "Stop";
        startBtn.classList.add("timerStarted");
        mainStartBtn.classList.add("timerStartedmain");
    } else {
        itsTimeStarted = false;

        startBtn.innerHTML = "Start";
        startBtn.classList.remove("timerStarted");
        mainStartBtn.classList.remove("timerStartedmain");
    }
}

// boton reset generado para reemplazar a lap
function checkReset() {
    if(itsTimeStarted === false){
        resetBtn.innerHTML = "Reset";
    } else {
        resetBtn.innerHTML = "Lap";
    }
}

function displayLaps() {
    lapsNumber++;
    laps.innerHTML = ""
    if(allLaps.length > 0){
        allLaps.map(item => {
            laps.innerHTML += `
            <div class="lap">
                <span>Lap${item.number}</span>
                <span>${item.time}</span>
            </div>`
        })
    }
}

resetBtn.addEventListener('click', () => {
    if(itsTimeStarted === false) {
        milisec = 0;
        sec = 0;
        min = 0;

        m = 0;
        s = 0;
        ms = 0;
        time.innerHTML = "00:00,00";

        allLaps = [];
        laps.innerHTML = "";
        lapsNumber = 1;

    } else {
        allLaps.push(
            {
                time: m + ":" + s + "," + ms,
                number: lapsNumber,
            }
        )
        displayLaps();
        console.log(allLaps);
    }
})