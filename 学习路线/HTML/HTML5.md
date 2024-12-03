## HTML5

---

1. 语义化
   - 用合理、正确的标签来展示内容，
   - 有助于提升网页的可访问性和搜索引擎优化 (SEO) 效果，让页面的内容结构化，结构更清晰，便于团队阅读，理解，维护和开发。
   - html5 新语义元素
     - article：内容
     - aside
     - figure：媒体内容
     - figcaption：figure中的说明
     - footer
     - header
     - main：文档主要的独立内容部分
     - mark：突出
     - nav：导航链接集合
     - section：划分文档部分
     - summary：details标签的标题
     - details：可折叠内容
     - time：时间

2. 表单：位于 form 中的
   - HTML5中 form 新增的
     - autocomplete 对应input中的 autocomplete
     - novalidate 规定在提交表单时不对表单数据进行验证
   - 常见表单元素
     - input
       - HTML5新增输入 type 类型
         - color
         - date
         - datetime
         - datetime-local
         - email
         - month
         - number
         - range：调节器
         - search
         - tel：电话
         - time：时间
         - url
         - week
       - HTML5 新增属性
         - autocomplete 规定表单或输入字段是否应该自动完成，on打开，off关闭
         - autofocus 规定当页面加载时 input 元素应该自动获得焦点
         - form 规定 input 元素所属的一个或多个表单
         - formaction 规定当提交表单时处理该输入控件的文件的 URL，覆盖form中的 action
         - formenctype 规定编码
         - formmethod 规定 HTTP 方法类型
         - formnovalidate 提交表单时不对 input 元素进行验证
         - formtarget 规定提交后何处响应，会覆盖form中的target
         - list 引用的 datalist 元素中包含了 input 元素的预定义选项
         - multiple 输入一个以上的值，适用 email 和 file
         - pattern 正则表达式
     - select
     - textarea
     - button
   - HTML5新增的表单元素
     - datalist
       - 为 input 元素规定预定义选项列表
       - 用户会在他们输入数据时看到预定义选项的下拉列表
       - input 元素的 list 属性必须引用 datalist 元素的 id 属性。
     ```html
     # 例子
     <form action="action_page.php">
        <input list="browsers">
        <datalist id="browsers">
           <option value="Internet Explorer">
           <option value="Firefox">
           <option value="Chrome">
           <option value="Opera">
           <option value="Safari">
        </datalist> 
     </form>
     ```
    
     - keygen：定义键对生成器字段（用于表单）
     - output：显示计算结果

3. 图形
   - Canvas（画布）
     - 绘画流程
       - 获取 canvas 元素
       - 创建 context 对象 cxt = canvas.getContext("2d") （内建的 HTML5 对象，拥有多种绘制路径、矩形、圆形、字符以及添加图像的方法）
   
   - SVG（可伸缩矢量图形）
     - 定义
       - 用于网络的基于矢量的图形
       - 使用 XML 格式定义图形
       - 图像在放大或改变尺寸的情况下其图形质量不会有损失
       - 是万维网联盟的标准
     - 优势
       - 可通过文本编辑器来创建和修改
       - 可被搜索、索引、脚本化或压缩
       - 是可伸缩的
       - 图像可在任何的分辨率下被高质量地打印
       - 可在图像质量不下降的情况下被放大
     
    - Canvas 和 SVG 对比
      - Canvas 的优势
        - 依赖分辨率
        - 适合数据量大
        - 大量图形高平率交互
        - 弱文本渲染能力
        - 最适合图像密集型的游戏，其中的许多对象会被频繁重绘
        - 能够以 .png 或 .jpg 格式保存结果图像
      - SVG 的优势
        - 不依赖分辨率
        - 支持事件处理器
        - 文字独立，可编辑可搜索
        - 适合带有大型渲染区域的应用程序
        - 不适合游戏应用
        
4. 媒体
   - audio 定义声音或音乐内容
   - embed 定义外部应用程序的容器（如插件）
   - source 定义 video 和 audio 的来源
   - track 定义 video 和 audio 的轨道
   - video 定义视频或影片内容

5. 拖放
   1. 把元素设置为可拖放：draggable 为 true
   2. 拖放的内容：ondragstart 属性规定拖动什么数据，dataTransfer.setData()方法设置被拖动数据的类型和值
   3. 拖到何处：ondragover 事件规定被拖动放置何处。默认，数据/元素不能被放置到其他元素，使用 event.preventDefault() 来阻止默认行为
   4. 进行放置：当放开被拖数据时，触发 drop 事件
   ```html
    # 例子
    <!DOCTYPE HTML>
    <html>
        <head>
        <script>
            function allowDrop(ev) {
                ev.preventDefault();
            }
    
            function drag(ev) {
                ev.dataTransfer.setData("text", ev.target.id);
            }
    
            function drop(ev) {
                ev.preventDefault();
                let data = ev.dataTransfer.getData("text");
                ev.target.appendChild(document.getElementById(data));
            }
        </script>
    </head>
    <body>
        <div id="div1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <img id="drag1" src="img_logo.gif" draggable="true" ondragstart="drag(event)" width="336" height="69">
    </body>
    </html>
   ```