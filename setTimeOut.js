// creating a delay of 3s or 3000 milli seconds

const waitTime = 3000;

//setting for setInterval

const waitInterval = 10;
let currentTime = 0;


const incrementTime = () => {

    currentTime += waitInterval;
    console.log(currentTime)

}

console.log(waitTime / 1000);

const timerFinished = () => {
    clearInterval(interval) // this is seen in the next lines
    console.log('Check Timer');
}

const interval = setInterval(incrementTime, waitInterval); // to set intervals, the setInterval should be in a  raible to exit the program
setTimeout(timerFinished, waitTime); //here callback must be a fucntion