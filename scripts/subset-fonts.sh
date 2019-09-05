#!/bin/sh

glyphhanger --formats=woff --subset=source/static/fonts/Inter/Inter-900-normal.woff --US_ASCII
glyphhanger --formats=woff --subset=source/static/fonts/Inter/Inter-900-italic.woff --US_ASCII
glyphhanger --formats=woff --subset=source/static/fonts/Inter/Inter-700-normal.woff --US_ASCII
glyphhanger --formats=woff --subset=source/static/fonts/Inter/Inter-700-italic.woff --US_ASCII
glyphhanger --formats=woff --subset=source/static/fonts/Inter/Inter-400-italic.woff --US_ASCII
glyphhanger --formats=woff --subset=source/static/fonts/Inter/Inter-400-normal.woff --US_ASCII
glyphhanger --formats=woff --subset=source/static/fonts/Inter/Inter-300-normal.woff --whitelist=HomeBlogEventsProjects
