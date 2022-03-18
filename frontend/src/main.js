import Vue, { createApp } from 'vue'
import App from './App.vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import mitt from 'mitt';
import { store } from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const emitter = mitt();

const app = createApp(App)
app.config.globalProperties.emitter = emitter;
app.use(BootstrapVue3)
app.use(store)
app.mount('#app')
