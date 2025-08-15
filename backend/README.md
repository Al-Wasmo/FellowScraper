# FellowScraper Backend

This backend is part of a **FellowScraper tool**.  
It receives scraping instructions from the frontend over **WebSockets**, executes the scraping steps (HTTP requests, HTML parsing, element finding, attribute extraction), and sends the results back to the frontend in real time.

## Features
- **HTTP Request Node** — Fetches web pages with configurable headers, caching, and status reporting.
- **Find Element Node** — Searches for HTML elements by:
  - `id`
  - `class`
  - Any HTML attribute
- **Get Attribute/Text Node** — Extracts text or other attributes from elements.
- **Real-time updates** — Sends progress and data back to the frontend over WebSockets.
- **Node chaining** — Executes nodes sequentially until the end node is reached.

## How it Works
1. The frontend sends a JSON message containing:
   - A **node map** (graph of scraping steps)
   - `startNodeID` and `endNodeID`
2. The backend:
   - Starts at the start node
   - Runs each node function (`requestNode`, `findElemNode`, `getAttrFromElemNode`)
   - Passes output to the next node
3. After each node, it sends results to the frontend via WebSocket.

Example message from frontend:
```json
{
  "action": "run",
  "nodeMap": {
    "node1": {
      "id": "node1",
      "type": "requestNode",
      "data": { "url": "https://example.com" },
      "next": ["node2"]
    },
    "node2": {
      "id": "node2",
      "type": "findElem",
      "data": { "type": "class", "value": "title" },
      "next": ["node3"]
    },
    "node3": {
      "id": "node3",
      "type": "getAttrFromElem",
      "data": { "type": "text" },
      "next": []
    }
  },
  "startNodeID": "node1",
  "endNodeID": "node3"
}
