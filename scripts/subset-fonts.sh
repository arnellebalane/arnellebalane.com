#!/bin/sh

glyphhanger --formats=woff2 --subset=source/static/fonts/Inter/Inter-variable-upright.woff2 --US_ASCII
glyphhanger --formats=woff2 --subset=source/static/fonts/Inter/Inter-variable-italic.woff2 --US_ASCII
glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-900-normal.woff2 --US_ASCII
glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-900-italic.woff2 --US_ASCII
glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-700-normal.woff2 --US_ASCII
glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-700-italic.woff2 --US_ASCII
glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-400-normal.woff2 --US_ASCII
glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-400-italic.woff2 --US_ASCII
glyphhanger --formats=woff,woff2 --subset=source/static/fonts/Inter/Inter-300-normal.woff2 --whitelist=HomeBlogEventsProjects
