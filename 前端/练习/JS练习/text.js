// function Super1(name) { // 2023-02-01 注意: 构造函数不能是箭头函数，因为箭头函数没有自己的this，所以不能作为构造函数，即不能new调用
//     this.name = name
//   }
// function Super2(age) {
//     this.age = age
// }
// Super1.prototype.sex = 'man'
  
// function Sub(name, age, address) {
//     Super1.call(this, name) // 通过call，绑定super1的this为子类实例，并执行Super1()，相当于 this.name = name
//     Super2.call(this, age) // 优点：可以多继承，同时继承了Super1和Super2中的属性，且在子类实例上修改属性相互不受影响
//     this.address = address // 缺点：不能继承父类实例原型链上的属性和方法
// }

// Sub.prototype = new Super1('zzz') 
// Sub.prototype.constructor = Sub

// const sub = new Sub('woow_wu7', 20, 'hangzhou') // 优点：可以向父类传参
// console.log(sub)
// console.log(sub.sex)

class Animal {
    constructor(name) {
        this.name = name
    } 
    getName() {
        return this.name
    }
}
class Dog extends Animal {
    constructor(name, age) {
        
        this.age = age
    }
}

new Dog()