var isPrime = (num) =>{
    if ( num < 2){return false}
    if (num === 2) { return true }
    let x = Math.ceil(Math.sqrt(num))
    for (let index = 2; index <= x; index++) {
        if(num%index===0){return false}
        
    }
    return true
}

// console.log(isPrime(1));
// console.log(isPrime(2));
// console.log(isPrime(3));
// console.log(isPrime(7));
// console.log(isPrime(17));
// console.log(isPrime(37));
// console.log(isPrime(47));
// console.log(isPrime(57));

var firstNPrimes = (num) =>{
    let result = [];
    for (let index = 2; result.length < num; index++) {
        if(isPrime(index)){
            result.push(index);
        }    
    }
    return result
}
console.log(firstNPrimes(30));

var sumOfNPrimes = (num) =>{
    let result = 0;
    let nums = firstNPrimes(num);

    nums.forEach((el)=>{
        result += el;
    })
    return result;
}

console.log(sumOfNPrimes(0));
console.log(sumOfNPrimes(4));