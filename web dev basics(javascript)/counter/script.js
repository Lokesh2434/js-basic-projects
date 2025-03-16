//my counter app

const increase = document.getElementById("increasebtn");
const reset = document.getElementById("resetbtn");
const decrease = document.getElementById("decreasebtn");
const count = document.getElementById("count");

let countt = 0;

increase.onclick = function(){
    countt++;
    count.textContent = countt;
}
decrease.onclick = function(){
    countt--;
    count.textContent = countt;
}
reset.onclick = function(){
    countt = 0;
    count.textContent = countt;
}

