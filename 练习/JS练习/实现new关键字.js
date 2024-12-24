{
// new 修改函数的this绑定
// 将新对象的隐式原型(.__proto__)指向构造函数的显式原型
// 将构造函数的this指向修改为指向对象
function objectFactory(Constructor, ...args) {
    const obj = {}
    Object.setPrototypeOf(obj, Constructor.prototype)
    let res = Constructor.apply(obj, args)
    return res === 'object' ? res || obj : obj


}


function PersonFactory(name, age) {
    this.name = name
    this.age = age
}

const p1 = new PersonFactory('Steven',  '20')
console.log(p1) // PersonFactory { name: 'Steven', age: '20' }

const p2 = objectFactory(PersonFactory,  'Steven',  '20')
console.log(p2) // PersonFactory { name: 'Steven', age: '20' }


}