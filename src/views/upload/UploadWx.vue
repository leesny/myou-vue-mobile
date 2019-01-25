<template>
  <v-layout row wrap class="upload-container">
    <v-flex xs12 sm12 offset-sm3>
      <v-card>
        <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">WxSdk文件上传</h3>
            <div>Located two hours south of Sydney in the <br>Southern Highlands of New South Wales, ...</div>
          </div>
        </v-card-title>

        <v-card-actions>
          <v-btn flat color="orange" @click="handleWxUpload">上传</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-flex xs12 sm12 offset-sm3>
      <img :src="src">
    </v-flex>
  </v-layout>
</template>
<script>
  export default {
    name: "Welcome",
    data: () => {
      return {
        name: 1111,
        src: ''
      };
    },
    mounted() {

    },
    methods: {
      handleWxUpload() {
        const _this = this;
        window.wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
            console.log('localIds >>>', localIds)
            _this.src = localIds[0];

            window.wx.previewImage({
              current: localIds[0], // 当前显示图片的http链接
              urls: localIds // 需要预览的图片http链接列表
            });
          }
        });
      },
    }
  };
</script>
<style>
  .upload-container img {
    max-width: 100%;
  }
</style>
