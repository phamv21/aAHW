function test(x) {
    let args =[];
    function loopStep(num) {
       if(num !== undefined){args.push(num)}
       if(args.length === 2) {
           console.log(args)
           args = []
       }
       return loopStep;
    }
return loopStep();

}
let t = test();
t = t(1);
t = t(2);
t = t(3);
t = t(4);
