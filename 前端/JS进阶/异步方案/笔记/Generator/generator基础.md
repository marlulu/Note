# Generator

----

**���**
ES6���������������첽��̽�����������첽����ͬ��ִ�С��﷨�ϣ��������Ϊ��һ��״̬������װ�˶���ڲ�״̬��ͬʱҲ�Ǹ����������ɺ��������ر������󣬱���Generator��ÿһ��״̬��

������
+ function�ؼ����뺯����֮����һ���Ǻ�(*)
+ �������ڲ�ʹ��yield���ʽ�����岻ͬ���ڲ�״̬��

����Generator�����󣬺�������ִ�У����صĲ��Ǻ������н��������һ��ָ���ڲ�״̬��ָ�����Ҳ���Ǳ�������

Generator �����Ƿֶ�ִ�еģ�yield ���ʽ����ִͣ�еı�ǣ�next �������Իָ�ִ�С�

## yield ���ʽ
+ ֻ������ Generator �������棬���������ط��ᱨ��
+ yield���ʽ���������һ�����ʽ֮�У��������Բ�������档
+ ����ÿ���뵽yield����ִͣ�У��´��ִӸ�λ�ü������ִ�У��� return ���߱����书�ܣ�һ����������ֻ��ִ��һ��return��
## next
������ʾ��һ�� yield ���ʽ�ķ���ֵ��yield ������û�з���ֵ������undefined��

�ʴ������Ͻ�����һ�� next ���������������������󣬲��ô�������

**�����߼�**
+ ���� yield ���ʽ������ͣ��ִ�к���Ĳ��������� yield �����ֵ��λ���ض���value�Ĳ�����
+ ��һ�ε��� next ʱ����������ִ�У�ֱ��������һ�� yield��
+ ��û�������µ� yield���ͻ�һֱ���е�����������ֱ������ return���� return �����ֵ��λ���ض���value��ֵ��
+ ��û�� return�������ض��� value ��ֵΪ undefined��

## �� Iterator�Ĺ�ϵ
�������� Symbol.iterator ���������ڸö���ı��������ɺ��������øú����᷵�ظö����һ����������

Generator����һ�����������ɺ������� Symbol.iterator ���Ը�ֵ��ʹ������� iterator �ӿ�

## Generator ԭ���ϵķ���
### Generator.prototype.throw()
�ں��������׳�����Ȼ���� Generator �������ڲ���

throw�������ڲ������Ժ󣬻ḽ��ִ�е���һ��yield���ʽ����������µ�ͬ��ִ��һ��next������
### Generator.prototype.return()
Generator �������صı��������󣬻���һ��return()���������Է��ظ�����ֵ�������ս���� Generator ������


## next()��throw()��return() �Ĺ�ͬ��
������ Generator �����ָ�ִ�У�����ʹ�ò�ͬ������滻 yield ���ʽ��
+ next() �ǽ� yield ���ʽ�滻��һ��ֵ����� next ����û�в��������൱���滻�� undefined��
+ throw() �ǽ� yield ���ʽ�滻��һ�� throw ��䡣
+ return() �ǽ� yield ���ʽ�滻��һ�� return ��䡣


## yield*
������һ�� Generator ��������ִ����һ�� Generator ������

## ��˺ Generator
```js
function webCanteenGenerator(list) {
    let index = 0;
    let length = list.length;
    return {
        next: function() {
            let done = index >= length;
            let value = !done ? list[index++] : undefined;
            return {
                done: done,
                value: value
            }
        }
    }
}
```

## Generator ���Զ�ִ��
Generator �������Զ�ִ����Ҫһ�ֻ��ƣ������첽�������˽�����ܹ��Զ�����ִ��Ȩ��Generator �ſ����Զ�ִ�С�
```js
const fetch = require('node-fetch')

function* gen() {
    let r1 = yield fetch("https://api.github.com/users/github");
    let r2 = yield fetch("https://api.github.com/users/github/followers");
    let r3 = yield fetch("https://api.github.com/users/github/repos");
}

function run(gen) {
    let g = gen();
    
    function next(data) {
        let result = g.next(data);
        if (result.done) return;
        
        // ִ�� g.next()��yield ���ص���һ�� Promise ����
        // ����� Promise �������then ���������첽�����ɹ�ʱִ�� then �е� onFullfilled ������
        // onFullfilled ��������ȥִ�� g.next���Ӷ��� Generator ����ִ�У�Ȼ���ٷ���һ�� Promise��
        // ���ڳɹ�ʱִ�� g.next��Ȼ���ٷ��ء���
        
        result.value.then(function(data) {
            return data.json();
        }).then(function(data) {
            next(data)
        });
    }
    next();
}

// ִ�ж���첽����
run(gen)
```

## Thunk����
�������ŵ�һ����ʱ����֮�У��ٽ������ʱ�������뺯���塣�����ʱ�����ͽ��� Thunk ������
���ﻯ

## coģ��
���� Generator �������Զ�ִ�С�

**ԭ��**��
���ַ�������������һ�㡣
1. �ص����������첽������װ�� Thunk �������ڻص��������潻��ִ��Ȩ��
2. Promise ���󡣽��첽������װ�� Promise ������then��������ִ��Ȩ��

co ģ����ʵ���ǽ������Զ�ִ������Thunk ������ Promise ���󣩣���װ��һ��ģ�顣ʹ�� co ��ǰ�������ǣ�Generator ������yield������棬ֻ���� Thunk ������ Promise ����