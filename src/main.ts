/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

const maxLogs = 500;
let logCount = 0;

const originalLog = console.log;
console.log = (...args) => {
  if (logCount < maxLogs) {
    originalLog(...args);
    logCount++;
  }
};

const app = createApp(App)

registerPlugins(app)
app.mount('#app')
