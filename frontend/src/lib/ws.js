import { toast } from "sonner";
import { useCurrentNodeStore, useNodeStateStore, useSetNodeData } from "./state";

export let ws = undefined;
export async function initWS() {


  if (ws) {
    if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
      ws.close();
      await new Promise((resolve) => {
        ws.onclose = () => resolve();
      });
    }
    ws = undefined;
  }


  try {

  ws = new WebSocket("ws://localhost:6969");
  } catch(e) {

  }

  await new Promise((resolve, reject) => {
    ws.onopen = () => {
      resolve(true);
      ws.onmessage = (event) => {
        onServerMsg(event.data);
      };
    };
    ws.onerror = (err) => {
      ws = undefined;
      resolve(false);
    };
  });


}




async function onServerMsg(message) {
  message = JSON.parse(message)
  switch (message.action) {
    case "current_node":
      useCurrentNodeStore.getState().setCurrentNode(Number.parseFloat(message.data));
      break;
    case "set_data":
      const nodeID = message.id;

      // console.log(message)

      // set node state to server response
      // and if cache is enabled cache it 
      useNodeStateStore.getState().setNodeState(nodeID, (prev) => {
        let state = { ...prev, ...message.data };

        if (state.cache) {
          let stored = localStorage.getItem("state");
          // if not state, create one
          // else update old one 
          if (stored.toString() != 'null') {
            stored = new Map(Object.entries(JSON.parse(stored)));
          } else {
            stored = new Map({});
          }

          stored.set(nodeID, state);
          stored = Object.fromEntries(stored);
          localStorage.setItem("state", JSON.stringify(stored));
        }

        return state
      });
      useSetNodeData.getState().setNodeData(Number.parseFloat(nodeID));

      break;
    default:
      break;
  }
}




export async function onRunFlow(state) {

  const nodes = state.nodes
  const edges = state.edges
  const nodeState = state.state

  let startNodeID = undefined;
  let endNodeID = undefined;
  let nodeMap = {};
  let edgesMap = {};


  for (let edge of edges) {
    // console.log(edge);
    if (edgesMap[edge.source] == undefined) edgesMap[edge.source] = [];
    edgesMap[edge.source].push(edge.target);
  }




  for (let node of nodes) {
    nodeMap[node.id] = node;
    if (Object.keys(nodeState).includes(node.id)) {
      nodeMap[node.id].data = { ...nodeMap[node.id].data, ...nodeState[node.id] };
    }

    if (Object.keys(edgesMap).includes(node.id)) {
      nodeMap[node.id].next = edgesMap[node.id];
    }

    if (node.type == "startNode") {
      startNodeID = node.id;
    }

    if (node.type == "endNode") {
      endNodeID = node.id;
    }
  }



  await initWS();

  if (!ws) {
    toast("Failed to connect to the websocket", { description: "make sure you local webserver is running, read the docs", duration: 2000 });
    return;
  }


  toast("Running...");
  ws.send(JSON.stringify({
    action: "run",
    nodeMap,
    startNodeID,
    endNodeID,
  }));
}


initWS();
