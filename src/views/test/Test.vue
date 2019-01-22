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
              vuex
              
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>
<script>

export default {
  name: "Test",
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
