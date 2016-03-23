var gulp = require("gulp"),
    webserver = require("gulp-webserver");

gulp.task("webserver", function () {
    gulp.src("www")
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task("html", function () {
    gulp.src("./app/*.html")
        .pipe(gulp.dest("./www"));
});

gulp.task("js", function () {
    gulp.src("./app/**/*.js")
        .pipe(gulp.dest("./www/scripts/app"));

    gulp.src("./node_modules/angular/angular.js")
        .pipe(gulp.dest("./www/scripts/vendor/"));
});

gulp.task("watch", function () {
    gulp.watch(["./app/**/*.html"], ["html", "js"]);
});

gulp.task("build", ["html", "js"]);

gulp.task("run", ["build", "webserver", "watch"]);

gulp.task("default", ["webserver", "watch"]);
