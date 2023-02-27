import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './interceptors/axios.js'
import globalStore from './stores/createPinia'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'dark',
  },
})

const app = createApp(App)

app.use(vuetify)

app.use(globalStore())

app.use(router)

app.mount('#app')
