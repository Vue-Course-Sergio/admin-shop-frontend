import './assets/main.css';

import { VueQueryPlugin } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import Toast from 'vue-toastification';
import App from './App.vue';
import router from './router';

import 'vue-toastification/dist/index.css';
import './config/yup';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);
app.use(Toast);

app.mount('#app');
