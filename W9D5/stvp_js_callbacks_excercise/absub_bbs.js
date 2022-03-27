const readline = require('readline');
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askIfGreaterThan(el1,el2,callback) {
    reader.question(`is ${el1} greater than ${el2}?`,function(rep){
        if(rep ==='yes'){callback(true)}
        else{callback(false)};
    })
}
function swapArrEl(arr,idx1,idx2){
    let temp = arr[idx1];
    arr[idx1] = arr[idx2];
    arr[idx2] = temp;
}

function arrayManualSort(arr,callback){
    let i = 0;
    let changed = false;
    let cap = arr.length - 1;
    function loopstep() {
        if(i===cap){
            callback(changed);
            return arr;
        }     
        //
        askIfGreaterThan(arr[i], arr[i + 1], function (ag) {
            if (ag) {
                swapArrEl(arr, i, i + 1);
                i++;
                changed = true;
                loopstep();
            } else {
                i++;
                loopstep();
            };
        })
        //    
    }
    loopstep();

}
// arrayManualSort([1,2,4,3,6,5]);



function absurdBubbleSort(arr,sortCompletionCallback) {
    let changed = true;
    function loopstep(){
        if(!changed){
            sortCompletionCallback(arr);
            reader.close();
            return;
        }
        changed = false;
        arrayManualSort(arr,function(arg){
            changed = arg;
            loopstep();
        })
       
    }
    loopstep();
}

absurdBubbleSort([3,2,1],function(arr){console.log(arr)});
// askIfGreaterThan(1,2,function(ag){console.log(ag)});