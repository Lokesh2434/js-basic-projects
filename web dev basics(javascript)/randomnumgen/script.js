const button = document.getElementById("myButton");
const label= document.getElementById("myLabel");

const min = 1;
const max = 6;

let randomnum;

button.onclick = function(){
    randomnum =  Math.floor(Math.random() * max) + min;
    label.textContent = randomnum;
}
