 jsonp(url, opts, fn)

 url,
 opts: {
    {string}  prefix  默认为__jp
    {string}  name    默认为prefix + count
    {string}  param   默认为 ‘callback’
    {number}  timeout 默认为 60000
    {function} onload 默认为undefined 可以用作异步按需加载js文件时使用，文件加载完成后调用该函数
  },
  fn  服务器返回数据时回调 function(err, data){}


```
    // 请求jsonp
    jsonp('./src.js',{
             prefix: '_lin_',
             name: 'process',
             param: 'callback',
             timeout: '6000'
        }, function(err, data){
            if(err){
                console.log(err)
                return
            }
            console.log(data)
        })
        // 异步按需加载js文件
        jsonp('./src1.js', {
            onload: function () {
                console.log(222)
            }
        })
```
