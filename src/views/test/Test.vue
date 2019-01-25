<template>
  <div class="grey lighten-3">
    <!-- nav -->
    <v-toolbar color="pink" dark fixed>
      <v-btn icon @click="handleGoBack">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title>组件测试</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="handleRefresh">
        <v-icon>refresh</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- content -->
    <v-card class="mb-5 mt-5">
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            vuex: 待完善
          </v-flex>
          <v-flex xs12>
            H5文件上传:
            <upload-h5></upload-h5>
          </v-flex>
          <v-flex xs12>
            wxsdk文件上传:
            <upload-wx></upload-wx>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>
<script>
  import UploadH5 from '@/views/upload/UploadH5.vue'
  import UploadWx from '@/views/upload/UploadWx.vue'

  export default {
    name: "Test",
    components: { UploadH5, UploadWx },
    data() {
      return {
      };
    },
    computed: {
    },
    methods: {
      handleGoBack() {
        this.$router.go(-1);
      },

      handleRefresh() {
        this.$router.go(0);
      }
    }
  };
</script>
