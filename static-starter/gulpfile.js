var gulp = require("gulp");
var browserSync = require("browser-sync");
var sass = require("gulp-sass");
var terser = require("gulp-terser");

gulp.task("sass", () => {
  return gulp
    .src("./scss/*.scss")
    .pipe(sass())
    .pipe(gulp.dest("public/"))
    .pipe(browserSync.stream());
});

gulp.task("js", () => {
  console.log("gulp");
  return gulp
    .src("./js/*.js", { sourcemaps: true })
    .pipe(terser())
    .pipe(gulp.dest("public/", { sourcemaps: "." }));
});

gulp.task(
  "start",
  gulp.series("sass", function () {
    browserSync.init({
      server: "./",
    });

    gulp.watch("scss/*.scss", gulp.series("sass"));
    gulp.watch("./*.html").on("change", browserSync.reload);
    gulp.watch("js/*.js", gulp.series("js"));
  })
);

gulp.task("default", gulp.series("start"));
