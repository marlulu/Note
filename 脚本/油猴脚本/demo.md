```js
// ==UserScript==
// @name         �Զ���д������Ϣ���ʾ��ǣ�
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
**info ��һ������:��Ӧ������ѡ��ַ�����
**info �ڶ�������:ƥ��ı��⣨������ʽ��,(x|y)�����κ��� | �ָ���ѡ�
**info ����������:(��ѡ)��������ʽ���η�
*/


//�������ĵ���ȫ�������ִ�к�����
$(function(){

    'use strict'; //"use strict" ��Ŀ����ָ���������ϸ�������ִ��,����ʹ��δ�����ı�����

    //����
    const self_info=[
        ["������",/����|����/],
        ["2403��",/�༶/],
        ["24064080",/ѧ��|ְ����/],
        ["Ӧ��ͳ��ѧ",/רҵ/],
        ["ͳ������ϢѧԺ",/ѧԺ|Ժϵ|��λ/],
        ["��һ",/�꼶/],
        ["13701634165@163.com",/����/],
        ["13701634165",/��ϵ��ʽ|�绰|�ֻ�|�ֻ���/],
        ["13701634165",/QQ|qq/],
        ["��",/����|����|��ע/],
    ];

    //.class ѡ����ѡȡ����ָ�� class ������Ԫ�ء�
    const wjx_web={
        module: ".ui-field-contain",    //����ģ��class
        title:  ".field-label",         //�������class
        text:   ".ui-input-text",       //������дclass
    };



    //��������
    let itemNum = 0;

    //��ҳ����ѡȡ���а��� ui-field-contain��class�� ��Ԫ�ء�(Ԫ��ѡ����)������ÿ��Ԫ��ִ��function()������
    $(wjx_web.module).each(function(){
        itemNum += 1; //�Ե� itemNum ���������ʶ��
        let title = $(this).children(wjx_web.title).text(); //text() ���� field-label(class) Ԫ���ڵ������ı�����
        // if (itemNum === 1) {
        //     alert(title);
        // }

        for(let i = 0; i < self_info.length; i++){
            // test() �������� whether a pattern exists in a searched string��
            // ��� string �к���ƥ����ı����򷵻� true�����򷵻� false
            if(self_info[i][1].test(title)){
                $("#q"+itemNum).attr("value",self_info[i][0]); //#id ѡ����ͨ�� HTML Ԫ�ص� id ����ѡȡָ����Ԫ�ء�
                break;
            }
        }
    });
    //wjx web: submitbtn mainBgColor (20230322)
    //setTimeout($(".submitbtn").click(), 1000); //1��󽫻����ִ��click()����
    //$(".submitbtn").click(); //�ύʱ��̫�죬wjx������֤��
});
```