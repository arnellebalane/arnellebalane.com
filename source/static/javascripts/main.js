// Fallback when DarkModeToggle doesn't get loaded, explicitly load the
// light theme instead.

if (window.matchMedia('(prefers-color-scheme: no-preference)').media === 'not all') {
    document.documentElement.style.display = 'none';
    document.head.insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="/static/stylesheets/themes/light.css" onload="document.documentElement.style.display = ``;">'
    );
}
