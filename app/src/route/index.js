import Vue from 'vue';
import VueRouter from "../plugin/f-vue-router";

Vue.use(VueRouter);

import Home from '../view/home.vue'
import About from '../view/about.vue'
const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    }

]

const router = new VueRouter({
    mode: 'hash',
    routes,
})

export default router;