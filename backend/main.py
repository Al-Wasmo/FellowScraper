import json
import asyncio
from nodes import *
from websockets.asyncio.server import serve






async def run_scraper(message,websocket):
    node_map = message["nodeMap"]
    start_node_id = message["startNodeID"]
    end_node_id = message["endNodeID"]
    
    curr_node_id = start_node_id
    curr_node = node_map[curr_node_id]
    prev_node = curr_node
    while curr_node_id != end_node_id:

        await websocket.send(json.dumps({
            "action": "current_node",
            "data" : curr_node_id,
        }))

        node_type = curr_node["type"]
        if node_type == "requestNode":
            await requestNode(websocket,prev_node,curr_node)
        elif node_type == "findElem":
            await findElemNode(websocket,prev_node,curr_node)
        elif node_type == "getAttrFromElem":
            await getAttrFromElemNode(websocket,prev_node,curr_node)
        else:
            pass


        curr_node_id = node_map[curr_node_id]["next"][0]
        prev_node = curr_node
        curr_node = node_map[curr_node_id]


    await websocket.send(json.dumps({
        "action": "current_node",
        "data" : curr_node_id,
    }))
    
    

async def run(websocket):
    async for message in websocket:
        message = json.loads(message)
        if message["action"] == "run":
            await run_scraper(message,websocket)


async def main():
    async with serve(run, "0.0.0.0", 6969, max_size=20 * 1024 * 1024) as server:
        await server.serve_forever()


asyncio.run(main())


