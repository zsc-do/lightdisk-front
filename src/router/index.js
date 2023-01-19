import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../layout/layout.vue'
import disk from '../views/disk/disk.vue'
import menu from '../views/menu/menu.vue'
import login from '../views/login/login.vue'
import index from '../views/index/index.vue'
import share from '../views/share/share.vue'
import register from '../views/register/register.vue'
import userInfo from '../views/user/userInfo.vue'
import sign from '../views/sign/sign.vue'
import oauthRedirect from '../views/oauth/redirect.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    children:[
      {
        path:'menu',
        name:'menu',
        component:menu
      },
      {
        path:'disk',
        name:'disk',
        component:disk
      },
      {
        path:'userInfo',
        name:'userInfo',
        component:userInfo
      },
      {
        path:'sign',
        name:'sign',
        component:sign
      }
    ]
  },{
    path:'/login',
    name:'login',
    component:login
  },{
    path:'/share',
    name:'share',
    component:share
  },{
    path:'/register',
    name:'register',
    component:register
  },
  {
    path:'/oauth/redirect',
    name:'oauthRedirect',
    component:oauthRedirect
  },
  {
    path:'/index',
    name:'index',
    component:index
  },
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
