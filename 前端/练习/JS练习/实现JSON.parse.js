{
    // 构造函数直接返回
    const json = '{"name":"吱吱吱", "age":20}';
    const exponent = {"name":"吱吱吱", "age":20}
    const interStrings = `to the ${ exponent} power is`;
    console.log(interStrings)
    const obj = (new Function(`return ${json}`))();
    console.log(obj)
}