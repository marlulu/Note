1. accent-color：表单元素的样式魔法
> 能将原生复选框和单选按钮的单调的灰色方块 / 圆点变成品牌主色调
```css
input[type="checkbox"] {  
    accent-color: hotpink;
}
```
2. caret-color：光标颜色随心定
> 在深色主题界面中，刺眼的黑色文本光标常常破坏整体美感。caret-color允许我们精确控制插入符颜色，让细节也能完美融入设计
```css
input {
    caret-color: limegreen;
}
```
3. currentColor：颜色继承的终极利器
> 能自动继承元素的字体颜色
```css
button {  
    color: #007bff;  
    border: 2px solid currentColor; // 无论后续如何修改color值，border颜色都会自动同步
}
```
4. ::marker：列表符号的定制革命
> 修改列表符号
```css
li::marker {  
    color: crimson;  
    font-size: 1.2rem;
}
```
5. :user-valid：更人性化的表单验证
> 仅在用户交互后才触发验证反馈
```css
input:user-valid {  
    border-color: green;
}
```
6. :placeholder-shown：捕捉输入框的「空状态」
> 可以精准识别输入框是否为空，轻松实现淡入淡出、占位符动画等创意交互
```css
input:placeholder-shown { 
     opacity: 0.5;
}
```
7. all: unset：组件样式的「一键清零」
> 彻底移除所有默认样式（包括继承属性）
```css
button {  
    all: unset;
}
```
8. inset：布局语法的终极简化
> 简化 top、right、bottom、left
```css
div {
    inset: 10px 20px;
    /*top: 10px; right: 20px; bottom: 10px; left: 20px;*/
}
```
9. text-wrap: balance：文本折行的「智能管家」
> 能自动均衡每行文本长度，让内容分布更优雅。
```css
h1 {
    text-wrap: balance;
}
```