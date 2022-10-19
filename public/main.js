let create = document.createElement.bind(document)

{
    let page = 1
    getNextPage.onclick = () => {
        const MAX_PAGE = 3
        if (page === MAX_PAGE) {
            window.alert('已经是最后一页了！')
            return
        }
        let xhr = new XMLHttpRequest()
        xhr.open('GET', `/page${page + 1}`)
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let array = []
                try {
                    array = JSON.parse(xhr.response)
                } catch (error) {
                    console.error("出错了，错误详情是")
                    console.log(error);
                    array = []
                }
                let str = array.map(item => `<li>${item.id}</li>`).join('')
                dataList.innerHTML += str
            }
        }
        xhr.send()
        page++
    }
}

getJSON.onclick = () => {
    let xhr = new XMLHttpRequest()
    xhr.open("get", "/5.json")
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = xhr.response
            let obj = null
            try {
                obj = JSON.parse(res)
            } catch (error) {
                console.error("出错了，错误详情是")
                console.log(error);
                obj = { 'name': '' }
            }
            myName.textContent = `, my name is ${obj.name}`
        }
    }
    xhr.send()
}

getXML.onclick = () => {
    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let doc = xhr.responseXML // 天生有 API 接受 XML
            console.log(doc);
            let text = doc.getElementsByTagName('warning')[0].textContent
            console.log(text.trim());
        }
    }
    xhr.open('GET', '4.xml')
    xhr.send()
}

getHTML.onclick = () => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', '/3.html')
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = xhr.response
            let div = create('div')
            div.innerHTML = res
            document.body.appendChild(div)
        }
    }
    xhr.send()
}

getJS.onclick = () => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', '/2.js')
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let res = xhr.response
            let script = create('script')
            script.innerHTML = res
            document.body.appendChild(script)
        }
    }
    xhr.send()
}

getCSS.onclick = () => {
    let xhr = new XMLHttpRequest()
    xhr.open('GET', '/style.css')
    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
                let res = xhr.response
                let style = create('style')
                style.innerHTML = res
                document.head.appendChild(style)
            } else {
                console.info(`http状态码是：${xhr.status}`);
                alert('加载 CSS 失败')
            }
        }
    }
    xhr.send()
}