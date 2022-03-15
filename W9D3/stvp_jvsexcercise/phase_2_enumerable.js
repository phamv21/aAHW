Array.prototype.myEach = function(callback){
    for (let index = 0; index < this.length; index++) {
        const element = this[index];
        callback(element);
        
    }
}


// function logEl(el){
//     console.log(el);
// }

// [1,2,3,4,5].myEach(logEl);

Array.prototype.myMap = function(callback){
    let result = [];
    this.myEach((el)=>{
        result.push(callback(el));
    })
    return result;
}

// console.log([1,2,3].myMap(x => x*2));


Array.prototype.myReduce = function(callback,initialValue){
    let acc = 0;
    if(initialValue){acc = initialValue}

    this.myEach((el)=>{
        acc = callback(acc,el);
    })
    return acc;
}

console.log([1,2,3].myReduce(function (acc, el) {
    return acc + el;
},25));