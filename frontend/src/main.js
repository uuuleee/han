import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // 假设你的路由配置在 './router/index.js' 中

const app = createApp(App);

// 使用 Vue Router 插件
app.use(router);

// 将应用程序挂载到 id 为 'app' 的 DOM 元素上
app.mount('#app');
