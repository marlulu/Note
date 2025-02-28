// URLSearchParams 方法
// 创建一个URLSearchParams实例
const urlSearchParams = new URLSearchParams(window.location.search)
// 把键值对列表转换为一个对象
const params = Object.fromEntries(urlSearchParams.entries())

// 使用 split
function parseParam(url) {
    const res = {}
    if (url.include("?")) {
        const str = url.split("?")[1];
        const arr = str.split("&")
        arr.forEach(item => {
            const key = item.split("=")[0]
            const val = item.split("=")[1]
            res[key] = decodeURIComponent(val)
        })
    }
    return res
}