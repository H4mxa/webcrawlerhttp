const { crawlPage } = require('./crawl')
const { printReport } = require('./report.js')

async function main() {
  if (process.argv.length < 3) {
    console.log('No website provided')
    process.exit(1)
  }
  // if (process.argv.length > 3) {
  //   console.log("Too many command line args");
  //   process.exit(1);
  // }
  if (process.argv.includes('-h') || process.argv.includes('-H')) {
    console.log('usage node main link')
    console.log('-h for help')
    // console.log('-E to remove error')
    console.log('-R to show report only')
    console.log('-f to record output in output.txt')
    process.exit(0)
  }
  const baseURL = process.argv[2]

  console.log(`starting crawl of ${baseURL}`)

  const pages = await crawlPage(baseURL, baseURL, {}, err)
  printReport(pages)
}

main()
