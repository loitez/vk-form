const {src, dest, series, watch} = require('gulp')
const csso = require('gulp-csso')
const sass = require('gulp-sass')(require('sass'))
const include = require('gulp-file-include')
const del = require('del')
const sync = require('browser-sync').create()



function html() {
    return src('src/**.html')
        .pipe(include({
            prefix: '@@'
        }))
        .pipe(dest('public/dist'))
}

function scss() {
    return src('src/scss/**.scss')
        .pipe(sass())
        .pipe(dest('public/dist/css'))
}

function clear() {
    return del('dist')
}

function serve() {
    sync.init({
        server: {
            baseDir: 'public'
        }
    })
    watch('src/**.html', series(html)).on('change', sync.reload)
    watch('src/scss/**.scss', series(scss)).on('change', sync.reload)
}


exports.build = series(clear, scss, html)
exports.dev = series(clear, scss, html, serve)
exports.clear = clear;