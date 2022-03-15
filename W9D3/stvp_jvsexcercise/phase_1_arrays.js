// function Array(value){
//     this.value = value
// }

Array.prototype.uniq = function(){
    
    // this is an array
    let result = [];
    this.forEach((el)=>{
        if(!result.find(ele => ele === el)){
            result.push(el);
        }
    })
    //return result
    return result

}

console.log([1,2,2,3,3,4,4,4,1,5].uniq())
// twoSum
Array.prototype.twoSum = function(){
    //indexies of pair that sum to zero
    let result = [];

    for (let index = 0; index < this.length; index++) {
        const element = this[index];
        const pairIdx = this.findIndex((num)=> (num+element)===0)
        if(pairIdx > index){
            result.push([index,pairIdx])
        }
    }
    return result
}

console.log([1, -1, 2, 3, -2, 4, 5, 6, -4, 8].twoSum())

// transpose
Array.prototype.transpose = function(){
    let newArr = [];
    let length = this.length;
    for (let row = 0; row < length; row++) {
        newArr.push([]);
    }

    for (let row = 0; row < length; row++) {
        for (let col = 0; col < length; col++) {
            newArr[col][row] = this[row][col];         
        }    
    }

    return newArr;

}

console.log([[1,2,3,8],[4,5,6,8],[7,8,9,8],[2,3,7,8]].transpose())