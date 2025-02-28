const jsonp = ({url, params, callbackName}) => {
    // 创建完整 url
    const generateUrl = () => {
        let dataSrc = ''
        for (const key in params) {
            if (params.hasOwnProperty(key)) {
                dataSrc += `${key}=${params[key]}&`
            }
        }

        dataSrc += `callback=${callbackName}`
        return `${url}?${dataSrc}`
    }

    // 发送
    return new Promise((resolve, reject) => {
        const originalCallback = window[callbackName];
        const scriptEle = document.createElement('script')
        scriptEle.src = generateUrl()
        document.body.appendChild(scriptEle)
        window[callbackName] = data => {
            window[callbackName] = originalCallback; 
            document.body.removeChild(scriptEle)
            resolve(data)
        }
    })
}