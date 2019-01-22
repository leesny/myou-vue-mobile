import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: () => import(
        /* webpackChunkName: "welcome" */
        '@/views/Welcome'
      )
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import(
        /* webpackChunkName: "home" */
        '@/views/Home'
      )
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import(
        /* webpackChunkName: "test" */
        '@/views/test/Test'
      )
    },
    {
      path: '/vedio',
      name: 'Vedio',
      component: () => import(
        /* webpackChunkName: "vedio" */
        '@/views/camera/Vedio'
      )
    },
    {
      path: '/photo',
      name: 'Photo',
      component: () => import(
        /* webpackChunkName: "photo" */
        '@/views/camera/Photo'
      )
    },
    {
      path: '/flow',
      name: 'Flow',
      component: () => import(
        /* webpackChunkName: "flow" */
        '@/views/flow/Flow'
      )
    },
    {
      path: '/form',
      name: 'Form',
      component: () => import(
        /* webpackChunkName: "form" */
        '@/views/form/Form'
      )
    },
    {
      path: '/keyboard',
      name: 'Keyboard',
      component: () => import(
        /* webpackChunkName: "keyboard" */
        '@/views/keyboard/Keyboard'
      )
    },
    {
      path: '/player',
      name: 'Player',
      component: () => import(
        /* webpackChunkName: "player" */
        '@/views/player/Player'
      )
    },
    {
      path: '/sign',
      name: 'Sign',
      component: () => import(
        /* webpackChunkName: "sign" */
        '@/views/sign/Sign'
      )
    },
    {
      path: '/upload',
      name: 'Upload',
      component: () => import(
        /* webpackChunkName: "upload" */
        '@/views/upload/Upload'
      )
    },
    {
      path: '/voice',
      name: 'Voice',
      component: () => import(
        /* webpackChunkName: "voice" */
        '@/views/voice/Voice'
      )
    },
    {
      path: '/live',
      name: 'Live',
      component: () => import(
        /* webpackChunkName: "live" */
        '@/views/live/Live'
      )
    },
    {
      path: '/sliding-verify',
      name: 'SlidingVerify',
      component: () => import(
        /* webpackChunkName: "sliding-verify" */
        '@/views/verify/SlidingVerify'
      )
    },
    {
      path: '/websocket',
      name: 'Websocket',
      component: () => import(
        /* webpackChunkName: "websocket" */
        '@/views/websocket/Websocket'
      )
    },
    {
      path: '/invoke',
      name: 'Invoke',
      component: () => import(
        /* webpackChunkName: "invoke" */
        '@/views/invoke/Invoke'
      )
    },
    {
      path: '/barrage',
      name: 'Barrage',
      component: () => import(
        /* webpackChunkName: "barrage" */
        '@/views/barrage/Barrage'
      )
    }
  ]
})
