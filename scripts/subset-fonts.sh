#!/bin/sh

glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-Black.woff2 --US_ASCII
glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-BlackItalic.woff2 --US_ASCII
glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-Bold.woff2 --US_ASCII
glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-BoldItalic.woff2 --US_ASCII
glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-Italic.woff2 --US_ASCII
glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-Light-BETA.woff2 --whitelist=HomeBlogEventsProjects
glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-Regular.woff2 --US_ASCII
