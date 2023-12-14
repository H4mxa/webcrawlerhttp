const fs = require('fs')

let { flags } = require('./crawl')

// creting log file
fs.writeFile('logs/outputLog.log', '', function (err, file) {
  if (err) throw err
})

const outputLog = fs.createWriteStream('logs/outputLog.log')

const consoler = new console.Console(outputLog)

function printReport(pages) {
  if (flags.fileOutput) {
    consoler.log('================================================')
    consoler.log('REPORT')
    consoler.log('================================================')
  } else {
    console.log('================================================')
    console.log('REPORT')
    console.log('================================================')
  }

  const sortedPages = sortPages(pages)
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0]
    const hits = sortedPage[1]
    if (flags.fileOutput) {
      consoler.log(`Found ${hits} links to page: ${url}`)
    } else {
      console.log(`Found ${hits} links to page: ${url}`)
    }
  }

  if (flags.fileOutput) {
    consoler.log('================================================')
    consoler.log('END REPORT')
    consoler.log('================================================')
  } else {
    console.log('================================================')
    console.log('END REPORT')
    console.log('================================================')
  }
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages)
  pagesArr.sort((a, b) => {
    aHits = a[1]
    bHits = b[1]

    return b[1] - a[1]
  })

  return pagesArr
}

module.exports = {
  sortPages,
  printReport,
}
