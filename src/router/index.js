import Vue from 'vue'
import Router from 'vue-router'
import nav from '@/common/nav'
import index from '@/components/index'
import login from '@/components/login'
import no_read from '@/components/no_read'
import data from '@/components/data'
import Collection from '@/components/Collection'
import about from '@/components/about'
// import { create } from 'domain';
// 懒加载
const topic = () => import('@/common/topic')
const create = () => import('@/common/create')
const user = () => import('@/common/user')
const otheruser = () => import('@/common/otheruser')
const cnode = () => import('@/cnode/cnode')
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/', redirect: '/index',
      component: index
    },
    {
      path: '/',
      name: 'nav',
      component: nav,
      children: [
        {
          path: 'index',
          name: index,
          component: index,
        },
        {
          path: 'topic',
          name: topic,
          component: topic
        },
        {
          path: 'login',
          name: login,
          component: login
        },
        {
          path: 'no_read',
          name: no_read,
          component: no_read
        },
        {
          path: 'create',
          name: create,
          component: create
        },
        {
          path: 'data',
          name: data,
          component: data
        },
        {
          path: 'Collection',
          name: 'Collection',
          component: Collection
        },
        {
          path: 'cnode',
          name: 'cnode',
          component: cnode
        },
        {
          path: 'user',
          name: 'user',
          component: user
        },
        {
          path: 'otheruser',
          name: 'otheruser',
          component:otheruser
        },
        {
          path: 'about',
          name: 'about',
          component: about
        }
      ]
    }
  ]
})
