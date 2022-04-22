const Compose = require("./compose");
const Inbox = require("./inbox");
const Router = require("./router");
const Sent = require("./sent");


//created the routes
var routes = {
    inbox: Inbox,
    compose: Compose,
    sent: Sent

}

document.addEventListener("DOMContentLoaded",()=>{

    //pharse I: chaning hash fragment

    const innerText = (e) =>{
        e.preventDefault();
        const text = e.target.innerText.toLowerCase();
        window.location.hash = text;
    }

    document.querySelectorAll(".sidebar li").forEach((li)=>{
        li.addEventListener("click",innerText);
    })
    
    /// change the sub
    let node = document.querySelector(".content");
    new Router(node,routes);

    Compose.update();
    Compose.submit();
})
