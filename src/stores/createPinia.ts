import { createPinia } from 'pinia'

function globalStore() {
  const pinia = createPinia()

  pinia.use(context => {
    const storeId = context.store.$id

    if (storeId === 'cart') {
      context.store.$subscribe((mutation, state) => {
        window.localStorage.setItem(storeId, JSON.stringify(state))
      })
    }

    const localData = window.localStorage.getItem(storeId)
    if (localData) {
      const localStore = JSON.parse(localData)
      context.store.$patch(localStore)
    }
  })
  return pinia
}

export default globalStore
