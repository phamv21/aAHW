Array.prototype.mySwap = function(x,y){
    let temp = this[x];
    this[x] = this[y];
    this[y] = temp;
}


Array.prototype.bubbleSort = function(){
    let length = this.length;
    let theSwitch = true;
    // continue until theSwitch off
    while (theSwitch) {
        theSwitch = false;
        for (let index = 0; index < length - 1; index++) {
            if(this[index]>this[index+1]){
                this.mySwap(index,index+1);
                theSwitch = true;
            }
        }
    }
    return this
}

console.log([1,3,7,-1,5,9,12,45,2,3,5].bubbleSort());

String.prototype.substring = function(){
    let result = [];
    let length = this.length;
    for (let index = 0; index < length; index++) {
        
        for (let jndex = index+1; jndex < length+1; jndex++) {
            result.push(this.slice(index,jndex));
        }
        
    }
    return result;
}

console.log("ac".substring())