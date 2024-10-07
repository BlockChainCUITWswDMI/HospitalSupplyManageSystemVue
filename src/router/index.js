import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import ErrorPage from '../views/ErrorPage.vue';

Vue.use(VueRouter)

// 路由与组件映射
const routes = [
    {
        path:'/',
        component: Main,
        name: 'Main',
        redirect: '/home',
        children: []
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },  
    {
        path: '/error/:message',
        name: 'error',
        component: ErrorPage
    } 
    
]

const router = new VueRouter({
    routes
})

export default router