import json
import requests
from bs4 import BeautifulSoup
from consts import headers



def findBy(node_type,attr_name,value,html):
    soup = BeautifulSoup(html, "html.parser")

    elems = []
    if node_type == "id":
        elem = soup.find(id=value)
        if elem:
            elems = [elem]
    elif node_type == "class":
        elems = soup.find_all(class_=value)
    elif node_type == "attr":
        elems = soup.find_all(attrs={attr_name: value})
    else:
        print("uknown type")
        return

    if elems:
        elems = [str(e) for e in elems]

    return elems

async def requestNode(websocket,prev_node,node):
    ID = node["id"]

    url = node["data"].get("url","")
    cache = node["data"].get("cache",False)
    last_url = node["data"].get("last_url","")
    
    
    if cache and url == last_url:
        header = node["data"]["headers"]
        status = node["data"]["status"]
        text = node["data"]["text"]                
    else:
        response = requests.get(url,headers=headers,timeout=4)
        header = dict(response.headers)
        status = response.status_code
        text   = response.text             


    node["data"]["header"] = header
    node["data"]["status"] = status
    node["data"]["text"] = text


    await websocket.send(json.dumps({
        "action": "set_data",
        "id": ID,
        "data" : {
            "last_url": url,
            "headers": header,
            "status":  status,
            "text":    text,
        },
    })) 

async def findElemNode(websocket,prev_node,node):
    ID = node["id"]
    node_type = node["data"].get("type","")
    attr_name = node["data"].get("attr_name","")
    value = node["data"].get("value","")


    html = []
    elems = []
    if prev_node["type"] == "requestNode":
        html = [prev_node["data"].get("text","")]
    elif prev_node["type"] == "findElem":
        outputIndexes = prev_node["data"].get("outputIndexes",[])
        if len(outputIndexes) != 0:
            html = prev_node["data"].get("elems",[])
            if html:
                html = [html[int(i)] for i in outputIndexes]
        else:
            html = prev_node["data"].get("elems",[])
    for elem in html:
        elems.extend(findBy(node_type,attr_name,value,elem))

    await websocket.send(json.dumps({
        "action": "set_data",
        "id": ID,
        "data" : {
            "elems" : elems
        },
    })) 

async def getAttrFromElemNode(websocket,prev_node,node):
    ID = node["id"]
    data_type = node["data"].get("type","")

    html = []
    if prev_node["type"] == "requestNode":
        html = [prev_node["data"].get("text","")]
    elif prev_node["type"] == "findElem":
        outputIndexes = prev_node["data"].get("outputIndexes",[])
        if len(outputIndexes) != 0:
            html = prev_node["data"].get("elems",[])
            if html:
                html = [html[int(i)] for i in outputIndexes]
        else:
            html = prev_node["data"].get("elems",[])        


    data = []
    if data_type == "text":
        data = [
            BeautifulSoup(elem, "html.parser").get_text(strip=True)
            for elem in html
        ]

    
    await websocket.send(json.dumps({
        "action": "set_data",
        "id": ID,
        "data" : {
            "data" : data
        },
    }))     


