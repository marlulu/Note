/**
 * offest：偏移量，只读，不能修改，没有单位
 * offestParent：有定位的父级元素
 * offestTop：元素相对定位父级元素的上方偏移
 * offestLeft：元素相对定位父级元素的左边偏移
 * offestHeight：返回自身带有 padding，边框，内容的高度
 * offestWidth：返回自身带有 padding，边框，内容的宽度
 */ 

/**
 * client：元素可视区的信息
 * clientTop：元素上边框的大小
 * clientLeft：元素左边框的大小
 * clientHeight：返回自身带有 padding，内容的高度，无边框
 * clientWidth：返回自身带有 padding，内容的宽度，无边框
 */ 

/**
 * scroll：动态得到元素的大小、滚动距离
 * scrollTop：被卷上去的上侧距离
 * scrollLeft：被卷去的左侧距离
 * scrollHeight：返回自身的实际宽度，不包含边框
 * scrollWidth：返回自身的实际高度，不包含边框
 */ 

// https://blog.csdn.net/qq_63358859/article/details/142452339


const images = [...document.querySelectorAll('img')] 
// 2 监听页面滚动事件
window.addEventListener('scroll', lazyload)
// 3 定义页面滚动的处理函数
function lazyload(e){
// 3.1 获取屏幕的可视高度
const clientHeight = document.documentElement.clientHeight
// 3.2 获取屏幕的滚动距离
const scrollTop = document.documentElement.scrollTop
    for (let i = 0; i < images.length; i++) {
        if (images[i].offsetTop < clientHeight + scrollTop) {
        images[i].setAttribute('src', images[i].getAttribute('data-src'))
        }
    }
}