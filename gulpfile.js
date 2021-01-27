require('dotenv').load();
var vendorScriptNames = require('./src/vendor/vendor.scripts.js');
var vendorStyleNames = require('./src/vendor/vendor.styles.js');
var lazyVendorFileNames = require('./src/vendor/vendor.lazy.js');
var imageFileNames = require('./src/assets/images.js');

var gulp = require('gulp');

var gutil = require('gulp-util');
var ngConfig = require('gulp-ng-config');
var fs = require('graceful-fs');
var config = require('./config.js');
var ip = require('ip');

var runSequence = require('run-sequence');
var del = require('del');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var ngAnnotate = require('gulp-ng-annotate');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');
var inject = require('gulp-inject');
var sass = require('gulp-sass');
var mergeJson = require('gulp-merge-json');
var mergeStream = require('merge-stream');
var minifyCSS = require('gulp-clean-css');
var CacheBuster = require('gulp-cachebust');
var cachebust = new CacheBuster();
var gulpIf = require('gulp-if');
var uglifyEs = require('gulp-uglify-es').default;
var replace = require('gulp-replace');
var zip = require('gulp-zip');

var BUILD_PORT = 3000;

//----------------------------------------------------------------------------------------------------------------------------------------------------

var PROFILE = gutil.env.profile || 'development';
var NO_MINIFY = gutil.env.noMinify === true;

console.log("PROFILE: " + PROFILE);
console.log("NO_MINIFY: " + NO_MINIFY);

//----------------------------------------------------------------------------------------------------------------------------------------------------

gulp.task('build', function() {
    runSequence(
        'buildDelete',
        'buildConfig',
        'buildConcatVendor',
        'buildIndexInject',
        'buildAppCss',
        'buildVendorCss',
        'buildMessages',
        'buildFonts',
        'buildCopyImages',
        'buildCopyCkeditor',
        'buildWatch'
    );
});

gulp.task('buildDelete', function() {
    return del('./build/**');
});

gulp.task('buildConfig', function() {
    
    var configJson = config[PROFILE];
    
    if(PROFILE === 'development') {
        configJson.ENV_VARS.frontUrl = 'http://' + ip.address() + ':' + BUILD_PORT;
    }
    
    fs.writeFileSync('./config.json', JSON.stringify(configJson));
    
    gulp.src('./config.json')
        .pipe(ngConfig('app.config', {createModule: true, pretty: true}))
        .pipe(gulp.dest('./build'))
});

gulp.task('buildConcatVendor', function(callback) {
    return gulp.src(vendorScriptNames)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./build'))
});

gulp.task('buildIndexInject', function() {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src([
        './src/app/app.js',
        './build/config.js',
        './src/app/**/*.module.js',
        './src/app/**/*.consts.js',
        './src/app/**/*.factory.js',
        './src/app/**/*.service.js',
        './src/app/_global/**/*.js'
    ], {read: false});
    
    return target.pipe(inject(sources)).pipe(gulp.dest('./build'));
});

gulp.task('buildAppCss', function() {
    return gulp.src('./src/assets/styles/app-styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/styles'));
});

gulp.task('buildVendorCss', function() {
    return gulp.src(vendorStyleNames)
        .pipe(concat('vendor-styles.css'))
        .pipe(gulp.dest('./build/styles'));
});

gulp.task('buildMessages', function() {
    var streamEl = gulp.src('./src/messages/el/**/*-el.json')
        .pipe(mergeJson({fileName: 'messages-el.json',}))
        .pipe(gulp.dest('./build/messages'));
    
    var streamEn = gulp.src('./src/messages/en/**/*-en.json')
        .pipe(mergeJson({fileName: 'messages-en.json',}))
        .pipe(gulp.dest('./build/messages'));
    
    return mergeStream(streamEl, streamEn);
});

gulp.task('buildFonts', function () {
    var fontPaths = [
        './node_modules/font-awesome/fonts/**/*',
        './src/vendor/modules/custom_modules/simple-line-icons/fonts/**/*',
        './src/vendor/modules/metronic/plugins/bootstrap/fonts/**/*'
    ];
    
    return gulp.src(fontPaths)
        .pipe(gulp.dest('./build/fonts'));
});

gulp.task('buildCopyImages', function() {
    var mainImageStream = gulp.src(imageFileNames)
        .pipe(gulp.dest('./build/images'));
    
    var cssImageStream = gulp.src([
        './src/vendor/modules/metronic/images/*',
        './src/vendor/modules/custom_modules/chosen/images/*',
        './src/vendor/modules/custom_modules/jstree/images/*'
    ])
        .pipe(gulp.dest('./build/images/css'));
    
    return mergeStream(mainImageStream, cssImageStream);
});

gulp.task('buildCopyCkeditor', function() {
    return gulp.src('./src/vendor/modules/custom_modules/ckeditor/**/*')
        .pipe(gulp.dest('./build/ckeditor'));
});

gulp.task('buildWatch', function() {
    
    browserSync.init({
        notify: false,
        open: 'external',
        server: {
            baseDir: ['./build', './'],
            middleware: [historyApiFallback()]
        },
        port: BUILD_PORT,
        startPath: "/"
    });
    
    watch('./src/app/**/*.html', function() {
        browserSync.reload();
    });
    
    watch('./src/app/**/*.js', function(vinyl) {
        if(vinyl.event === 'add' || vinyl.event === 'unlink') {
            runSequence('buildIndexInject', 'browserSyncReload');
        }
        else {
            gulp.start('browserSyncReload');
        }
    });
    
    watch('./src/assets/styles/**/*.scss', function() {
        runSequence('buildAppCss', 'browserSyncReload');
    });
    
    watch('./src/messages/**/*.json', function() {
        runSequence('buildMessages', 'browserSyncReload');
    });
    
});

gulp.task('browserSyncReload', function() {
    browserSync.reload();
});

//----------------------------------------------------------------------------------------------------------------------------------------------------

gulp.task('dist', function() {
    runSequence(
        'distDelete',
        'distConfig',
        'distConcatApp',
        'distConcatVendor',
        'distAppScripts',
        'distVendorScript',
        'distIndexInject',
        'distAppCss',
        'distVendorCss',
        'distMessages',
        'distFonts',
        'distCopyImages',
        'distCopyCkeditor',
        'distCopyFavicon',
        'distCachebustLazyResourcesPartOne',
        'distCachebustLazyResourcesPartTwo',
        'distCachebustLazyResourcesPartThree',
        'distCachebustLazyResourcesPartFour',
        'distCachebustResourcesPartOne',
        'distCachebustResourcesPartTwo',
        'distCopyAndCachebustLazyVendorResources',
        'distCopyAndCachebustHtmlFiles',
        'distReplaceReferences',
        'distCachebustReferences',
        'distZip'
    );
});

gulp.task('distDelete', function() {
    return del('./dist/**');
});

gulp.task('distConfig', function() {
    
    var configJson = config[PROFILE];
    
    if(PROFILE === 'development') {
        configJson.ENV_VARS.frontUrl = 'http://' + ip.address() + ':' + BUILD_PORT;
    }
    
    fs.writeFileSync('./config.json', JSON.stringify(configJson));
    
    gulp.src('./config.json')
        .pipe(ngConfig('app.config', {createModule: true, pretty: true}))
        .pipe(gulp.dest('./dist'))
});

gulp.task('distConcatApp', function(callback) {
    return gulp.src([
        './src/app/app.js',
        './src/app/**/*.module.js',
        './src/app/**/*.consts.js',
        './src/app/**/*.factory.js',
        './src/app/**/*.service.js',
        './src/app/_global/**/*.js'
    ])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('distConcatVendor', function(callback) {
    return gulp.src(vendorScriptNames)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist'))
});

gulp.task('distAppScripts', function() {
    
    var streamAppJs = gulp.src([
        './dist/app.js'
    ])
        .pipe(babel({
            presets: ['es2015', 'stage-0']
        }))
        .pipe(ngAnnotate())
        .pipe(gulpIf(!NO_MINIFY, uglifyEs()))
        .pipe(gulp.dest('./dist'));
    
    var streamOthers = gulp.src([
        './src/app/**/*.js',
        '!./src/app/app.js',
        '!./src/app/**/*.module.js',
        '!./src/app/**/*.consts.js',
        '!./src/app/**/*.factory.js',
        '!./src/app/**/*.service.js',
        '!./src/app/_global/**/*.js'
    ])
        .pipe(babel({
            presets: ['es2015', 'stage-0']
        }))
        .pipe(ngAnnotate())
        .pipe(gulpIf(!NO_MINIFY, uglifyEs()))
        .pipe(gulp.dest('./dist/app'));
    
    return mergeStream(streamAppJs, streamOthers);
});

gulp.task('distVendorScript', function() {
    return gulp.src(['./dist/vendor.js'])
        .pipe(uglifyEs())
        .pipe(gulp.dest('./dist'))
});

gulp.task('distIndexInject', function() {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src(['./dist/app.js', './dist/config.js'], {read: false});
    
    return target.pipe(inject(sources)).pipe(gulp.dest('./dist'));
});

gulp.task('distAppCss', function() {
    return gulp.src('./src/assets/styles/app-styles.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulpIf(!NO_MINIFY, minifyCSS()))
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('distVendorCss', function() {
    return gulp.src(vendorStyleNames)
        .pipe(concat('vendor-styles.css'))
        .pipe(gulpIf(!NO_MINIFY, minifyCSS()))
        .pipe(gulp.dest('./dist/styles'));
});

gulp.task('distMessages', function() {
    var streamEl = gulp.src('./src/messages/el/**/*-el.json')
        .pipe(mergeJson({fileName: 'messages-el.json',}))
        .pipe(gulp.dest('./dist/messages'));
    
    var streamEn = gulp.src('./src/messages/en/**/*-en.json')
        .pipe(mergeJson({fileName: 'messages-en.json',}))
        .pipe(gulp.dest('./dist/messages'));
    
    return mergeStream(streamEl, streamEn);
});

gulp.task('distFonts', function () {
    var fontPaths = [
        './node_modules/font-awesome/fonts/**/*',
        './src/vendor/modules/custom_modules/simple-line-icons/fonts/**/*',
        './src/vendor/modules/metronic/plugins/bootstrap/fonts/**/*'
    ];
    
    return gulp.src(fontPaths)
        .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('distCopyImages', function() {
    var mainImageStream = gulp.src(imageFileNames)
        .pipe(gulp.dest('./dist/images'));
    
    var cssImageStream = gulp.src([
        './src/vendor/modules/metronic/images/*',
        './src/vendor/modules/custom_modules/chosen/images/*',
        './src/vendor/modules/custom_modules/jstree/images/*'
    ])
        .pipe(gulp.dest('./dist/images/css'));
    
    return mergeStream(mainImageStream, cssImageStream);
});

gulp.task('distCopyCkeditor', function() {
    return gulp.src('./src/vendor/modules/custom_modules/ckeditor/**/*')
        .pipe(gulp.dest('./dist/ckeditor'));
});

gulp.task('distCopyFavicon', function() {
    return gulp.src('favicon.*')
        .pipe(gulp.dest('./dist'))
});

gulp.task('distCachebustLazyResourcesPartOne', function() {
    
    return gulp.src(['./dist/**/*.js', '!./dist/vendor.js', '!./dist/config.js', '!./dist/app.js', '!./dist/ckeditor/**/*'])
        .pipe(cachebust.resources())
        .pipe(gulp.dest('./tempdist'));
});

gulp.task('distCachebustLazyResourcesPartTwo', function() {
    
    return del(['./dist/**/*.js', '!./dist/vendor.js', '!./dist/config.js', '!./dist/app.js', '!./dist/ckeditor/**/*']);
});

gulp.task('distCachebustLazyResourcesPartThree', function() {
    
    return gulp.src(['./tempdist/**/*.js'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('distCachebustLazyResourcesPartFour', function() {
    
    return del(['./tempdist']);
});

gulp.task('distCachebustResourcesPartOne', function() {
    
    var streamJs = gulp.src(['./dist/vendor.js', './dist/config.js', './dist/app.js'])
        .pipe(cachebust.resources())
        .pipe(gulp.dest('./dist'));
    
    var streamCss = gulp.src(['./dist/styles/app-styles.css', './dist/styles/vendor-styles.css'])
        .pipe(cachebust.resources())
        .pipe(gulp.dest('./dist/styles'));
    
    return mergeStream(streamJs, streamCss);
});

gulp.task('distCachebustResourcesPartTwo', function() {
    
    return del(['./dist/vendor.js', './dist/config.js', './dist/app.js', './dist/styles/app-styles.css', './dist/styles/vendor-styles.css']);
});

gulp.task('distCopyAndCachebustLazyVendorResources', function() {
    
    var streamNodeModules = gulp.src(lazyVendorFileNames.nodeModules, {base: './node_modules'})
        .pipe(cachebust.resources())
        .pipe(gulp.dest('./dist/vendor'));
    
    var streamVendorModules = gulp.src(lazyVendorFileNames.vendorModules, {base: './src/vendor/modules'})
        .pipe(cachebust.resources())
        .pipe(gulp.dest('./dist/vendor'));
    
    return mergeStream(streamNodeModules, streamVendorModules);
});

gulp.task('distCopyAndCachebustHtmlFiles', function() {
    return gulp.src('./src/app/**/*.html')
        .pipe(cachebust.resources())
        .pipe(gulp.dest('./dist/app'));
});

gulp.task('distReplaceReferences', function() {
    return gulp.src('./dist/**/*')
        .pipe(replace('/src/app/', '/app/'))
        .pipe(replace('"/dist/', '"/'))
        .pipe(replace('\'/dist/', '\'/'))
        .pipe(replace('./node_modules/', './vendor/'))
        .pipe(replace('./src/vendor/modules/', './vendor/'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('distCachebustReferences', function() {
    return gulp.src(['./dist/index.html', './dist/**/*.js', './dist/**/*.html', '!./dist/ckeditor/**/*'])
        .pipe(cachebust.references())
        .pipe(gulp.dest('./dist'));
});

gulp.task('distZip', function() {
    var zipName = config[PROFILE].ENV_VARS.name + '-' + config[PROFILE].ENV_VARS.version + '-' + config[PROFILE].ENV_VARS.profile + '.zip';
    
    return gulp.src('./dist/**/*')
        .pipe(zip(zipName))
        .pipe(gulp.dest('./releases'));
});