const subbtn = document.getElementById("subbtn");
const gpaybtn = document.getElementById("gpaybtn");
const phonepebtn = document.getElementById("phonepebtn");
const paytmbtn = document.getElementById("paytmbtn");
const submitbtn = document.getElementById("submitbtn");
const subpara = document.getElementById("subpara");
const paymentpara = document.getElementById("paymentpara");

submitbtn.onclick = function(){
    if(subbtn.checked){
        subpara.textContent = `you are subscribed!`;

    }
    else{
        subpara.textContent = `you are not subscribed!`;
    }
    if(gpaybtn.checked){
        paymentpara.textContent = `you are using gpay`;
    }
    else if(phonepebtn.checked){
        paymentpara.textContent = `you are using phonepe`;

    }
    else if(paytmbtn.checked){
        paymentpara.textContent = `you are using paytm`;
    }
    else{
        paymentpara.textContent = `select any one of the payment gateways!!`
    }


}