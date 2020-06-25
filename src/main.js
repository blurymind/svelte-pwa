import HMR from '@sveltech/routify/hmr'
import App from './App.svelte'

const app = HMR(App, { target: document.body }, 'routify-app')

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
}

export default app
