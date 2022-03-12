var madlib = (v,a,n) =>{
    let x = [v,a,n];
    x = x.map(el => el.toUpperCase());
    console.log(`We shall ${x[0]} the ${x[1]} ${x[2]}`)
}
console.log(madlib("make","the","best"))