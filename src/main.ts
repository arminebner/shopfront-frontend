import './assets/reset.css'
import './interceptors/axios.js'
import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import App from './App.vue'
import config from './formkit.config'
import globalStore from './stores/createPinia'
import router from './router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faBars, faCartShopping, faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faBars, faCartShopping, faPenToSquare, faTrash)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(plugin, defaultConfig(config))

app.use(globalStore())

app.use(router)

app.mount('#app')
