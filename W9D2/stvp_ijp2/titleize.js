var titleize = function(array,printCallback) {
    let titleArr = array.map(el => "Mx. "+ el)
    titleArr.forEach(printCallback)
}
function logName(name){
    console.log(`${name} Jingleheimer Schmidt`)
}

titleize(["Pham","Mary","Leo"],logName)