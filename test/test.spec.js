const assert = require("assert");
const MockService = require("../mocking-service");

const mockService = new MockService(browser);

before(() => {
  mockService.mockHttpRequest({
    path: ".*pulls.*.*",
    response: "[]",
    method: "GET",
    statusCode: 200,
    delay: 0
  });
  mockService.mockHttpRequest({
    path: ".*issues.*.*",
    response: "[]",
    method: "GET",
    statusCode: 200,
    delay: 0
  });
});

describe("Test NPMJS 1", () => {
  it("Test the NPMJS 1", () => {
    browser.url(`https://www.npmjs.com/package/react-redux`);

    browser.waitUntil(() => {
      return $$(".n8Z-E .zE7yA")[0].getText() === "0";
    }, 15000);
    browser.waitUntil(() => {
      return $$(".n8Z-E .zE7yA")[1].getText() === "0";
    }, 15000);
    assert.equal($$(".n8Z-E .zE7yA")[0].getText(), "0");
  });
});
