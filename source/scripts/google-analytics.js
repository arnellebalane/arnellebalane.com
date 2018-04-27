// Based on https://www.miguel.nz/blog/how-to-use-google-analytics-with-vue-cli-and-webpack/
export function initialize() {
    window.ga = window.ga || function() {
        (ga.q = ga.q || []).push(arguments);
    };
    ga.l = Date.now();

    ga('create', 'UA-82213717-1', 'auto');
    ga('send', 'pageview');
};
