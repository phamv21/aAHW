function Cat(name, owner) {
    this.name = name;
    this.owner = owner;
    
}

Cat.prototype.cuteStatement = function() {
    console.log(`${this.owner} loves ${this.name}`);
}

let cat1 = new Cat('black','Johny');
let cat2 = new Cat('white', 'Steve');
let cat3 = new Cat ('gray','Linda');
// cat1.cuteStatement();
// cat2.cuteStatement();
// cat3.cuteStatement();

Cat.prototype.meow = function(){
    console.log(`${this.name} Meowwwww`);
}
cat1.meow();
cat2.meow();

cat1.meow = () =>{
    console.log("MEO MEO MEO EMO EMoeMOEm");
}
cat1.meow();
cat2.meow();
