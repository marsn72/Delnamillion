import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';

import cleanCss from 'gulp-clean-css'; // Сжатие CSS файла
import autoprefixer from 'gulp-autoprefixer'; // Добавление вендорных префиксов
import groupCssMediaQueries from 'gulp-group-css-media-queries'; // Группировка медиа запросов

const sass = gulpSass(dartSass);

export const scss = ()=>{
  return app.gulp.src(app.path.src.scss, {sourcemap: app.isDev})
    .pipe(app.plugins.plumber(
      app.plugins.notify.onError({
        title: 'SCSS',
        message: 'Error: <%= error.message %>'
      })
    ))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
      .pipe(sass({
        outputStyle: 'expanded'
      }))
    .pipe(groupCssMediaQueries())
    .pipe(autoprefixer({
      grid: true,
      overrideBrowserslist: ["last 3 versions"],
      cascade: true
    }))
    // Раскомментировать если понадобится не сжатая копия файла стилей
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(cleanCss())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(app.gulp.dest(app.path.build.css))
    .pipe(app.plugins.browsersync.stream());
}