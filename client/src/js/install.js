// Get a reference to the 'buttonInstall' element
const butInstall = document.getElementById('buttonInstall');

// Logic to handle the PWA installation prompt
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the installation prompt event in a global variable
    window.deferredPrompt = event;
    // Make the installation button visible
    butInstall.style.visibility = 'visible';
});

// Event listener for the installation button click
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    
    // Show the installation prompt
    promptEvent.prompt();
    // Reset the installation prompt event
    window.deferredPrompt = null;
    // Hide the installation button
    butInstall.style.visibility = 'hidden';
});

// Event listener for the 'appinstalled' event
window.addEventListener('appinstalled', (event) => {
    console.log('Success!', 'appinstalled', event);
    // Reset the installation prompt event
    window.deferredPrompt = null;
});
