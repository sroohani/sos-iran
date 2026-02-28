import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './main.css'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

const app = createApp(App)

app
  .use(createPinia())
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .mount('#app')
