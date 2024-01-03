import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import RayModal from '../../';

const app = createApp(App);

app.use(RayModal);

app.mount('#app');
