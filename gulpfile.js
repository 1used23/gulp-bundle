const   gulp = require('gulp'),
        sass = require('gulp-sass'),
        browserSync = require('browser-sync'),
        pug = require('gulp-pug');

gulp.task('sass', function() {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true })) //обновляем CSS на странице при изменении 
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'app'  //директория для сервера 
        }
    });
});

gulp.task('scripts', function() {
    return gulp.src(['app/js/common.js', 'app/libs/**/*.js'])
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('pug', function() {
    return gulp.src('app/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
    gulp.watch('app/pug/*.pug', gulp.parallel('pug'));
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
    gulp.watch('app/*.html', gulp.parallel('html'));
    gulp.watch('app/js/common.js', gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('pug', 'sass', 'browser-sync', 'watch'));