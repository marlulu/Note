// 知识点：原型，继承

// 原型链继承
function Animal() {
    this.colors = ['black', 'white']
}

Animal.prototype.getColor = function() {
    return this.colors
}

function Dog() {}
Dog.prototype =  new Animal()


// 组合继承
// 寄生式组合继承
