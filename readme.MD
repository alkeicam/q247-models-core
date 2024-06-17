

# Q247 Models
Model and reference implementation of developer effort models for Q247 plugin

## Key features

- Pluggable model architecture
- Easy to provide custom made models
- 2 sample models to start with are provided

## Provided models
As of today model based on Shanon's entropy model is provided in two versions. You can read more about Shanon's entropy at [this link](https://en.wikipedia.org/wiki/Entropy_(information_theory))

## Installation

```bash
$ npm install js-confuser
```

## Usage

```js
const {ShanonEntropyScoreModelV2} = require("q247-models")

const q247Event = {
  gitlog: "commit 5fc617ef5ede5d7ff6ffef0ba3205afe3e2a337e\nAuthor: xxxxx xxxxx <xxxxx.xxxxx@somecompany.pl>\nDate:   Sat Jun 8 18:44:46 2024 +0200\n\n    PWR-01 cleaning\n\n index.js | 5 +----\n 1 file changed, 1 insertion(+), 4 deletions(-)\n",
  oper: "commit",
  remote: "/Users/xxxxx/Documents/Projekty/gitspace/private/grm-microservices/process",
  diff: "commit 5fc617ef5ede5d7ff6ffef0ba3205afe3e2a337e\nAuthor: xxxxx xxxxx <xxxxx.xxxxx@somecompany.pl>\nDate:   Sat Jun 8 18:44:46 2024 +0200\n\n    PWR-01 cleaning\n\ndiff --git a/index.js b/index.js\nindex d7c4190..d232a53 100644\n--- a/index.js\n+++ b/index.js\n@@ -101,11 +101,8 @@ function attachNewPostOperation(appHandler, version, path, context, operationHan\n attachNewGetOperation(app, version, path, \"/transition/available/:typeId/:entityId\", manager.availableTransitions.bind(manager));\n attachNewPostOperation(app, version, path, \"/transition/execute/:typeId/:entityId/:transitionCode\", manager.transitionExecute.bind(manager));\n attachNewPostOperation(app, version, path, \"/instance/:typeId/:entityId\", manager.postProcessInstance.bind(manager));\n-\n attachNewGetOperation(app, version, path, \"/instance/:typeId/:entityId\", manager.getProcessInstance.bind(manager));\n-\n attachNewGetOperation(app, version, path, \"/definition/:typeId\", manager.getProcessDefinition.bind(manager));\n attachNewPostOperation(app, version, path, \"/definition/:typeId\", manager.postProcessDefinition.bind(manager));\n \n-attachNewGetOperation(app, version, path, \"/instance/:typeId/:entityId/history\", manager.getProcessInstanceHistory.bind(manager));\n-\n+attachNewGetOperation(app, version, path, \"/instance/:typeId/:entityId/history\", manager.getProcessInstanceHistory.bind(manager));\n\\ No newline at end of file\n",
  account: "a_somecompany",
  user: "xxxxx.xxxxx@somecompany.pl",
  project: "4r3t7x7fj6",
  id: "xj8d6c840o",
  ct: 1718393469569,
  decoded: {
    ticket: "PWR-01",
    ticketPrefix: "PWR",
    commit: "commit 5fc617ef5ede5d7ff6ffef0ba3205afe3e2a337e",
    author: {
      name: "xxxxx xxxxx",
      email: "xxxxx.xxxxx@somecompany.pl",
    },
    date: "Date:   Sat Jun 8 18:44:46 2024 +0200",
    message: "PWR-01 cleaning",
    changes: [
      " index.js | 5 +----",
    ],
    changeSummary: {
      raw: " 1 file changed, 1 insertion(+), 4 deletions(-)",
      files: 1,
      inserts: 1,
      deletions: 4,
    },
  }
}

const model = new ShanonEntropyScoreModelV2();
const score = await model.score(q247Event);
        
```

## `async score(gitEvent)`

Calculates effort scoring for provided `gitEvent`. Returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that resolves to a `Score` object.

| Parameter | Type | Description |
| --- | --- | --- |
| `gitEvent` | `object` | Git event object from q247 plugin |
