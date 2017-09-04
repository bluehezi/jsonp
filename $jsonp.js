let jsonp = (function () {
    // 计数
    let count = 0
    
    function noop () {}

    /**
     * opts
     * {
     *   {string}  prefix  默认为__jp
     *   {string}  name    默认为prefix + count
     *   {string}  param   默认为 ‘callback’
     *   {number}  timeout 默认为 60000
     *   {function} onload 默认为undefined 可以用作异步按需加载js文件时使用，文件加载完成后调用该函数
     * }
     * 
     * @param {*string} url 
     * @param {*object | function} opts optional options / callback
     * @param {*function} fn callback
     */


    function jsonp (url, opts, fn) {
        if (typeof opts === 'function') {
            fn = opts
            opts = {}
        }

        if (!opts) {opts = {}}

        let prefix = opts.prefix || '__jp',
            name = opts.name || (prefix + count++),
            param = opts.param || 'callback',
            timeout = null != opts.timeout ? opts.timeout : 60000,
            onLoad = opts.onload || undefined,
            target = document.body,
            enc = encodeURIComponent,
            timer

        if (timeout) {
            timer = window.setTimeout(function(){
               // 清除工作
                cleanup()
                if (fn) {
                    fn(new Error('TimeOut'))
                }
            }, timeout)
        }
       
        function cleanup () {
            if (target && script) {
                target.removeChild(script)
            }
            if(window[name]){
                window[name] = noop
            }
            if (timer) {
                window.clearTimeout(timer)
            }
        }
        function cancel () {
            if (window[name]) {
                cleanup()
            }
        }
       // 获得服务器返回的数据时执行此函数
        window[name] = function (data) {
            cleanup()
            if (fn) {
                fn(null, data)
            }
        }
        
        url += ~url.indexOf('?') ? '&' : '?'
        url = url.replace('?&','?')
        url += param + '=' + enc(name)
        var script = document.createElement('script')
        script.src = url
        if (onLoad) {
            script.onload = onLoad
            script.onreadystatechange = function () {
                if (script.readyState === 4) {
                    onLoad()
                }
            }
        }
        
        target.appendChild(script)
        return cancel
    }

   return jsonp

})()