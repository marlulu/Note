{
    Object.create = function(proto, propertyObject = undefined) {
        if (typeof proto !== 'object' && typeof proto !== 'function') {
            throw new TypeError('Object prototype may only be an Object or null.')
        }
        if (propertyObject === null) {
            new TypeError('Cannot convert undefined or null to object')
        }

        function F() {}
        F.prototype = proto
        const obj = new F()
        if (propertyObject !== undefined) {
            Object.defineProperties(obj, propertyObject)
        }

        if (proto === null) {
            obj.__proto__ = null
        }

        return obj

    }

    const person = {
        isHuman: false,
        printIntroduction: function () {
          console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`);
        },
      };
      
      const me = Object.create(person);
      
      me.name = 'Matthew'; // "name" is a property set on "me", but not on "person"
      me.isHuman = true; // Inherited properties can be overwritten
      
      me.printIntroduction();
      // Expected output: "My name is Matthew. Am I human? true"

      o = Object.create({}, { p: { value: 42 } });
      console.log(o)
}