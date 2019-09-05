// Load Web fonts programmatically using the Font Loading API
// `PAGE_FONTS` is defined in a <script> tag in the template.

function supportsVariableFonts() {
    if (!('CSS' in window) || !('supports' in window.CSS)) {
        return false;
    }
    return CSS.supports('(font-variation-settings: normal)');
}

const fontUrl = supportsVariableFonts()
    ? '/static/fonts/Inter/Inter-variable-upright-subset.woff2'
    : '/static/fonts/Inter/Inter-400-normal-subset.woff2';

const font = new FontFace('Inter', `url("${fontUrl}")`);
font.load().then(() => {
    document.fonts.add(font);
    document.body.classList.add('fontsLoaded');
});



import('https://unpkg.com/dark-mode-toggle').then(() => {
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
});



// NOTE: If prefers-color-scheme is not supported, we fallback to just using
// the light theme.

if (window.matchMedia('(prefers-color-scheme: no-preference)').media === 'not all') {
    document.documentElement.style.display = 'none';
    document.head.insertAdjacentHTML(
        'beforeend',
        '<link rel="stylesheet" href="/static/stylesheets/themes/light.css" onload="document.documentElement.style.display = ``;">'
    );
}



// Register the ServiceWorker after the page loads.

if ('serviceWorker' in navigator) {
    const channel = new BroadcastChannel('page-updated');
    channel.addEventListener('message', event => {
        const url = event.data.payload.updatedURL;
        if (url === location.href) {
            displaySnackbar({
                text: 'Page update available.',
                action: 'Refresh',
                callback: () => location.reload()
            });
        }
    });
}

async function displaySnackbar({text, action, callback}={}) {
    document.head.insertAdjacentHTML('beforeend',
        '<link rel="stylesheet" href="/static/stylesheets/components/snackbars.css">'
    );
    document.body.insertAdjacentHTML('beforeend', `
        <div class="Snackbar">
            <p class="Snackbar__Text">${text}</p>
            <button class="Snackbar__Action" onclick="(${callback})()">${action}</button>
        </div>
    `);
}
