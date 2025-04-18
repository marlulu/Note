# CSS 层叠样式表
___

1. @规则
   - @namespace 告诉CSS引擎必须考虑XML命名空间
   - @media 根据设备的不同特性来应用不同的样式，使网页适应不同设备
   - @page 描述打印文档时的布局变化
   - @font-face 描述将下载的外部字体
   - @keyframes 描述 CSS动画的关键帧
   - @document 如果文档样式表满足给定条件则条件规则组里的规则生效
   - @charset 定义样式表使用的字符集
   - @import 告诉CSS引擎引入一个外部样式表
   - @supports 用于查询特定的CSS是否生效

2. 层叠上下文
   - 屏幕到眼睛方向的Z轴，各HTML元素根据自己定义的属性的优先级在Z轴干一定顺序排开
   - 层叠水平：同一层叠上下文中元素在Z轴上的显示顺序
   - 产生条件
     - html 根元素
     - 声明 position：absolute/relative 且 z-index 值不为 auto 的元素
     - 声明 position：fixed/sticky 的元素
     - flex 容器的子元素，且 z-index 值不为 auto
     - grid 容器的子元素，且 z-index 值不为 auto
     - opacity 属性小于 1 的元素
     - mix-blend-mode 属性值不为 normal 的元素
       - 用于控制一个元素与它下面元素之间的混合模式
     - 以下任意属性值不为 none
       - transform
       - filter
       - perspective
       - clip-path
       - mask / mask-image / mask-border
     - isolation 属性值为 isolate的元素
       - 用于控制元素是否创建一个新合成层，以及如何处理元素与其周围元素的混合模式
     - -webkit-overflow-scrolling 属性值为 touch 的元素
       - -webkit-overflow-scrolling 用于控制滚动容器在移动设备（尤其是 iOS 设备）上的滚动行为的 CSS 属性
     - will-change 属性任意值
     - contain 值为 layout、paint、strict、content
   
   - 层叠优先级（越往下越高级）
     - 层叠上下文的 border 和 background
     - z-index < 0 的子节点
     - 标准流内块级的非定位子节点
     - 浮动非定位的子节点
     - 标准流内行内非定位的子节点
     - z-index auto/0 的子节点
     - z-index > 0的子节点

3. 选择器
   - 基础选择器
     - 标签选择器：h1
     - 类选择器：.class
     - ID选择器: #class
     - 通配选择器: *
     
   - 属性选择器
     - [attr]：指定属性的元素
     - [attr = val]：属性等于指定值的元素
     - [attr *= val]：属性包含指定值的元素
     - [attr ^= val]：属性指定值开头的元素
     - [attr $= val]：属性已制定值结尾的元素
     - [attr ~= val]：属性包含指定值（完整单词）元素
     - [attr |= val]：属性以指定值（完整元素）开头的元素
     
   - 组合选择器
     - 相邻兄弟选择器：A + B （A后面的 B的样式，必须紧挨着，中间不能有隔的元素）
     - 普通兄弟选择器：A ~ B （A后面的所有 B）
     - 子选择器：A > B （只选择后代，不间接选择后代）
     - 后代选择器：A B （A 后面所有的 B）
     
   - 伪类：用于选择处于特定状态的元素
     - 条件伪类
       - :lang(): 基于元素语言来匹配元素，常用国际化
       - :dir(): 匹配特定文字书写方向的元素，ltr（从左到右），rtl（从右到左）
       - :has(): 匹配包含指定元素的元素，（元素）
       - :is(): 匹配指定选择器列表里的元素，（可包含多个选择器）
       - :not(): 匹配不符合一组选择器的元素，排除

     - 行为伪类
       - :hover 鼠标悬停在元素上的状态
       - :active 鼠标点击元素的状态
       
     - 状态伪类
       - :target 匹配当前URL中锚点（即URL中#号后面的部分）所指向的元素
       - :focus 当获取元素焦点时
       - :visited 用于选择已经被用户访问过的链接
       - :link 用于选择未被访问过的链接
       - :required：输入必填的表单元素
       - :valid：输入合法的表单元素（仅适用于那些具有验证规则的表单元素）
       - :invalid：输入非法的表单元素（适用同上）
       - :in-range：输入范围以内的表单元素
       - :checked 用于选择被用户选中的表单元素，如单选按钮、复选框等
       - :disabled 用于选择被禁用的表单元素
       - :enabled：事件启用的表单元素；
       - :read-only：只读的表单元素；
       - :read-write：可读可写的表单元素
       - :blank：输入为空的表单元素
       - :in-range：输入范围以内的表单元素（由 min 和 max 属性所定义的指定范围内的表单元素）
       - :out-of-range：输入范围以外的表单元素（同上）
       
     - 结构伪类
       - :root：文档的根元素，定义全局变量
       - :first-letter：块级元素的文本内容的首字母
       - :first-line：块级元素的文本内容的首行
       - :first-child：元素中为首的元素，必须是相同元素
       - :last-child：元素中为尾的元素
       - :only-child: 唯一子元素的元素
       - :nth-child(n)：元素在其父元素下的位置，顺序
         - 整数：直接选择第几个子元素
         - 关键字：even（偶数），odd（奇数）
         - 公式：an + b：an表示步长，正数an表示正序，负数an表示倒数
       - :nth-last-child(n)：元素中指定逆序索引的元素
         - 同上，但为倒序
       - :nth-of-type(n)：标签中指定顺序索引的标签，基于元素类型，而非元素在父元素下的整体位置
       - :nth-last-of-type(n)：标签中指定逆序索引的标签
       - :first-of-type ：标签中第一次出现的标签；必须是相同元素
       - :last-of-type：标签中为尾标签；
       - :only-of-type：父元素仅有该标签的标签；
         
     - 伪元素：用于选择页面上的特定部分并对其应用样式。它们不是真实存在的DOM元素，而是由CSS创建和管理的虚拟元素。
       - ::before 在选中元素的内容之前插入虚拟元素
       - ::after 在选中元素的内容之后插入虚拟元素
       - ::selection: 定义用户选中（高亮）文本时的样式
       - ::first-letter：选中元素的第一个字母，并对其进行样式化。这通常用于实现首字母下沉等效果。
       - ::first-line：选中元素的第一行文本，并对其进行样式化。
       
     - link: 链接平常的状态
     - visited: 链接被访问过之后
     - hover: 鼠标放到链接上的时候
     - active: 链接被按下的时候
   
4. 优先级
   - 10000：!important
   - 01000：内联样式
   - 00100：ID选择器
   - 00010：类选择器，伪类选择器，属性选择器
   - 00001：标签选择器，伪元素选择器
   - 00000：通配选择器，后代选择器，兄弟选择器

5. 继承性
   - 子元素会继承父元素对应属性计算后的值，不会影响页面布局的属性

6. 文档流
   - 块级元素默认会占满整行，所以多个块级盒子之间是从上到下排列的；
   - 内联元素默认会在一行里一列一列的排布，当一行放不下的时候，会自动切换到下一行继续按照列排布
   - 如何脱离文档流
     - 在正常文档流中的其他节点将忽略该节点并填补其原先空间
     - 方法：浮动（float）和定位（absolute，fixed）
       - 浮动：将盒子从普通流中单独拎出来，将其放到外层盒子的某一边
       - 绝对定位：按照绝对坐标进行定位

7. 盒模型
   - 标准盒模型：计算盒子尺寸 content-box
      - 盒子的实际尺寸 = 内容（设置的宽/高） + 内边距 + 边框
   - IE 盒模型：计算盒子尺寸 border-box
      - 盒子的实际尺寸 = 设置的宽/高 = 内容 + 内边距 + 边框
   
   - 视觉格式化模型：计算盒子位置
     - 定义：规定这些盒子应该怎么样放置到页面中去
     - 可替换/非替换元素
       - 可替换：它们的内容不受当前文档的样式的影响。CSS 可以影响可替换元素的位置，但不会影响到可替换元素自身的内容
       - 典型的有 < iframe > < video > < embed > < img >
       
     - 包含块
       - 包含块决定元素尺寸、位置基准及包含关系。
       - 根元素所在的包含块为初始包含块
       - 若元素的position：relative/static，包含块为最近的块级盒子或者建立格式上下文的祖先元素
       - 若元素的position：fixed，连续媒体，包含块为视口。多页媒体，包含块为页面区域。
       - 若元素的position：absolute，包含块为具有position：absolute/relative/fixed的最近祖先元素建立。
       - 如果没有上述的父元素，则包含块为初始包含块
       
     - 生成盒：过程
       - 块级元素块级盒
         - 一般一个块级元素产生一个块级盒，称为主块级盒，主块级盒用来包含后代盒及其内容
         - 块级元素：
           - display：block、list-item、table、flex 或 grid
           - 视觉上呈现为块，一个一行，竖直排列
         
         - 块级盒（块级元素产生）
           - 用于描述它与父元素的兄弟元素之间的表现
           - 参与BFC
           - 有些块级元素除了产生主块级盒，也可能产生额外的盒，如 < li > 生成额外的盒放置项目符号
           - 主块级盒是可以使用定位方案(position scheme)的盒
           - 主要块级盒将包含后代元素生成的盒以及生成的内容
         
         - 块容器盒
           - 除了表格盒和可替换元素盒外，一个块级盒也可以是一个块容器盒
           - 功能（二选一）
             - 只能用来包含其他块级盒
             - 创建一个行内格式化上下文（IFC），行内格式化上下文只用来包含行内级盒
             
         - 块级盒盒块级元素的关系
           - 大部分块级盒都是块容器盒，同时为这两种的称为**块盒**
           - 有些块级盒,比如表格,可替换元素不是块容器盒.相反,一些块容器盒.比如非替换行内块及非替换表格单元格,不是块级盒
           - 块级盒指的是对外表现形式。块容器盒是对内表现形式
           
         - 行内元素和行内盒
           - 行内级元素产生行内级盒，行内级盒参与行内格式化上下文
             - 行内级元素
               - display：inline / inline-table / inline-block 的元素是行内级元素
               
             - 行内级盒
               - 行内级元素生成行内级盒
               - 参与行内格式化上下文（IFC）
               - 行内级盒分为 行内盒 和 原子行内级盒
               
             - 行内盒
               - 参与生成行内格式化上下文的行内级盒
               - 所有 display：inline 的非替换元素生成的盒是行内盒
               
             - 原子行内级盒
               - 不参与行内格式化上下文创建的行内级盒子（渲染时具有独立的布局和渲染规则，不需要不适合）
               - 可替换行内元素，或 display：inline-block / inline-table 的元素生成，不能拆分成多个盒
             
         - 匿名盒子
           - 匿名盒子会从父元素继承可继承属性，其他属性保持默认值 initial。
           - 块匿名盒子
             - 直接为包含在块盒子中的文本创建一个行内格式化上下文
           - 行内匿名盒子
             - 一个行内盒子中包含一或多个块盒子时，会将行内盒子拆分为两个或多个部分，行内盒子同时会被一个匿名块级盒子包含
             
8. 格式上下文
   - BFC（块级格式上下文）
     - 是一个独立的渲染区域，只有块级盒子参加
     - 创建
       - 根元素（< html >）
       - overflow 不为 visible 的块元素
       - 浮动元素
       - 绝对定位元素
       - display： inline-block / table-cell / table-caption / flex / inline-flex / grid / inline-grid / flow-root(最佳，无副作用)
     - 特征
       - BFC内部的块级盒会在垂直方向上一个接一个排列。（普通流）
       - 计算 BFC 的高度时，浮动子元素也参与计算
       - 属于同一BFC的两个相邻box的 margin 会发生重叠
     - 作用
       - 阻止元素被浮动元素覆盖：设置元素触发BFC
       - 阻止因为浏览器因为四舍五入造成的多列布局换行的情况：百分比width，在最后一行触发BFC阻止换行
       - 阻止相邻元素的margin合并：让两个元素不在同一个BFC（后一个在外面套一层，形成新的BFC）
       - 清除内部浮动：计算 BFC 的高度时，浮动元素也参与计算。只要触发父元素的 BFC 即可。
  
   - IFC（行内格式上下文）
     - 块级元素中仅包含内联级别元素
     - 渲染规则
       - 节点无法声明宽高，其中 margin 和 padding 在水平方向有效在垂直方向无效
       - 节点在垂直方向上以不同形式对齐
       - 能把在一行上的框都完全包含进去的一个矩形区域，被称为该行的线盒（line box）。行框的宽度是由包含块（containing box）和与其中的浮动来决定
       - 当内联级盒子的总宽度少于包含它们的 line box 时，其水平渲染规则由 text-align 属性值来决定
       - 当一个内联盒子超过父元素的宽度时，它会被分割成多盒子，这些盒子分布在多个 line box 中。如果子元素未设置强制换行的情况下，inline box 将不可被分割，将会溢出父元素。
      
   - FFC（弹性格式化下文）
     - 当 display：flex / inline-flex
  
   - GFC（格栅格式上下文）
     - 当 display：grid / inline-grid
    
9. 块级元素
   - 特点
     1. 一般独占一行
     2. 宽度自动填满为父元素的100%
     3. 可以设置 height，width
     4. 可以设置 margin，padding
     5. 可以包含行内元素和其他块级元素
     6. 一个 block 元素通常被叫做块级元素 display: block;
     7. 当元素的 display 为 block、list-item 或 table 时，它就是块级元素

   - 常见的
     - div
     - p
     - h1 - h6
     - table
     - ol（有序）
     - ul（无序）
     - form
     - hr
     - header
     - article 文章内容
     - aside 伴随内容
     - footer 页尾

10. 行内元素
    - 特点
      - 一般，行内元素只能包含数据和其他行内元素，相邻的行内元素在一行上，但是中间会有空白的间隙，一般用 font-size：0 解决空白间隙。
      - 行内元素设置 width，height 属性无效
      - 水平方向上的 padding 和 margin 可以设置，垂直方向上的无效
      - 一个 inline 元素通常被叫做行内元素 display: inline;
      - 当元素的 display 为 inline、inline-block 或 inline-table 时，它就是行内级元素
      
    - 常见的
      - a
      - b
      - strong
      - span
      - label
      - input
      - textarea
      - select
      - button
      - img
      - abbr 缩写元素

11. display 属性
    - 外部显示类型（定义元素如何参与流式布局）：inline，block
    - 内部显示类型（定义元素内子元素的布局）：table，flex，grid

12. 单位
    - px：像素点
    - em：相对长度
      - font-size使用，相对的是父元素的font-size
      - 其他的事相对于font-size
    - rem：相对长度，相对的是根元素HTML的 font-size
    - vw/vh：相对于屏幕视口宽度和高度
      - 1vw = 视口宽度均分成 100 份中 1 份的长度；
      - 1vh = 视口高度均分成 100 份中 1 份的长度；
      - vmin：取 vw 和 vh 中值较小的；
      - vmax：取 vw 和 vh 中值较大的；
    
13. 颜色
    - VGA（16个基础颜色）
    - transparent 关键字：表示一个完全透明的颜色
    - currentColor 关键字：会取当前元素继承父级元素的文本颜色值或声明的文本颜色值
    - RGB[A] 颜色
    - HSL[A] 颜色

14. position 属性
    - static: 表示元素根据正常的文档流进行定位，使用left，top这些没用。
    - relative: 表示元素相对于其原始位置进行定位。
    - absolute: 定位使元素脱离文档流，元素的位置将相对于最近的已定位祖先元素进行定位。
    - fixed: 定位使元素脱离文档流，元素相对于浏览器窗口固定定位，不随页面滚动而移动。
    - sticky: 结合了 relative 和 fixed 定位的特性，元素在滚动到特定位置时会变为固定定位，直到滚动回其原始位置。
    - 区别：absolute，fixed 会脱离文档流，其他的不会

15. css sprite
  - background-color

16. 继承就是指子节点默认使用父节点的样式属性。  
可以继承的属性很少，只有颜色，文字，字体间距行高对齐方式，和列表的样式可以继承。
> 所有元素可继承：visibility、cursor。   
内联元素可继承：letter-spacing、word-spacing、white-space、line-height、color、font、font-family、font-size、font-style、font-variant、font-weight、text-decoration、text-transform、direction。   
终端块状元素可继承：text-indent、text-align。   
列表元素可继承：list-style、list-style-type、list-style-position、list-style-image。 


17. 回流/重排（reflow）和重绘（repaint）
- 重排：是指当DOM元素的几何属性发生变化时，浏览器需要重新计算元素的几何属性，并重新构建渲染树的过程。
  - 几何元素：宽度，高度、内外边距、边框宽度、位置等。
  - 浏览器需要重新计算元素的新位置和大小，并重新绘制部分或全部页面
  - 比较耗时，会涉及重新计算布局和渲染树。
- 重绘：是指当元素的外观发生变化，如颜色、背景、边框颜色等，但不影响其几何属性时，浏览器需要重新绘制元素的过程。
  - 重绘不会改变元素的布局或位置，只是简单地更新元素的外观
  - 虽然重绘比重排要快，但频繁的重绘仍然会对性能产生影响
- 优化建议
  - 减少DOM操作?：尽量减少对DOM元素的直接操作，因为每次操作都可能触发重排或重绘。
  - 使用CSS类?：通过修改CSS类来更新元素的样式，而不是直接修改元素的style属性。这可以减少重绘的次数。
  - ?避免频繁读取DOM属性?：频繁读取DOM属性会导致浏览器进行多次重排或重绘。如果需要多次读取属性，可以将其存储在一个变量中，以减少对DOM的访问次数。
  - ?使用文档片段（DocumentFragment）?：在大量更新DOM时，可以使用文档片段来减少重排的次数。先将所有更新操作应用到文档片段上，然后再将文档片段一次性添加到DOM中。
  - 避免触发大规模重排?：在可能的情况下，避免触发大规模的重排操作，如一次性添加或删除大量元素。可以分批进行这些操作，以减少对性能的影响。

18. 伪类和伪元素的区别
    - 伪类是为了弥补css选择器的不足
    - 伪元素是创建了一个有内容的虚拟容器
    - 可以同时使用多个伪类，但只能同时使用一个伪元素
    - 二者的根本区别：是否创造了新的元素
    - 因为伪类是类似于添加类所以可以是多个，而伪元素在一个选择器中只能出现一次，并且只能出现在末尾 
     
19. border:0 和 border:none 的区别
    - border:0，浏览器对border-width、border-color进行渲染，占用内存。
    - border:none，浏览器不进行渲染，不占用内存。  
     
20. text-shadow 属性中的四个值 (length、length、length、color) 分别是什么意义
    - 阴影离开文字大的横方向距离，阴影离开文字的纵方向距离，阴影的模糊半径，阴影的颜色

21. offest 和 client
  - offest：偏移量，只读，不能修改，没有单位（width + padding + border）
  - offestParent：有定位的父级元素
  - offestTop：元素相对定位父级元素的上方偏移
  - offestLeft：元素相对定位父级元素的左边偏移
  - offestHeight：返回自身带有 padding，边框，内容的高度
  - offestWidth：返回自身带有 padding，边框，内容的宽度

  - client：元素可视区的信息（width + padding，不包括垂直滚动条）
  - clientTop：元素上边框的大小
  - clientLeft：元素左边框的大小
  - clientHeight：返回自身带有 padding，内容的高度，无边框
  - clientWidth：返回自身带有 padding，内容的宽度，无边框

  - scroll：动态得到元素的大小、滚动距离
  - scrollTop：被卷上去的上侧距离
  - scrollLeft：被卷去的左侧距离
  - scrollHeight：返回自身的实际宽度，不包含边框
  - scrollWidth：返回自身的实际高度，不包含边框

22. 当两个CSS文件中存在相同选择器的规则时,后加载的CSS文件中的规则会与先加载的规则进行合并。这里的合并指的是相同属性会覆盖,不同属性会叠加。

23. css 百分比参照问题
  - 参照父元素宽度元素：padding，margin，width，text-indent
  - 参照父元素高度元素：height
  - 参照父元素属性：font-size，line-height
  - 特殊：相对定位的时候，top这类参照的是父元素的内容区域的高度与宽度，而绝对定位的时候参照的是最近的定位元素包含padding的高度与宽度 