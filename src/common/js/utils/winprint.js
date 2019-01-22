import browser from './browser.js';

export const winprint = {

  //设置框架样式，隐藏部分 
  presetFrameHidden() {
    document.all("app-sidebar-printbox").style.display = "none";
    document.all("app-header-printbox").style.display = "none";
    document.all("app-breadcrumb-printbox").style.display = "none";
    document.all("app-footer-printbox").style.display = "none";
    document.all("app-main-printbox").style.marginLeft = "0";
  },

  //还原框架样式 
  doSetFrameDefault() {
    document.all("app-sidebar-printbox").style.display = "";
    document.all("app-header-printbox").style.display = "";
    document.all("app-breadcrumb-printbox").style.display = "";
    document.all("app-footer-printbox").style.display = "";
    document.all("app-main-printbox").style.marginLeft = "";
  },

  //执行打印 参数：prefn 钩子函数 打印前页面处理函数
  //               nextfn钩子函数 打印后页面处理函数
  doWinPrint(prefn, nextfn) {
    //this.presetFrameHidden(); //屏蔽，改用@media print 控制
    if (browser.mobile) {
      alert('抱歉，打印功能只支持PC访问');
      return;
    }

    prefn && prefn();

    window.print();

    //this.doSetFrameDefault();  //屏蔽，改用@media print 控制
    nextfn && nextfn();
  }
};

//导出util
export default winprint;
