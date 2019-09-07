document.addEventListener('DOMContentLoaded', () => {
    const link = document.querySelector('.js-Share');
    const url = location.origin + location.pathname

    if (navigator.share) {
        link.textContent = 'Share this article';
        link.addEventListener('click', async event => {
            event.preventDefault();

            await navigator.share({
                title: document.title,
                text: document.title,
                url
            });
        });

    } else {
        const title = document.title.replace(/|\s*Arnelle Balane$/, '');
        const text = `"${title}" by @arnellebalane: ${url}`;
        link.textContent = 'Tweet this article';
        link.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    }
});
