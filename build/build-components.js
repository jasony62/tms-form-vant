/**
 * Compile components
 */
const fs = require('fs-extra')
const path = require('path')

const libDir = path.join(__dirname, '../lib')
const srcDir = path.join(__dirname, '../src')

// clear dir
fs.emptyDirSync(libDir)

// compile lib dir
//process.env.BABEL_MODULE = 'commonjs'
fs.copySync(srcDir, libDir)
