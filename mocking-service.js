function MockService(browser) {
  const [domain, port] = browser.config.capabilities.proxy.sslProxy.split(":");
  const mockServerClient = require("mockserver-client").mockServerClient(
    domain,
    port
  );

  const mockHttpRequest = async props => {
    try {
      await mockServerClient.mockAnyResponse({
        httpRequest: {
          method: props.method || "GET",
          path: props.path,
          body: props.body || ".*"
        },
        httpResponse: {
          statusCode: props.statusCode || 200,
          body: props.response,
          delay: {
            timeUnit: "SECONDS",
            value: props.delay || 0
          }
        }
      });
    } catch (error) {
      console.log(
        `Catched an error when connecting to the mock server: ${error}`
      );
    }
  };

  /* API */
  this.mockHttpRequest = mockHttpRequest;
}

module.exports = MockService;
