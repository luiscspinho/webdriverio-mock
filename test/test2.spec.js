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
    response: JSON.stringify([
      {
        url: "https://api.github.com/repos/reduxjs/react-redux/issues/1322",
        repository_url: "https://api.github.com/repos/reduxjs/react-redux",
        labels_url:
          "https://api.github.com/repos/reduxjs/react-redux/issues/1322/labels{/name}",
        comments_url:
          "https://api.github.com/repos/reduxjs/react-redux/issues/1322/comments",
        events_url:
          "https://api.github.com/repos/reduxjs/react-redux/issues/1322/events",
        html_url: "https://github.com/reduxjs/react-redux/issues/1322",
        id: 456087163,
        node_id: "MDU6SXNzdWU0NTYwODcxNjM=",
        number: 1322,
        title:
          "code comment recommends using useActions hook in most cases where one would want to use the useDispatch hook",
        user: {
          login: "bmwadforth",
          id: 16732831,
          node_id: "MDQ6VXNlcjE2NzMyODMx",
          avatar_url: "https://avatars0.githubusercontent.com/u/16732831?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/bmwadforth",
          html_url: "https://github.com/bmwadforth",
          followers_url: "https://api.github.com/users/bmwadforth/followers",
          following_url:
            "https://api.github.com/users/bmwadforth/following{/other_user}",
          gists_url: "https://api.github.com/users/bmwadforth/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/bmwadforth/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/bmwadforth/subscriptions",
          organizations_url: "https://api.github.com/users/bmwadforth/orgs",
          repos_url: "https://api.github.com/users/bmwadforth/repos",
          events_url:
            "https://api.github.com/users/bmwadforth/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/bmwadforth/received_events",
          type: "User",
          site_admin: false
        },
        labels: [],
        state: "open",
        locked: false,
        assignee: null,
        assignees: [],
        milestone: null,
        comments: 0,
        created_at: "2019-06-14T06:46:03Z",
        updated_at: "2019-06-14T06:46:03Z",
        closed_at: null,
        author_association: "NONE",
        body:
          "There is a comment in the source code within the useDispatch file located under /src/hooks/useDispatch  that recommends instead of using useDispatch, it is recommended to use the useActions hook in most cases. This comment contradicts the documentation found [here](https://react-redux.js.org/next/api/hooks#recipe-useactions). \r\n\r\nSpecifically, the documentation mentions the useActions hook has been removed.\r\n\r\nThus, the comment within the useDispatch source code should be updated. "
      }
    ]),
    method: "GET",
    statusCode: 200,
    delay: 0
  });
});

describe("Test NPMJS 2", () => {
  it("Test the NPMJS 2", () => {
    browser.url(`https://www.npmjs.com/package/react-redux`);

    browser.waitUntil(() => {
      return $$(".n8Z-E .zE7yA")[0].getText() === "1";
    }, 15000);
    browser.waitUntil(() => {
      return $$(".n8Z-E .zE7yA")[1].getText() === "0";
    }, 15000);
    assert.equal($$(".n8Z-E .zE7yA")[0].getText(), "1");
  });
});
