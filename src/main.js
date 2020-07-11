import App from './App.svelte'

const app = new App({
  target: document.body,
  props: {},
})

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
}

let deferredPrompt;
const addBtn = document.getElementById('addPwa');
addBtn.style.display = 'none';
// addBtn.addEventListener('click', (e) => {console.log(e)});
window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
        addBtn.style.display = 'none';
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  });
});

export default app
