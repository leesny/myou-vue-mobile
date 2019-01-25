<template>
  <v-layout row wrap class="upload-container">
    <v-flex xs12 sm12 offset-sm3>
      <v-card>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">Input文件上传</h3>
            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <!-- accept="image/gif,image/jpeg,image/jpg,image/png" 微信浏览器不能指定accept，否则选择图片失效 -->
          <input type="file" class="file-button" @change="canvasSelImg($event,1)" ref="img1" value="">
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 offset-sm3>
        <img :src="src" >
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    name: "Welcome",
    data: () => {
      return {
        name: 1111,
        src:''
      };
    },
    mounted() {

    },
    methods: {
      canvasSelImg(event, action) {
        let _this = this;
        var file = event.target.files[0];
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
        let str = 'JPG/JPEG/PNG';
        let errorImgMsg = '文件格式只能是:jpg、png、jpeg';
        if (str.indexOf(testmsg.toUpperCase()) < 0) {
          console.log('errorImgMsg >>>', errorImgMsg);
          return;
        }

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          var oReader = new FileReader();
          oReader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            console.log('image >>>', image);

            _this.src = e.target.result;
          };
          oReader.readAsDataURL(file);
        }
      },
    }
  };
</script>
<style>
  .upload-container img {
    max-width: 100%;
  }
</style>
