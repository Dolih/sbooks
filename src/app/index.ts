import { createApp } from "vue";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import App from './index.vue'
import {router, store} from './providers'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi'
    },
    display: {
        mobileBreakpoint: 'md',
        thresholds: {
          xs: 0,
          sm: 340,
          md: 540,
          lg: 800,
          xl: 1280,
        },
      },
})

export const app = createApp(App).use(store).use(router).use(vuetify)