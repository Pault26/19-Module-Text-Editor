const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
    window.defferedPrompt = event;
    butInstall.style.visibility = 'visible';
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    window.deferredPrompt = null;
    butInstall.style.visibility = 'hidden';
});

window.addEventListener('appinstalled', (event) => {
    console.log('Success!', 'appinstalled', event);
    window.deferredPrompt = null;
});
