```js
// ==UserScript==
// @name         自动填写个人信息（问卷星）
// @version      0.1
// @match        https://www.wjx.top/*
// @match        https://www.wjx.cn/*
// @match        https://w.wjx.top/*
// @match        https://w.wjx.cn/*
// @icon         https://cdn4.iconfinder.com/data/icons/marketing-and-digital-marketing/32/business_marketing_advertising_mission-128.png
// @grant        none
// @require      https://code.jquery.com/jquery-3.6.4.min.js
// ==/UserScript==


/*
**info 第一个参数:对应的填入选项（字符串）
**info 第二个参数:匹配的标题（正则表达式）,(x|y)查找任何以 | 分隔的选项。
**info 第三个参数:(可选)，正则表达式修饰符
*/


//允许在文档完全加载完后执行函数。
$(function(){

    'use strict'; //"use strict" 的目的是指定代码在严格条件下执行,不能使用未声明的变量。

    //数组
    const self_info=[
        ["董文翎",/姓名|名字/],
        ["2403班",/班级/],
        ["24064080",/学号|职工号/],
        ["应用统计学",/专业/],
        ["统计与信息学院",/学院|院系|单位/],
        ["大一",/年级/],
        ["13701634165@163.com",/邮箱/],
        ["13701634165",/联系方式|电话|手机|手机号/],
        ["13701634165",/QQ|qq/],
        ["无",/其他|其它|备注/],
    ];

    //.class 选择器选取带有指定 class 的所有元素。
    const wjx_web={
        module: ".ui-field-contain",    //问题模块class
        title:  ".field-label",         //问题标题class
        text:   ".ui-input-text",       //内容填写class
    };



    //问题数量
    let itemNum = 0;

    //在页面中选取所有包括 ui-field-contain（class） 的元素。(元素选择器)。并对每个元素执行function()函数。
    $(wjx_web.module).each(function(){
        itemNum += 1; //对第 itemNum 个问题进行识别
        let title = $(this).children(wjx_web.title).text(); //text() 返回 field-label(class) 元素内的所有文本内容
        // if (itemNum === 1) {
        //     alert(title);
        // }

        for(let i = 0; i < self_info.length; i++){
            // test() 方法用于 whether a pattern exists in a searched string。
            // 如果 string 中含有匹配的文本，则返回 true，否则返回 false
            if(self_info[i][1].test(title)){
                $("#q"+itemNum).attr("value",self_info[i][0]); //#id 选择器通过 HTML 元素的 id 属性选取指定的元素。
                break;
            }
        }
    });
    //wjx web: submitbtn mainBgColor (20230322)
    //setTimeout($(".submitbtn").click(), 1000); //1秒后将会调用执行click()函数
    //$(".submitbtn").click(); //提交时间太快，wjx出现验证码
});
```