import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import BaseLayout from './components/BaseLayout.vue'
import VueSpinner from './components/VueSpinner.vue'
import BaseButton from './components/BaseButton.vue'
import BaseModal from './components/BaseModal.vue'

app.component('BaseLayout', BaseLayout)
app.component('VueSpinner', VueSpinner)
app.component('BaseButton', BaseButton)
app.component('BaseModal', BaseModal)

const pinia = createPinia()
app.use(pinia)
app.use(router)

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.mount('#app')
