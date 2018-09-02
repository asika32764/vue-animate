/**
 * Part of fusion project.
 *
 * @copyright  Copyright (C) 2018 Asikart.
 * @license    MIT
 */

const fusion = require('windwalker-fusion');

// The task `sass`
fusion.task('sass', function () {
  // Watch start
  fusion.watch('src/sass/**/*.scss');
  // Watch end

  // Compile Start
  fusion.sass('src/sass/**/vue2-animate.scss', 'dist/vue2-animate.css');
  fusion.copy('dist/*', 'docs/dist/');
  // Compile end
});

// The task `less`
fusion.task('less', function () {
  // Watch start
  fusion.watch('src/less/**/*.less');
  // Watch end

  // Compile Start
  fusion.less('src/less/**/vue2-animate.less', 'dist/vue2-animate.css');
  // Compile end
});

fusion.default(['sass']);

/*
 * APIs
 *
 * Compile entry:
 * fusion.js(source, dest, options = {})
 * fusion.babel(source, dest, options = {})
 * fusion.ts(source, dest, options = {})
 * fusion.typeScript(source, dest, options = {})
 * fusion.css(source, dest, options = {})
 * fusion.less(source, dest, options = {})
 * fusion.sass(source, dest, options = {})
 * fusion.copy(source, dest, options = {})
 *
 * Live Reload:
 * fusion.livereload(source, dest, options = {})
 * fusion.reload(file)
 *
 * Gulp proxy:
 * fusion.src(source, options)
 * fusion.dest(path, options)
 * fusion.task(name, deps, fn)
 * fusion.watch(glob, opt, fn)
 *
 * Stream Helper:
 * fusion.through(handler) // Same as through2.obj()
 *
 * Config:
 * fusion.disableNotification()
 * fusion.enableNotification()
 */
