import * as DarkModeToggle from './custom-elements/dark-mode-toggle.mjs';

const themeColors = {
    dark: '#141A24',
    light: '#fff'
};

const themeColor = document.querySelector('meta[name="theme-color"]');
const darkModeToggle = document.querySelector('dark-mode-toggle');
const updateThemeColor = () => {
    themeColor.content = themeColors[darkModeToggle.mode];
};
updateThemeColor();

document.addEventListener('colorschemechange', updateThemeColor);



// NOTE: If prefers-color-scheme is not supported, we fallback to just using
// the light theme.

if (window.matchMedia('(prefers-color-scheme: no-preference)').media === 'not all') {
    document.documentElement.style.display = 'none';
    document.head.insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="/static/stylesheets/themes/light.css" onload="document.documentElement.style.display = ``;">'
    );
}
