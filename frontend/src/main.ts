// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// src/plugins/vuetify.ts
import 'vuetify/styles' // ✅ Vuetify core styles
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi' // Optional if using Material Design Icons
import '@mdi/font/css/materialdesignicons.css' // ✅ Vuetify icon font
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

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
})



const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')
