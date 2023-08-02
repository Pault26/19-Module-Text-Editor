// Import the Workbox class from 'workbox-window'
import { Workbox } from 'workbox-window';

// Import the Editor class from './editor.js'
import Editor from './editor';

// Import './database.js' (assumed to set up IndexedDB methods)
import './database';

// Import the 'style.css' file from '../css'
import '../css/style.css';

// Get a reference to the 'main' HTML element and clear its contents
const main = document.querySelector('#main');
main.innerHTML = '';

// Function to display a loading spinner
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
};

// Create an instance of the Editor class
const editor = new Editor();

// If the 'editor' is undefined, display a loading spinner
if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported in the browser
if ('serviceWorker' in navigator) {
  // Create an instance of the Workbox class and register the service worker
  const workboxSW = new Workbox('/src-sw.js'); // Specify the service worker source file
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
