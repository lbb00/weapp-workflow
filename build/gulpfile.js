/**
 * This is a interesting build file
 * It can help you develop wapp faster
 * It will help you complete the following task:
 *  - delete the dist folder
 *  - buid all the files under src folder
 *   - vue -> json/js/wxss/wxml
 *   - less -> wxss
 *   - pug -> wxml
 *   - compress image
 *  - observe all the fiels under src folder and buidl it auto run build
 *  - output these processed files to dist folder
 *
 * Usage:
 *  Clear dist folder:
 *   - gulp4 folder
 *  Just build once:
 *   - gulp4 build
 *  Build & Observe:
 *   - gulp4 dev
 */

const gulp = require('gulp4')
const watch = require('gulp-watch')
const del = require('del')
const path = require('path')
const rename = require('gulp-rename')
const less = require('gulp-less')
const cleanCss = require('gulp-clean-css')
const components = require('gulp-single-file-components')
const gulpPug = require('gulp-pug')
const gulpImagemin = require('gulp-imagemin')
const pug = require('pug')
require('colors')

// path config
const distDir = path.join(__dirname, '../dist')
const srcDir = path.join(__dirname, '../src')

/**
 * get the file extension name
 *
 * @param {any} fileFullName
 * @returns
 */
const getFileExtension = (fileFullName) => {
  return fileFullName.substr(fileFullName.lastIndexOf('.') + 1).toLowerCase()
}

/**
 * get the location of the relative to src
 *
 * @param {any} filePath
 * @returns {string}
 */
const getFilePathRelative = (filePath) => {
  return path.relative(srcDir, filePath)
}

/**
 * console info
 */
const info = (type, content) => {
  let date = new Date()
  let dateStr = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  console.log(`[${dateStr.gray}] ${type.green} ${content}`)
}

/**
 * image compiler
 */
const imagemin = () => {
  return gulpImagemin([
    gulpImagemin.gifsicle({
      interlaced: true // 类型：Boolean 默认：false 隔行扫描gif进行渲染
    }),
    gulpImagemin.jpegtran({
      progressive: true // 类型：Boolean 默认：false 无损压缩jpg图片
    }),
    gulpImagemin.optipng({
      optimizationLevel: 5 // 类型：Number  默认：3  取值范围：0-7（优化等级）
    }),
    gulpImagemin.svgo({
      plugins: [
        { removeViewBox: true },
        { cleanupIDs: false }
      ]
    })
  ])
}

/**
 * pug compiler
 */
const gPug = () => {
  return gulpPug({
    doctype: 'html'
  })
}

/**
 * sfc compiler
 */
const sfcCompiler = () => {
  return components({
    customCompilers: {
      script: function (content, cb, compiler, filePath) {
        cb(null, content)
      },
      pug: function (content, cb, compiler, filePath) {
        content = pug.render(content, { doctype: 'html' })
        cb(null, content)
      }
    },
    tags: {
      json (lang, filePath, node) {
        return 'json'
      },
      config (lang, filePath, node) {
        return 'json'
      },
      template (lang, filePath, node) {
        return 'wxml'
      },
      style () {
        return 'wxss'
      },
      script () {
        return 'js'
      }
    },
    outputModifiers: {
      script: function (lang, filePath, content, basePath) {
        return content
      }
    }
  })
}

/**
 * cancel sfc compiler
 */
const sfcCancelCompiler = () => {
  return components({
    customCompilers: {
      script: function (content, cb, compiler, filePath) {
        cb(null, content)
      },
      pug: function (content, cb, compiler, filePath) {
        cb(null, content)
      },
      less: function (content, cb, compiler, filePath) {
        cb(null, content)
      }
    },
    tags: {
      json (lang, filePath, node) {
        return 'json'
      },
      config (lang, filePath, node) {
        return 'json'
      },
      template (lang, filePath, node) {
        return lang || 'wxml'
      },
      style (lang, filePath, node) {
        return lang || 'css'
      },
      script (lang, filePath, node) {
        return lang || 'js'
      }
    }
  })
}

// ----------------------------------------------
// ----------------- dev handler ----------------
// ----------------------------------------------

/**
 * handle - less to wxss
 *
 * @param {any} filePath
 * @returns
 */
const less2wxss = (filePath) => {
  let mDistDir = path.dirname(path.join(distDir, getFilePathRelative(filePath)))
  info('less', filePath)
  return gulp.src(filePath)
    .pipe(less({
      plugins: []
    }))
    .pipe(rename((_path) => {
      _path.extname = '.wxss'
    }))
    .pipe(gulp.dest(mDistDir))
}

/**
 * handle - pug to wxml
 */
const pug2wxml = (filePath) => {
  let mDistDir = path.dirname(path.join(distDir, getFilePathRelative(filePath)))
  info('pug', filePath)
  return gulp.src(filePath)
    .pipe(gPug())
    .pipe(rename((_path) => {
      _path.extname = '.wxml'
    }))
    .pipe(gulp.dest(mDistDir))
}

/**
 * handle - compress image
 */
const compressImg = (filePath) => {
  let mDistDir = path.dirname(path.join(distDir, getFilePathRelative(filePath)))
  info('compress', filePath)
  return gulp.src(filePath)
    .pipe(imagemin())
    .pipe(gulp.dest(mDistDir))
}

/**
 * handle - single-file components
 */
const parseSFC = (filePath) => {
  let mDistDir = path.dirname(path.join(distDir, getFilePathRelative(filePath)))
  info('SFC', filePath)
  try {
    return gulp.src(filePath)
      .pipe(sfcCompiler())
      .pipe(gulp.dest(mDistDir))
  } catch (e) {
    console.error(e)
    return Promise.resolve()
  }
}

/**
 * handle - other file
 *
 * @param {any} filePath
 * @returns {promise}
 */
const baseDist = (filePath) => {
  let mDistDir = path.dirname(path.join(distDir, getFilePathRelative(filePath)))
  info('other', filePath)
  return gulp.src(filePath)
    .pipe(gulp.dest(mDistDir))
}

/**
 * watcher
 * @param {any} e
 */
const watchFile = () => {
  const watcher = watch('src/**/*.*', (e) => {
    let ext = getFileExtension(e.path)
    if (ext === 'less') {
      less2wxss(e.path)
    } else if (ext === 'pug') {
      pug2wxml(e.path)
    } else if (ext === 'vue') {
      parseSFC(e.path)
    } else if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.svg' || ext === '.gif') {
      compressImg(e.path)
    } else {
      baseDist(e.path)
    }
    return watcher
  })
}

// ------------------------------------------------
// ----------------- build handler ----------------
// ------------------------------------------------

/**
 * build - single-file components
 * @returns
 */
const buildSFC = () => {
  return gulp.src('src/**/*.vue')
    .pipe(rename((_path) => {
      info('build', `${_path.dirname}/${_path.basename}${_path.extname}`)
    }))
    .pipe(sfcCompiler())
    .pipe(gulp.dest('./dist'))
}

/**
 * build - less to wxss
 */
const buildLess = () => {
  return gulp.src('src/**/*.less')
    .pipe(less({
      plugins: []
    }))
    .pipe(cleanCss())
    .pipe(rename((_path) => {
      info('build', `${_path.dirname}/${_path.basename}${_path.extname}`)
      _path.extname = '.wxss'
    }))
    .pipe(gulp.dest('./dist'))
}

/**
 * build - pug to wxml
 */
const buildPug = () => {
  return gulp.src('src/**/*.pug')
    .pipe(gPug())
    .pipe(rename((_path) => {
      info('build', `${_path.dirname}/${_path.basename}${_path.extname}`)
      _path.extname = '.wxml'
    }))
    .pipe(gulp.dest('./dist'))
}

/**
 * build - compress image
 */
const buildCompressImg = () => {
  return gulp.src('./src/imgs/**/*')
    .pipe(imagemin())
    .pipe(rename((_path) => {
      info('compress', `${_path.dirname}/${_path.basename}${_path.extname}`)
    }))
    .pipe(gulp.dest(path.join(distDir, '/imgs')))
}

/**
 * build - other file
 */
const buildOther = () => {
  return gulp.src([
    './src/{pages,components}/**/{*.wxss,*.js,*.json,*.wxml}',
    './src/!(pages|components|imgs)/**/*',
    './src/app.js',
    './src/app.json',
    './src/app.wxss',
    './src/config.js'])
    .pipe(rename((_path) => {
      info('other', `${_path.dirname}/${_path.basename}${_path.extname}`)
    }))
    .pipe(gulp.dest(distDir))
}

// --------------------------------------------
// ----------------- gulp task ----------------
// --------------------------------------------

/**
 * task - clear-dist
 */
gulp.task('clear-dist', () => {
  return del([
    'dist'
  ])
})

/**
 * task - build
 */
gulp.task(
  'build',
  gulp.series(
    'clear-dist',
    gulp.parallel(
      buildSFC,
      buildLess,
      buildPug,
      buildCompressImg,
      buildOther
    )
  )
)

/**
 * task - dev
 */
gulp.task(
  'dev',
  gulp.series(
    'build',
    watchFile
  )
)

//  --------------------
// | gulp support task  |
// | be care!           |
//  --------------------

/**
 * task - cancel sfc
 * if you don`t want to use single file components
 */
gulp.task('cancel-sfc', () => {
  return gulp.src('src/**/*.vue')
    .pipe(rename((_path) => {
      info('cancel-sfc', `${_path.dirname}/${_path.basename}${_path.extname}`)
    }))
    .pipe(sfcCancelCompiler())
    .pipe(rename((_path) => {
      console.log('111')
    }))
    .pipe(gulp.dest('./src'))
})

/**
 * task - delete all sfc
 */
gulp.task('del-sfc', () => {
  return del(['src/**/*.vue'])
})
