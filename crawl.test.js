const { normalizeURL } = require("./crawl.js");
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