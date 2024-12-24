// 字符串模版 ``
// 保留了换行符，可跨行定义
const poem = `
Roses are red,
Violets are blue,
Sugar is sweet,
And so are you.
`;

// 字符串插值
// 在一个连续定义中插入一个或多个值
const value = 5
const exponent = 'second'
const interStrings = `${ value } to the ${ exponent} power is ${ value * value}`;

// 模版字面量标签函数
// 通过前缀到模版字面量来应用自定义行为

// strings 的长度总是 (${}) 出现的次数加一，不足的用空字符串 '' 代替
function simpleTag(strings, ...expressions) {
    console.log(strings)
    for (const expression of expressions) {
        console.log(expression)
    }

    return null
}

function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
  if (reg.test(template)) { // 判断模板里是否有模板字符串
    const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
    template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
    return render(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}

// Stirng.raw() 创建原始字符串，不能处理转义字符
const html = (strings, ...values) => String.raw({ raw: strings }, ...values);
// 一些格式化程序会将此字面量的内容格式化为 HTML
const doc = html`<!doctype html>
  <html lang="en-US">
    <head>
      <title>Hello</title>
    </head>
    <body>
      <h1>Hello world!</h1>
    </body>
  </html>`;


  