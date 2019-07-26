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
