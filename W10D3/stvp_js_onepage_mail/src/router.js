const Compose = require("./compose");
const MessageStore = require("./messsage_store");



class Router{
    constructor(node,routes){
        this.node = node;
        this.routes = routes;
        this.start();

    }
    start(){
        this.render();
        window.addEventListener('hashchange',()=>{
            this.render();
        })
    }
    activeRoute(){
        let data = window.location.hash
        return this.routes[data.slice(1)];

    }
    render(){
        let component = this.activeRoute();
        if (component === undefined){ 
            this.node.innerHTML = ''}else{
            this.node.innerHTML = '';
            let content = component.render();
            this.node.appendChild(content);
        };

    }
}

module.exports = Router;