import Vue from 'vue';
import Router from 'vue-router'
import Index from './views/Index.vue'

Vue.use(Router)

export default [
    {
        path: '/',
        name: 'Home Page',
        component: Index
    },
    {
        path: '/users',
        name: 'Users',
        component: () => import('./views/Users.vue')
    },
    {
        path: "*",
        name: '404',
        component: () => import('./views/404.vue')
    }
]