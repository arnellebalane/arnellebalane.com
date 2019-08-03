#!/bin/sh

glyphhanger --formats=woff2 --subset=source/static/fonts/Gilroy/Gilroy-Regular.ttf --US_ASCII
glyphhanger --formats=woff2 --subset=source/static/fonts/Gilroy/Gilroy-Heavy.ttf --US_ASCII
glyphhanger --formats=woff2 --subset=source/static/fonts/Gilroy/Gilroy-Bold.ttf --whitelist=@arnellebalane
