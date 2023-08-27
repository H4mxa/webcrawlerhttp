const { sortPages } = require("./report.js");
const { test, expect } = require("@jest/globals");

test("sortPages 2 pages", () => {
  const input = {
    "https://example.com/path": 1,
    "https://example.com": 3,
  };

  const actual = sortPages(input);
  const expected = [
    ["https://example.com", 3],
    ["https://example.com/path", 1],
  ];
  expect(actual).toEqual(expected);
});

test("sortPages 5 pages", () => {
  const input = {
    "https://example.com/path": 1,
    "https://example.com": 3,
    "https://example.com/path2": 2,
    "https://example.com/path3": 5,
    "https://example.com/path4": 9,
  };

  const actual = sortPages(input);
  const expected = [
    ["https://example.com/path4", 9],
    ["https://example.com/path3", 5],
    ["https://example.com", 3],
    ["https://example.com/path2", 2],
    ["https://example.com/path", 1],
  ];
  expect(actual).toEqual(expected);
});
