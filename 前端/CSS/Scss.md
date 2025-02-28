# scss

____
与 sass 区别
- sass 只有缩进，没有花括号和分号
- 文件扩展名不同
- scss 是 sass 的第三代

css预处理器
- 概念：用一种专门的语言进行页面样式设计，然后在编译成正常的css文件，为css提供了新特性，无需考虑兼容问题

选择器嵌套
- 父类选择器 &
  - 调用后会扔掉父级区域
- 嵌套不要超过三层
- > font: {
  >  family
  > }
  >  等同于 font-family

变量定义 
- 以 $ 开头，后面跟变量名
- 先定义后使用

变量类型
- 数字
- 字符串
- 颜色
- 布尔值
- 空值: null
- 数组，用空格或逗号为分隔符
- maps，相当于js中的 object

定义域
- 局部变量
  - 在选择器类部定义的
- 全局变量
  - 定义在外面
  - 在局部变量中 加个 !global

@import
- sass 中拓展了 @import 的功能，被导入文件将合并编译到同一个 CSS 文件中，被导入文件中的变量或混合指令，都可以在导入文件中使用。
- 视为普通 css 语句的方式
  - 文件拓展名是 .css
  - 文件以 http:// 开头
  - 文件名是 url()
  - @import 包含 media queries（媒体查询）
- 下划线开头的名称不会被自动编译，效果和不加下换线的相同

Sass混合指令
- 用于定义可重复使用的样式，可以包含所有的css规则
- @mixin 定义，通过 @include 使用
- 与函数有部分类似

@extend 继承
- 告知 Sass 对选择器 A 的样式化正好存在与选择器 B 共通的地方
- 与混合模式的区别
  - 它是将共同部分统一声明
  - 混合模式是在每个选择器中都加入那部分

% 占位符
- 占位符选择器以 % 开头，可用于扩展其他选择器，而不会被编译成最终的css

运算符的使用
- @if @else 条件语句
  - 等号操作符 
    - == 
    - !=
  - 比较运行符
    - < (It)
    - \> (gT)
    - <= (ite)
    - \>= (gte)
  - 逻辑运算符
    - and 逻辑与
    - or 逻辑或
    - not 逻辑非
- 数字操作符
  - \+、\-、\*、/、%
  - 数字类型：纯数字、百分号、css部分单位
  - 除法运算符号
    - 若值或值的一部分，是变量或者函数的返回值
    - 若值被圆括号包裹
    - 日哦值是算数表达式的一部分
  - % 与单位不能一起运算
  - 纯数字与百分号或单位运算时会自动转化为相应的百分号和运算值
- 字符串运算
  - +: 引号在右边连接后没有引号

插值语句 #{}
- 选择器，属性名，属性值，注释

常见函数
- https://sass-lang.com/documentation/modules/

流程控制指令
- @if
- @for
> to 与 through 的区别
> through 包含边界值，to 不包含 end 值
> ```scss
> @for $i from 1 to 4 { 
>   .p#{$i} {
>     width: 10px * $i;
>     height: 30px;
>   }
> }
> ```
> ```scss
> @for $i from 1 through 4 { 
>   .p#{$i} {
>     width: 10px * $i;
>     height: 30px;
>   }
> }
> ```
- @each
> ```scss
> $color-list: red green blue turquoise;
> @each $color in $color-list {
>   $index: index($color-list, $color);
>  .p#{$index - 1} {
>     color: $color;
>   }
> }
> ```

- @while
- 与js中类似，但需要将条件重复赋值

@function 自定义函数
> ```scss
> @function function-name($param1, $param2...) {
>   @return $value;
> }
> ```
数组... css版展开

混入 mixin 和函数的区别
- 混入主要是通过传递参数的方式输出样式，为了实现代码的可复用
- 函数主要是通过传递参数，在函数内的计算，最后 @return 输出一个值

三元条件函数 if 的使用
> ```scss
> if(条件，true的结果，false的结果)；
> ```

@use
- 对 @import 的增强
- 与 @import 的区别
  - @use 不会重复引入一个文件，@import 会重复引入
  - @use 将引入的视为一个模块，默认文件名为模块名
  - 引入多个文件时，每个文件都是单独的模块，相同变量名不会覆盖，而 @import 变量会被覆盖
  - @use 通过 $- 或 $_ 来定义私有成员
  - @use 模块内变量可通过 !default 定义默认值，引入可通过 with() 方式修改：use 'url' with(变量)
  - 可定义 _index.scss 来合并多个scss文件

@forward
- 转发功能
- 转发过后能够使用模块里面的变量
- @forward 要在 @use 之前

@at-root
- 使被嵌套的选择器或属性跳出嵌套