function mysteryScoping1() {
    let x = 'out of block';
    if (true) {
        let x = 'in block';
        console.log(x);
    }
    console.log(x);
}

console.log('fn1')
mysteryScoping1()


function mysteryScoping2() {
    const x = 'out of block';
    if (true) {
        const x = 'in block';
        console.log(x);
    }
    console.log(x);
}

console.log('fn2')
console.log(mysteryScoping2())

function mysteryScoping3() {
    const x = 'out of block';
    if (true) {
        const x = 'in block';
        console.log(x);
    }
    console.log(x);
}

console.log('fn3')
console.log(mysteryScoping3())

function mysteryScoping4() {
    let x = 'out of block';
    if (true) {
        let x = 'in block';
        console.log(x);
    }
    console.log(x);
}
console.log('fn4')
console.log(mysteryScoping4())


function mysteryScoping5() {
    let x = 'out of block';
    if (true) {
        let x = 'in block';
        console.log(x);
    }
    {let x = 'out of block again';
    console.log(x);}
}
console.log(mysteryScoping5())



