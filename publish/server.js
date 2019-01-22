const express = require('express');
const path = require('path');
const app = express();
const compression = require('compression');
const useragent = require('express-useragent');
const proxy = require('http-proxy-middleware');
const history = require('connect-history-api-fallback');
const httpPort = process.env.PORT || 6666;

// 启用gzip
app.use(compression());

// 打印请求URL
app.use('/',(req,res,next)=>{ 
  console.log(`Receive URL: ${req.path} `);
  next();
});

//context可以是单个字符串，也可以是多个字符串数组
const context = ['/api'];

//配置要代理到的接口地址，域名和ip都可以
const options = {
    target: 'http://127.0.0.1:6667',
    changeOrigin: true,
    pathRewrite:{
      '^/api':'' //重写代理的路径，如http://localhost:6666/api/login会被代理到http://127.0.0.1:6667/login
    }
}

//将options对象用proxy封装起来，作为参数传递
const apiProxy = proxy(options);
app.use(context, apiProxy)

// 限制可以访问的浏览器
app.use(useragent.express());

// 静态资源
app.use(express.static(path.join(__dirname, 'dist')));

app.get(['//','/'],(req,res,next)=>{ 
  console.log('访问的useraget source信息： ',req.useragent.source)

  // 仅限app webview打开
  // if(req.useragent.source.toString().toLowerCase().includes('themeablebrowser')){
  //   next();   
  // }else{
  //   res.sendStatus(403);
  // }

  // 不限制
  next();
});

app.get('/', (req, res)=> {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// 防止刷新404
app.use(history());

// 启动监听端口
app.listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
});