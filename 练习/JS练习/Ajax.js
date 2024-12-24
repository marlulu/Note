// 思路
// 创建一个XMLHttpRequest对象
// 配置请求，发送请求，处理响应

const getJSON = (url) => {
    const xhr = new XMLHttpRequest()
    return new Promise((reslove, reject) => {
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
                    reslove(xhr.responseText)
                } else {
                    reject(new Error(xhr.responseText))
                }
            }
        }
        xhr.open('get', url, false)
        xhr.setRequestHeader('Accept', 'application/json')
        xhr.send()
    })

}