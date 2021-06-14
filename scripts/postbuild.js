const fs = require('fs')
const fse = require('fs-extra')

const BUILD_DIR = 'dist'

/**
 * Copy files and dir
 */
fse.copy('devtool', `${BUILD_DIR}/devtool`, (err) => {
  if (err) {
    console.error(err) // eslint-disable-line
  }
})

fs.copyFile('manifest.json', `${BUILD_DIR}/manifest.json`, (err) => {
  if (err) {
    console.error(err) // eslint-disable-line
  }
})

/**
 * Replace cloudinary path that is not accessible from chrome extension
 */
const ASSETS_DIR = `${BUILD_DIR}/assets`
const assetsDirContent = fs.readdirSync(ASSETS_DIR)
const vendorFileRelativePath = assetsDirContent.find((el) =>
  el.match(/vendor.*\.js/)
)
const vendorFilePath = `${ASSETS_DIR}/${vendorFileRelativePath}`

fs.readFile(vendorFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err) // eslint-disable-line
  }
  const result = data.replace(
    /"\/\/res.cloudinary.com/g,
    '"https://res.cloudinary.com'
  )

  fs.writeFile(vendorFilePath, result, 'utf8', (writeErr) => {
    if (err) {
      console.error(writeErr) // eslint-disable-line
    }
  })
})
