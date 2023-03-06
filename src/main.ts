import './interceptors/axios.js'
import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import App from './App.vue'
import config from './formkit.config'
import globalStore from './stores/createPinia'
import router from './router'

const app = createApp(App)

app.use(plugin, defaultConfig(config))

app.use(globalStore())

app.use(router)

app.mount('#app')
