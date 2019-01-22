/**
 * 组件 - 对话框
 * @type       {Object}
 */
export const msg = {
  info: function(title, text, options) {
    let option = Object.assign({
      title: title,
      text: text,
      type: 'info',
      confirmButtonText: window.SWAPP.$t('btn.close')
    }, options)

    setTimeout(() => {
      window.SWAPP.$swal(option);
    }, 200);
  },
  success: function(title, text, options) {
    let option = Object.assign({
      title: title,
      text: text,
      type: 'success',
      confirmButtonText: window.SWAPP.$t('btn.close')
    }, options);

    setTimeout(() => {
      window.SWAPP.$swal(option);
    }, 200);
  },
  error: function(title, text, options) {
    let option = Object.assign({
      title: title,
      text: text,
      type: 'error',
      confirmButtonText: window.SWAPP.$t('btn.close')
    }, options);

    setTimeout(() => {
      window.SWAPP.$swal(option);
    }, 200);
  },
  confirm: function(title, text, type, fn, options) {
    type = type || 'info';
    options = options || {};
    options.showCancelButton = options.showCancelButton != false ? true : false;

    let option = Object.assign({
      title: title,
      text: text,
      type: type,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      cancelButtonText: window.SWAPP.$t('btn.cancel'),
      confirmButtonText: window.SWAPP.$t('btn.ok')
    }, options);

    setTimeout(() => {
      window.SWAPP.$swal(option).then(() => {
        fn && fn();
      }).catch(e => {});
    }, 200);
  },

  prompt: function(title, text, inputType, inputPlaceholder, fn, options) {
    let option = Object.assign({
      title: title || '提示',
      text: text || '描述',
      input: inputType || 'text', //'email', 'password', 'select', 'radio', 'checkbox', 'textarea', 'file'
      showCancelButton: true,
      showLoaderOnConfirm: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
      animation: "slide-from-top",
      cancelButtonText: window.SWAPP.$t('btn.cancel'),
      confirmButtonText: window.SWAPP.$t('btn.ok'),
      inputPlaceholder: inputPlaceholder || "请输入...",
      inputAttributes: {
        autocapitalize: 'off'
      },
      preConfirm: (inputValue) => {
        if(!(inputValue.trim())){
          window.SWAPP.$swal.showValidationError(`输入内容不能为空`);
          return Promise.reject(new Error('输入内容不能为空'));
        }else{
          return Promise.resolve(inputValue)
        }
      },
    }, options);

    setTimeout(() => {
      window.SWAPP.$swal(option)
      .then(inputValue => {
        if (inputValue === false) {
          return false;
        }
        if (inputValue === "") {
          window.SWAPP.$swal.showValidationError("输入内容不能为空");
          return false
        }

        fn && fn(inputValue);
      })
      .catch(e => {});
    }, 200);
  },

  toast: function(title, text, timer, options) {
    timer = timer || 1000;

    let option = Object.assign({
      title: title,
      text: text,
      timer: timer,
      showConfirmButton: false,
      confirmButtonText: window.SWAPP.$t('btn.ok')
    }, options);

    setTimeout(() => {
      window.SWAPP.$swal(option).catch(e => {});
    }, 200);
  }
};

export default msg;
