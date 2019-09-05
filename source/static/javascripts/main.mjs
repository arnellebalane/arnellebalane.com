// Load Web fonts programmatically using the Font Loading API
// `PAGE_FONTS` is defined in a <script> tag in the template.

function supportsVariableFonts() {
    if (!('CSS' in window) || !('supports' in window.CSS)) {
        return false;
    }
    return CSS.supports('(font-variation-settings: normal)');
}

if (!supportsVariableFonts()) {
    if (document.fonts) {
        Promise.all(PAGE_FONTS.map(async fontUrl => {
            const [_, name, weight, style] = fontUrl.match(/(\w+)-(\d+)-(\w+)-\w+(?:\.\w+)?\.\w+$/);
            const font = new FontFace(name, `url("${fontUrl}")`, {weight, style});
            await font.load();
            document.fonts.add(font)
        })).then(() => {
            document.body.classList.add('fontsLoaded');
        });
    } else {
        document.body.classList.add('fontsLoaded');
    }
}



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
