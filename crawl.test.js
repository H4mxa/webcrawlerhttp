const { normalizeURL, getURLsFromHTML } = require("./crawl.js");
const { test, expect } = require("@jest/globals");

test("normalizeURL strip protocol", () => {
  const input = "https://example.com/path";
  const actual = normalizeURL(input);
  const expected = "example.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip trailing slash", () => {
  const input = "https://example.com/path/";
  const actual = normalizeURL(input);
  const expected = "example.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL capitals", () => {
  const input = "https://Example.com/path";
  const actual = normalizeURL(input);
  const expected = "example.com/path";
  expect(actual).toEqual(expected);
});

test("normalizeURL strip http", () => {
  const input = "http://example.com/path";
  const actual = normalizeURL(input);
  const expected = "example.com/path";
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML absolute", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="http://example.com/path/"></a>
    </body>
  </html>`;
  const inputBaseURL = "http://example.com/path/";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["http://example.com/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML relative", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/path/"></a>
    </body>
  </html>`;
  const inputBaseURL = "http://example.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["http://example.com/path/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML both", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="http://example.com/path1/">Example path 1</a>
      <a href="/path2/">Example path 2</a>
    </body>
  </html>`;
  const inputBaseURL = "http://example.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = ["http://example.com/path1/", "http://example.com/path2/"];
  expect(actual).toEqual(expected);
});

test("getURLsFromHTML invalid", () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="invalid">Invalid</a>
    </body>
  </html>`;
  const inputBaseURL = "http://example.com";
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
  const expected = [];
  expect(actual).toEqual(expected);
});
