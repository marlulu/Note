# Promise

------

## Promise�ĺ���

����˵��һ�����������ڱ���ĳ��δ���Ż�������¼��Ľ����ͨ����һ���첽������

promise����������ص�
+ ����������Ӱ�졣promise����������״̬��**pending**�������У���**fulfilled**���ѳɹ�����**rejected**����ʧ�ܣ���
+ һ��״̬�ı䣬�Ͳ����ڸı䣬�κ�ʱ���ܻ�ȡ��������״̬��Ϊfulfilled��rejected��״̬�������ˣ���ʱ�ͳ�Ϊresolved���Ѷ��ͣ�

ȱ�㣺
1. �޷�ȡ�� Promise��һ���½����ͻ�����ִ�У��޷���;ȡ����
2. Promise �ڲ��Ĵ��󲻻�Ӱ�쵽 Promise �ⲿ�Ĵ��롣����Ҫ���ûص���������֪������
3. �޷���֪ pending ״̬����֪���Ǹոտ�ʼ���Ǽ���������

> PS�����ĳЩ�¼����ϵط���������һ����˵��ʹ�� Stream (opens new window)ģʽ�ǱȲ��� Promise ���õ�ѡ��

Promise ���Ĺ۵��� **�첽��ʽ����**

�����÷�
```js
const promise = new Promise(function(resolve, reject) {
  // ... some code

  if (/* �첽�����ɹ� */){
    resolve(value);
  } else {
    reject(error);
  }
});
```
**resolve** �����������ǣ���Promise�����״̬�ӡ�δ��ɡ���Ϊ���ɹ��������� pending ��Ϊ fulfilled(resolved)�������첽�����ɹ�ʱ���ã������첽�����Ľ������Ϊ�������ݳ�ȥ��

**reject** �����������ǣ���Promise�����״̬�ӡ�δ��ɡ���Ϊ��ʧ�ܡ������� pending ��Ϊ rejected�������첽����ʧ��ʱ���ã������첽���������Ĵ�����Ϊ�������ݳ�ȥ��

**promise.then()**
> ����������Ϊ Promise ʵ�����״̬�ı�ʱ�Ļص�����������ö���״̬��Ϊresolved(resolvedͳһָֻfulfilled״̬)��������then()����ָ���Ļص�������

**promise.catch()**
> Promise.prototype.catch()������.then(null, rejection)��.then(undefined, rejection)�ı���������ָ����������ʱ�Ļص�������
����첽�����׳�����״̬�ͻ��Ϊrejected���ͻ����catch()����ָ���Ļص������������������

**promise.finally()**
> finally()��������ָ������ Promise �������״̬��Σ�����ִ�еĲ������÷����� ES2018 �����׼�ģ�ʹ�ó��������ܳɹ�����ʧ�ܣ�����Ҫִ�еĴ��루loading�رգ�

**����**
```text
promise
.then(result => {������})
.catch(error => {������})
.finally(() => {������});
```

## Promise��̬����

+ Promise.all(iterator)�������Promiseʵ������װ��һ���µ� Promise ʵ�������гɹ��˲ųɹ���ʧ���˷��ص�һ��ʧ�ܵġ�����������catch�������򲻻����Promise.all�е�catch�����������then�������лص���
+ Promise.race(iterator)����һ��ʵ���ȸı�״̬���Ǹ����ȸı�״̬�� Promise ʵ���ķ���ֵ�ͻᴫ�ݸ��ص�������
+ Promise.allSettled(iterable)��������Promiseʵ����״̬���ı��ˣ��Ż������״ֻ̬���ܱ��fulfilled��
+ Promise.any(iterable)����һ���ɹ��ͷ��ص�һ���ɹ��ģ�ֻ������ʧ�ܲŻ᷵��ʧ�ܡ�
+ Promise.resolve(value)�������еĶ���ת���� Promise ����
    >4�����
    > + ������һ�� Promise ʵ�������䡣
    > + ������һ��thenable���󣺽�thenable����ת��Ϊ Promise ����Ȼ������ִ�� thenable �����then()������
    > + �������Ǿ���then()�����Ķ��󣬻�����Ͳ��Ƕ��󣺷���һ���µ� Promise ����״̬Ϊ resolved��
    > + �������κβ�����ֱ�ӷ���һ��״̬Ϊ resolved ����
    >> ��Ҫע����ǣ�����resolve()�� Promise �������ڱ��֡��¼�ѭ������event loop���Ľ���ʱִ�У�����������һ�֡��¼�ѭ�����Ŀ�ʼʱ��
```js
// ����
setTimeout(function () {
    console.log('three');
    }, 0);
    
Promise.resolve().then(function () {
console.log('two');
});

console.log('one');

// one
// two
// three
```
��������У�setTimeout(fn, 0)����һ�֡��¼�ѭ������ʼʱִ�У�Promise.resolve()�ڱ��֡��¼�ѭ��������ʱִ�У�console.log('one')��������ִ�У�������������

+ Promise.reject(reason)������һ���µ� Promise ʵ������ʵ����״̬Ϊrejected��
+ Promise.try()����ͬ������ͬ��ִ�У��첽�����첽ִ�С�Promise.try����ģ��try����顣
```text
Promise.try(() => database.users.get({id: userId}))
  .then(...)
  .catch(...)
```

## Promise/A+ �淶
<img src="D:/�ļ�-ǰ��/Note/JS����/�첽����/ͼƬ/img2.png">