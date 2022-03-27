const { read } = require("fs");
const readline = require("readline");
const reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addNumbers(sum,numsLeft,completionCallback) {
    function loopstep(){
        if (numsLeft === 0) {
            completionCallback(sum);
            reader.close();
            return;
        }
        numsLeft-- ;
        // function addToSum(callback){
            reader.question("what is the number?",function(addedNumString){
                let addedNum = parseInt(addedNumString);
                sum+=addedNum;
                console.log(`${sum} - ${numsLeft} more numbers`);
                loopstep();
            })
        // }
    }
    loopstep();

}
addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));


