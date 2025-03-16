const pi = 3.14159;
let radius;
let circumference;


document.getElementById("Submit").onclick = function(){
    radius = document.getElementById("mytext").value;
    radius = Number(radius);
    circumference = 2 * pi * radius;
    circumference = document.getElementById("myh3").textContent = circumference + "cm";

}