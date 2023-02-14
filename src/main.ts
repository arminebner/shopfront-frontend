import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

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

const pinia = createPinia()
pinia.use(context => {
  const storeId = context.store.$id

  context.store.$subscribe((mutation, state) => {
    window.localStorage.setItem(storeId, JSON.stringify(state))
  })

  const localData = window.localStorage.getItem(storeId)
  if (localData) {
    const localStore = JSON.parse(localData)
    context.store.$patch(localStore)
  }
})

app.use(pinia)

app.use(router)

app.mount('#app')
