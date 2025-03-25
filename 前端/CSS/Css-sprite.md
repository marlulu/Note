原理：通过将多个小图标合并到一个大图片文件中，然后通过CSS样式控制显示所需部分的页面优化技术。

好处
- 减少服务器请求的数量并节约带宽
- 加快页面的加载速度，缓解服务器的压力
- 有效减少服务器接收和发送请求的次数，提高页面的加载性

利用 background-position 来精确显示需要的那部分图像。

background 属性
- background-color：设置元素背景颜色，init：transparent
- background-image：设置元素背景图像，init：none
- background-size：设置元素背景图像的大小，init：auto
- background-position：设置元素背景图像的位置，init：0% 0%
- background-repeat：设置背景图像是否重复，以及如何重复，init：repeat
- background-clip：设置元素背景的渲染区域，init：border-box
- background-origin：设置元素背景的定位区域（背景区），init：border-box
- background-attachment：设置元素的背景图像是否随页面滚动或固定，init：scroll
- background-blend-mode：设置元素背景层的混合模式，init：normal

缩写规则
- color，image，size，position，repeat、attachment 属性值可以出现0次或1次，不出现时取其默认值。
- 所有属性可以任意设置顺序，但size只能紧跟着position后面出现，二者通过 / 连接
- clip 和 origin 拥有三条相同的属性值，这三条属性值可以出现0次，1次和2次，出现0次表示都取默认值，出现1次表示同时设置 clip 和 origin 的属性，二者一致；出现2次则表示第一个值为origin的属性值，第二个值为clip的属性值
- 若设置了多个背景层，那么每个背景层之间需要通过 , 进行分割，按顺序从前往后渲染，当前面背景层有未能覆盖的区域，将会被后面的背景层填充。但color属性只能在最后一个背景层中设置，因为一个元素的背景颜色是唯一的

