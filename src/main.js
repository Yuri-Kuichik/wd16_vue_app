import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { markRaw } from 'vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

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
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(ElementPlus)

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

app.mount('#app')


