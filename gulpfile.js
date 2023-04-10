const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const prefix = require('gulp-autoprefixer');
const browserSync = require('browser-sync');

gulp.task('copyUswdsFonts',
  () => gulp.src([
    './node_modules/uswds/dist/fonts/**/*'
  ]).pipe(gulp.dest('./assets/fonts'))
);

gulp.task('copyUswdsImages',
  () => gulp.src([
    './node_modules/uswds/dist/img/**/*'
  ]).pipe(gulp.dest('./assets/img/uswds/'))
);

gulp.task('vendorJs',
  () => gulp.src([
    './node_modules/anchor-js/anchor.min.js',
    './node_modules/uswds/dist/js/*'
  ]).pipe(gulp.dest('./assets/js/'))
)

gulp.task('sass',
  () => gulp.src('assets/css/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
        outputStyle: 'compressed',
        onError: browserSync.notify,
        includePaths: [
          './_sass/',
          './node_modules/uswds/dist/',
        ]
    }))
    .pipe(prefix(['last 2 versions', '> 2%', 'IE 11', 'not dead'], { cascade: true }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('_site/assets/css'))
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/css'))
);