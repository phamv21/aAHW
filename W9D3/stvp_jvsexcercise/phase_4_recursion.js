function range(start,end) {
    if(start === end){
        return [start];
    }
    return range(start, end-1).concat(end)
    
}

console.log(range(1,5));

function sumRec(arr) {
    if(arr.length === 1){
        return arr[0]
    }
    let start = arr[0];
    let end = arr.slice(1);
    return start + sumRec(end) 
}

console.log(sumRec([1,2,8]));


function exponent1(base,exp) {
    if(exp === 0){
        return 1;
    }
    return base*exponent1(base,exp-1);
}

function exponent2(base,exp){
    if(exp === 0){
        return 1;
    }
    if (exp===1){
        return base;
    }
    if(exp%2 === 0 ){
        return exponent2(base,exp/2)**2
    }else{
        return base*(exponent2(base,(exp-1)/2)**2)
    }

}

console.log(exponent1(2,10));
console.log(exponent2(2,10));

function fibonacci(n) {
    if(n===1){
        return [1];
    }
    if(n===2){
        return [1,1];
    }
    let oldArr = fibonacci(n-1);
    let l = oldArr.length;
    let nNum = oldArr[l-1]+oldArr[l-2];
    return oldArr.concat(nNum);
}

console.log(fibonacci(10));

function deepDup(arr) {
    if(arr.length === 0){
        return []
    }
    if(arr.length === 1 && !(arr[0] instanceof Array )){
        return arr.slice()
    }
    if (arr.length === 1 && (arr[0] instanceof Array)){
        return [deepDup(arr[0])];
    }
    //first part many number
    let p1 = arr.slice(0,-1);
    //last part
    let p2 = arr.slice(-1);
    return deepDup(p1).concat(deepDup(p2))

}

// let arr1 = [1,[2,3],[4],[[5,6]]];
// // let arr1 = [1, [2], [3, [4, 5[6]]]];
//  let arr2 = deepDup(arr1);
//  let arr3 = arr1.slice();
// arr1[1].push(3)
// console.log(arr2); 
// console.log(arr1);
// console.log(arr3);
// console.log(arr1[1]===arr2[1]);


//merge sort 
//helper method - merged 2 shordted array to a sorted array
function mergeSorted(arr1,arr2) {
    let result = [];
    while (arr1.length >0 || arr2.length > 0) {
        if (arr1[0] < arr2[0]) {
            if (arr1.length == 0) { result.push(arr2.shift());}
            else{result.push(arr1.shift());}

        }else{
            if (arr2.length == 0) { result.push(arr1.shift()); }
            else{result.push(arr2.shift());}
        }
    }
    return result;
}
//use helper method to sort the big array
function mergeSort(arr) {
    if(arr.length < 2){
        return arr;
    }
    let middle = Math.ceil((arr.length)/2);
    let arr1 = arr.slice(0,middle);
    let arr2 = arr.slice(middle);
    return mergeSorted(mergeSort(arr1),mergeSort(arr2));

}

function randArr(num) {
    let result = []
    for (let index = 0; index < num; index++) {
        result.push(Math.ceil(Math.random()*num))
    }
    return result
}

let arr1000 = randArr(10);
console.log(mergeSort(arr1000))


//helper method for subSet
function helperSubSet(arr1,arr2){
    let arrBig = arr2.map((el)=>el.concat(arr1));
    return [arr1].concat(arr2).concat(arrBig)
}


function subSet(arr) {
    if(arr.length < 2){
        return [arr];
    }
    let arrFirst = arr.slice(0,1);
    let arrLast = arr.slice(1);
    return helperSubSet(arrFirst,subSet(arrLast));

}

console.log(subSet(['a','p','l','e']));



