const { JSDOM } = require('jsdom')
const fetch = require('node-fetch')

async function crawlPage(baseURL, currentURL, pages) {
  const baseURLObj = new URL(baseURL)
  const currentURLObj = new URL(currentURL)
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages
  }

  const normalizedCurrentURL = normalizeURL(currentURL)

  if (pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL]++
    return pages
  }

  pages[normalizedCurrentURL] = 1

  console.log(`actively crawling: ${currentURL}`)

  try {
    const respone = await fetch(currentURL)
    if (respone.status > 399) {
      console.log(
        `error in fetch with status code: ${respone.status} on page: ${currentURL}`
      )
      return pages
    }

    const contentType = respone.headers.get('Content-Type')
    if (!contentType.includes('text/html')) {
      console.log(
        `Non html reponse, content type: ${contentType} on page: ${currentURL}`
      )
      return pages
    }

    const htmlBody = await respone.text()

    const nextURLs = getURLsFromHTML(htmlBody, baseURL)

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages)
    }
  } catch (error) {
    console.log(`Error in fetch ${error.message}, on page ${currentURL}`)
  }

  return pages
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = []
  const dom = new JSDOM(htmlBody)
  const linkElements = dom.window.document.querySelectorAll('a')
  for (const linkElement of linkElements) {
    if (!linkElement.href) {
      continue
    } else if (linkElement.href.slice(0, 1) === '/') {
      // relative
      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`)
        urls.push(urlObj.href)
      } catch (error) {
        if (flags.supressErrors) {
          console.log(`error with relative url: ${error.message}`)
          console.log('Link is a file wiht name: ', linkElement.href)
        }
      }
    } else {
      // absolute
      try {
        const urlObj = new URL(linkElement.href)
        urls.push(urlObj.href)
      } catch (error) {
        // console.log(linkElement)
        if (flags.supressErrors) {
          console.log(`error with absolute url: ${error.message}`)
          console.log('Link is a file wiht name: ', linkElement.href)
        }
      }
    }
  }
  return urls
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString)
  const hostpath = `${urlObj.hostname}${urlObj.pathname}`
  if (hostpath.length > 0 && hostpath.slice(-1) === '/') {
    return hostpath.slice(0, -1)
  }
  return hostpath
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
}
