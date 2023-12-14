const { crawlPage } = require('./crawl')
const { printReport } = require('./report.js')

let { flags } = require('./crawl.js')

async function main() {
  if (process.argv.length < 3) {
    console.log('No website provided')
    process.exit(1)
  }
  if (process.argv.length > 4) {
    console.log('Too many command line args')
    process.exit(1)
  }
  if (process.argv.includes('-h') || process.argv.includes('-H')) {
    console.log('usage node main.js websiteLink [options]')
    console.log('-h for help')
    console.log('-e to supress errors')
    console.log('-r to show report only')
    console.log('-f to record output in output.txt')
    process.exit(0)
  }

  if (process.argv.includes('-r')) {
    flags.recordOnly = true
  }

  if (process.argv.includes('-f')) {
    flags.fileOutput = true
  }

  if (process.argv.includes('-e')) {
    flags.supressErrors = true
  }

  const baseURL = process.argv[2]

  console.log(`starting crawl of ${baseURL}`)

  const pages = await crawlPage(baseURL, baseURL, {})
  printReport(pages)
}

main()
