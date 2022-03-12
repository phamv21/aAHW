var fizzBuzz = function(array){
    // 3 or 5 not both
    let result = [];
    array.forEach((el) => {
        if((el%3===0 || el%5===0) && el%15!==0 ){
            result.push(el);
        }
})
return result;
}

console.log(fizzBuzz([1,2,3,4,5,10,6,7,68,7,87,30,12,15]))