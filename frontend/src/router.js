import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Signup from './views/Signup.vue'

const routes = [
    {
        path: '/home',
        name: 'home',
        component: Home
    },
    {
        path: '/',
        name: 'login',
        component: Login
    },
    {
        path: '/signup',
        name: 'signup',
        component: Signup
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes, // short for `routes: routes`
})