import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Contact from '../components/Contact.vue';
import Feedback from '../components/Feedback.vue';
import Help from '../components/Help.vue';
import Signin from '../components/Signin.vue';
import Search from '../components/Search.vue';
import Collect from '../components/Collect.vue';
import History from '../components/History.vue';
import Community from '../components/Community.vue';
// 定义路由配置数组
const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/contact',
        name: 'contact',
        component: Contact
    },
    {
        path: '/feedback',
        name: 'feedback',
        component: Feedback
    },
    {
        path: '/help',
        name: 'help',
        component: Help
    },
    {
        path: '/signin',
        name: 'signin',
        component: Signin
    },
    {
        path: '/search',
        name: 'search',
        component: Search,
        props: true
    },
    {
        path: '/collect',
        name: 'collect',
        component: Collect
    },
    {
        path: '/history',
        name: 'history',
        component: History
    },
    {
        path: '/community',
        name: 'community',
        component: Community
    },

];

// 创建路由器实例
const router = createRouter({
    history: createWebHistory(),  // 使用 HTML5 History 模式
    routes                       // 将定义好的 routes 数组传入
});

// 导出路由器实例，使其可以在应用程序的其他地方使用
export default router;
