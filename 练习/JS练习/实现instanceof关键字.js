{
    // instanceof 检测对象是否在其原型链原型构造函数的 prototype 上有继承关系
    function instanceOf(left, right) {
        if (typeof right !== 'function') {
            throw new TypeError('Right-hand side of `instanceof` is not callable');
        }

        let leftProto = Object.getPrototypeOf(left)

        while(true) {
            if (leftProto === null) {
                return false
            }
            if (leftProto === right.prototype) {
                return true
            }
            leftProto = Object.getPrototypeOf(leftProto)

        }
    }


    function Person(name) {
        this.name = name;
    }
     
    const alice = new Person('Alice');
     
    console.log(instanceOf(alice, Person)); // 输出: true
    console.log(instanceOf(alice, Object)); // 输出: true
    console.log(instanceOf(alice, Array));  // 输出: false
    console.log(instanceOf({}, Object));    // 输出: true
    console.log(instanceOf([], Array));     // 输出: true


}