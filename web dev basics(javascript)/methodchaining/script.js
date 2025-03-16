let loggedin = false;
let username;
let password;

while(!loggedin){
    username  = window.prompt("Enter your username");
    password = window.prompt("Enter your password");

    if(username === "Lokesh" && password === "lokianu"){
        loggedin = true;
        console.log("you are logged in!");

    }
    else{
        console.log("invalid credentials! , please try again")
    }


}