<template>
  <v-parallax dark src="https://cdn.vuetifyjs.com/images/parallax/material.jpg" :height="height">
    <v-layout align-center column justify-center>
      <h1 class="display-2 font-weight-thin mb-3">Vue 实验室</h1>
      <h4 class="subheading">Powerd sw Front-end team!</h4>
      <div class="text-xs-center mt-3">
        <v-btn @click="goIn">进入实验</v-btn>
      </div>
    </v-layout>
  </v-parallax>
</template>
<script>
export default {
  name: "Welcome",
  data: () => {
    return {
      height: document.body.clientHeight
    };
  },
  mounted() {

  },
  methods: {
      goIn(){
          this.$router.push('/home')
      }
  }

};
</script>
