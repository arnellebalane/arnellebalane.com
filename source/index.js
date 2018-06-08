import './index.css';

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js');
}

const themeButton = document.querySelector('.toggle-theme');

themeButton.addEventListener('click', () => {
    document.querySelector('html').classList.toggle('dark');
});
