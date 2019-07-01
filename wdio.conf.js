const { spawn } = require("child_process");
const pidtree = require("pidtree");
const process = require("process");

let proxyProcess;

exports.config = {
  runner: "local",

  specs: ["./test/*.spec.js"],

  exclude: [],

  maxInstances: 2,

  capabilities: [
    {
      browserName: "chrome",

      proxy: {
        proxyType: "manual",
        httpProxy: "This will be overriden in beforeSession().",
        sslProxy: "This will be overriden in beforeSession()."
      },

      "goog:chromeOptions": {
        args: ["--disable-web-security"],
        mobileEmulation: {
          deviceName: "iPhone 6"
        }
      }
    }
  ],

  logLevel: "error",

  bail: 0,

  baseUrl: "",

  waitforTimeout: 20000,

  connectionRetryTimeout: 90000,

  connectionRetryCount: 5,

  services: ["selenium-standalone"],

  framework: "mocha",

  reporters: ["spec"],

  mochaOpts: {
    ui: "bdd",
    timeout: 990000
  },

  async beforeSession(config, capabilities) {
    const REGEX_PORT = /port:\s+(\d+)/;
    proxyProcess = spawn("npm", ["run", "mockserver"], {
      stdio: "pipe"
    });
    const port = await new Promise((resolve, reject) => {
      proxyProcess.stdout.on("data", data => {
        const [, portNumber] = REGEX_PORT.exec(data.toString()) || [];
        if (portNumber) {
          resolve(portNumber);
        }
      });
      setTimeout(() => reject(new Error("Failed to load mockserver")), 5000);
    });
    Object.assign(capabilities.proxy, {
      httpProxy: `localhost:${port}`,
      sslProxy: `localhost:${port}`
    });
  },

  async afterSession() {
    const tree = [proxyProcess.pid, ...(await pidtree(proxyProcess.pid))];
    tree.forEach(process.kill);
  }
};
