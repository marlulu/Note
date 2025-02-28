# Reflect

-----

Reflect ����һ����������������ǲ��ɹ���ġ�

**��Ҫ��**
+ Ĭ����Ϊ��һ���ԣ�Reflect �����ṩ�������� Proxy traps ��Ӧ�ķ�����ʹ���ڽ��ж������ʱ�����Ա���һ�µı��ģʽ���Ҵ���Ŀɶ��ԺͿ�ά���Ը�ǿ��
+ ���õĴ�����Reflect ��������һ������ֵ������������ָʾ�����Ƿ�ɹ�����ʹ�ô��������ֱ�ۡ�
+ ����ʽ��̷��Reflect ��������Ŀ�������Ϊ��һ�����������������Ժ���ʽ��̷������������
+ �����ߣ�receiver��������Reflect ����ͨ������һ�������߲��������������ڵ��÷���ʱ��ȷָ�� this ��ֵ������ʵ�ֻ���ԭ�͵ļ̳к��Զ��� this ��ʱ�ǳ����á�

**���ݰ󶨺͹۲���ģʽ**
```js
const handler = {
  set(target, prop, value) {
    console.log(`���� ${prop} ������Ϊ ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const data = new Proxy({}, handler);

data.name = 'С��';
```

**��չ������**
```js
const original = {
  greet() {
    console.log('Hello!');
  }
};

const handler = {
  apply(target, thisArg, argumentsList) {
    console.log(`�����˷�����${target.name}`);
    return Reflect.apply(target, thisArg, argumentsList);
  }
};

const proxy = new Proxy(original.greet, handler);

proxy(); // ����������˷�����greet��Hello!
```

