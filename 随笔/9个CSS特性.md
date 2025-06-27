1. accent-color����Ԫ�ص���ʽħ��
> �ܽ�ԭ����ѡ��͵�ѡ��ť�ĵ����Ļ�ɫ���� / Բ����Ʒ����ɫ��
```css
input[type="checkbox"] {  
    accent-color: hotpink;
}
```
2. caret-color�������ɫ���Ķ�
> ����ɫ��������У����۵ĺ�ɫ�ı���곣���ƻ��������С�caret-color�������Ǿ�ȷ���Ʋ������ɫ����ϸ��Ҳ�������������
```css
input {
    caret-color: limegreen;
}
```
3. currentColor����ɫ�̳е��ռ�����
> ���Զ��̳�Ԫ�ص�������ɫ
```css
button {  
    color: #007bff;  
    border: 2px solid currentColor; // ���ۺ�������޸�colorֵ��border��ɫ�����Զ�ͬ��
}
```
4. ::marker���б���ŵĶ��Ƹ���
> �޸��б����
```css
li::marker {  
    color: crimson;  
    font-size: 1.2rem;
}
```
5. :user-valid�������Ի��ı���֤
> �����û�������Ŵ�����֤����
```css
input:user-valid {  
    border-color: green;
}
```
6. :placeholder-shown����׽�����ġ���״̬��
> ���Ծ�׼ʶ��������Ƿ�Ϊ�գ�����ʵ�ֵ��뵭����ռλ�������ȴ��⽻��
```css
input:placeholder-shown { 
     opacity: 0.5;
}
```
7. all: unset�������ʽ�ġ�һ�����㡹
> �����Ƴ�����Ĭ����ʽ�������̳����ԣ�
```css
button {  
    all: unset;
}
```
8. inset�������﷨���ռ���
> �� top��right��bottom��left
```css
div {
    inset: 10px 20px;
    /*top: 10px; right: 20px; bottom: 10px; left: 20px;*/
}
```
9. text-wrap: balance���ı����еġ����ܹܼҡ�
> ���Զ�����ÿ���ı����ȣ������ݷֲ������š�
```css
h1 {
    text-wrap: balance;
}
```