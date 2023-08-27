const { JSDOM } = require("jsdom");
const fetch = require("node-fetch");

async function crawlPage(currentURL) {
  console.log(`actively crawling ${currentURL}`);

  try {
    const respone = await fetch(currentURL);
    if (respone.status > 399) {
      console.log(
        `error in fetch with status code: ${respone.status} on page: ${currentURL}`
      );
      return;
    }

    const contentType = respone.headers.get("Content-Type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Non html reponse, content type: ${contentType} on page: ${currentURL}`
      );
      retyrn;
    }

    console.log(await respone.text());
  } catch (error) {
    console.log(`Error in fetch ${error.message}, on page ${currentURL}`);
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");
  for (const linkElement of linkElements) {
    if (linkElement.href.slice(0, 1) === "/") {
      // relative

      try {
        const urlObj = new URL(`${baseURL}${linkElement.href}`);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with relative url: ${error.message}`);
      }
    } else {
      // absolute
      try {
        const urlObj = new URL(linkElement.href);
        urls.push(urlObj.href);
      } catch (error) {
        console.log(`error with absolute url: ${error.message}`);
      }
    }
  }
  return urls;
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  const hostpath = `${urlObj.hostname}${urlObj.pathname}`;
  if (hostpath.length > 0 && hostpath.slice(-1) === "/") {
    return hostpath.slice(0, -1);
  }
  return hostpath;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage,
};
