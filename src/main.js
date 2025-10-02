import './assets/styles/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

import BaseLayout from './components/BaseLayout.vue'
import VueSpinner from './components/VueSpinner.vue'
import BaseButton from './components/BaseButton.vue'

app.component('BaseLayout', BaseLayout)
app.component('VueSpinner', VueSpinner)
app.component('BaseButton', BaseButton)

app.use(createPinia())
app.use(router)

app.mount('#app')
