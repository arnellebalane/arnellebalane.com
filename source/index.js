import './index.css';

if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js');
}

const html = document.querySelector('html');
const themeButton = document.querySelector('.toggle-theme');

themeButton.addEventListener('click', () => {
    html.classList.toggle('dark');
});

if (window.AmbientLightSensor) {
    const sensor = new AmbientLightSensor({ frequency: 10 });

    sensor.addEventListener('reading', e => {
        if (sensor.illuminance < 20) {
            html.classList.add('dark');
        } else if (sensor.illuminance > 30) {
            html.classList.remove('dark');
        }
    });
    sensor.start();
}
