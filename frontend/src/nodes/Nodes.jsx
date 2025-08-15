import { Handle, useReactFlow, useUpdateNodeInternals } from "reactflow";
import { useCurrentNodeStore, useNodeStateStore, useSetNodeData, useSetWindowMode } from "../lib/state";
import beautify from "js-beautify";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";
import { DropDownMenu } from "../components/DropDownMenu";
import { ToolTipWrapper } from "../components/ToolTipWrapper";
import { AddHandle, CustomHandle } from "./Handles";
import { ResponseDataRenderer, ScarappedDataRenderer } from "./Info";





export const NodeTypes = {
    startNode: StartNode,
    endNode: EndNode,
    requestNode: (props) => <EditableDoubleNodeWrapper {...props} Comp={RequestNode}>  </EditableDoubleNodeWrapper>,
    findElem: (props) => <EditableDoubleNodeWrapper {...props} Comp={FindElemNode}>  </EditableDoubleNodeWrapper>,
    getAttrFromElem: (props) => <EditableDoubleNodeWrapper {...props} Comp={GetAttrFromElemNode}>  </EditableDoubleNodeWrapper>,
};





function EditableDoubleNodeWrapper({ Comp, ...props }) {
    function onSelect(type, dir) {
        setNodeState(props.id, (prev) => {
            console.log(type, dir)
            let state = { ...prev };
            if (type == "source") {
                state["sourceDir"] = dir;
            } else {
                state["targetDir"] = dir;
            }

            updateNodeInternals(ID);
            return state
        });


    }

    const srv_currNode = useCurrentNodeStore((state) => state.current);
    const selectedStyle = srv_currNode == props.id ? "outline-red-500 outline-4" : "";
    const updateNodeInternals = useUpdateNodeInternals();

    // NOTE: i really hate that the parent and child use the store
    // can i send it down??
    // plus this forces all elems to have a store

    const ID = props.id;
    const value = useNodeStateStore((state) => state.nodes.get(ID));
    const setNodeState = useNodeStateStore((state) => state.setNodeState);

    return (
        <div className={`bg-white p-2 rounded w-fit ${selectedStyle}`}>
            <Comp {...props} />
            {
                (() => {
                    const allHandles = ["top", "bottom", "left", "right"];

                    let handles = [];
                    if (!value?.sourceDir && !value?.targetDir) {
                        handles = ["left", "right"];
                    } else if (value?.sourceDir == null && value?.targetDir !== "right") {
                        handles = ["right", value.targetDir];
                    } else if (value?.targetDir == null && value?.sourceDir !== "left") {
                        handles = ["left", value.sourceDir];
                    } else {
                        handles = [value.sourceDir, value.targetDir];
                    }
                    handles = allHandles.filter(h => !handles.includes(h));

                    return handles.map(handle =>
                        <AddHandle key={handle} onSelect={onSelect} dir={handle} />
                    )
                })()
            }

            <CustomHandle type="source" position={value.sourceDir ?? "right"} />
            <CustomHandle type="target" position={value.targetDir ?? "left"} />

        </div>
    );

}




export function GetAttrFromElemNode(props) {
    const options = [
        { value: "text", label: "Text" },
    ];

    const ID = props.id;

    function onSelectType(option) {
        // console.log(option, ID)
        setNodeState(ID, (prev) => {
            return { ...prev, type: option }
        });
    }

    function onShowData() {
        setWindowMode(1);
        setInfoComp(() => () => <ScarappedDataRenderer data={value.data} />);
    }



    const value = useNodeStateStore((state) => state.nodes.get(ID));
    const setNodeState = useNodeStateStore((state) => state.setNodeState);
    const setWindowMode = useSetWindowMode((state) => state.setMode);
    const setInfoComp = useSetWindowMode((state) => state.setComp);


    return (
        <div className='flex flex-col gap-4 bg-white p-2 rounded w-80'>
            <Label> Extract Attr </Label>
            <DropDownMenu defaultOption={value.type} className="w-full justify-between" options={options} onSelectOption={onSelectType} />
            {value.data && <Button onClick={onShowData}>show data</Button>}
        </div>
    );
}


export function RequestNode(props) {
    function onShowResponse() {
        setWindowMode(1);
        let body = value.text;
        let headers = JSON.stringify(value.headers, null, 2);
        const type = (value.headers["Content-Type"] ?? "text").toLowerCase();
        if (type.includes("application/json")) {
            try {
                body = JSON.stringify(JSON.parse(body), null, 2);
            } catch { }
        } else if (type.includes("text/html")) {
            // only 2000 chars
            const len = body.length;
            const partial = body.slice(0, 2000);
            body = beautify.html(partial, { indent_size: 2 });

            if (len > 2000) {
                body += '...';
            }
        }

        setInfoComp(() => () => <ResponseDataRenderer bodyCropped={body} body={value.text} headers={headers} />);
    }


    function onToggleCache(val) {
        setNodeState(props.id, (prev) => {
            let state = { ...prev, cache: val };
            if (val) {
                state = { ...state, ...data.srv }
            }
            return state
        });
    }


    const srv_currNode = useCurrentNodeStore((state) => state.current);
    const srv_nodeData = useSetNodeData((state) => state.state);
    const value = useNodeStateStore((state) => state.nodes.get(props.id));
    const setNodeState = useNodeStateStore((state) => state.setNodeState);
    const setWindowMode = useSetWindowMode((state) => state.setMode);
    const setInfoComp = useSetWindowMode((state) => state.setComp);

    let data = props.data;

    if (srv_currNode == props.id) {
        if (!value.cache) {
            data.srv = {};
        } else {
            data.srv = { ...value };
        }
    }

    if (srv_nodeData.id == props.id) {
        data = {
            ...data,
            srv: { ...srv_nodeData.data },
        }
    }

    let newRequest = srv_currNode == props.id && (!value.cache || value.last_url != value.url);
    return (<>
        <div className=' flex flex-col gap-3'>
            <Label> Request </Label>
            <div className="flex items-center gap-2">
                <ToolTipWrapper info='cache responses for faster testing'>
                    <Checkbox defaultChecked={value.cache} onCheckedChange={onToggleCache} />
                </ToolTipWrapper>
                <p>cache response</p>
            </div>



            <Input defaultValue={value?.url ?? ""} onChange={event => setNodeState(props.id, (prev) => ({ ...prev, url: event.target.value }))} type="text" placeholder="url" className={"nodrag"} />
            <p>status: {!newRequest ? value?.status : "loading..."}</p>
            {!newRequest && <Button onClick={onShowResponse}>show response</Button>}



        </div>

    </>

    );
}



export function FindElemNode(props) {
    const options = [
        { value: "id", label: "Id" },
        { value: "class", label: "Class" },
        { value: "attr", label: "Attr" },
        { value: "name", label: "Name" },
    ];


    const ID = props.id;



    function onNameChange(value) {
        setNodeState(ID, (prev) => ({ ...prev, attr_name: value }));
    }

    function onValueChange(value) {
        setNodeState(ID, (prev) => ({ ...prev, value: value }));
    }

    function onSelectType(option) {
        setNodeState(ID, (prev) => {
            return { ...prev, type: option }
        });
    }

    function onInsertIndex(allSelected) {
        setNodeState(ID, (prev) => {
            return { ...prev, outputIndexes: allSelected }
        });
    }


    function onShowData() {
        setWindowMode(1);

        let elems = [];
        for (let elem of value.elems) {
            elems.push(beautify.html(elem, { indent_size: 2 }))
        }
        setInfoComp(() => () => <ScarappedDataRenderer state={value} data={elems} actions={{ onInsertIndex: onInsertIndex }} />);
    }



    const value = useNodeStateStore((state) => state.nodes.get(ID));
    const setNodeState = useNodeStateStore((state) => state.setNodeState);

    const setWindowMode = useSetWindowMode((state) => state.setMode);
    const setInfoComp = useSetWindowMode((state) => state.setComp);

    return (
        <div className='flex flex-col gap-4 w-80 p-2'>
            <Label> FindElem </Label>

            <DropDownMenu defaultOption={value.type} className="w-full justify-between" options={options} onSelectOption={onSelectType} />

            {
                value.type == "attr" &&
                <div className="w-full flex flex-row gap-4  nodrag">
                    <Label className={"min-w-9"}> Name </Label>
                    <Input defaultValue={value?.attr_name ?? ""} onChange={event => onNameChange(event.target.value)} type="text" placeholder="" className='border' />
                </div>
            }

            <div className="w-full flex flex-row gap-4 nodrag">
                <Label className={"min-w-9"}> Value </Label>
                <Input defaultValue={value?.value ?? ""} onChange={event => onValueChange(event.target.value)} type="text" placeholder="" className='border' />
            </div>


            {value.elems && <Button onClick={onShowData}>show data</Button>}
        </div>
    );
}



export function StartNode(props) {

    return (
        <div className='flex flex-col gap-2 items-center w-40 bg-white p-2 rounded'>
            <Label> Start </Label>
            <CustomHandle type="source" position="right" />
        </div>
    );
}

export function EndNode(props) {
    const srv_currNode = useCurrentNodeStore((state) => state.current);
    const selectedStyle = srv_currNode == props.id ? "outline-red-500 outline-4" : ""
    return (
        <div className={`bg-white p-2 rounded w-40 ${selectedStyle}`}>
            <div className='flex flex-col gap-2 items-center'>
                <Label> End </Label>
                <CustomHandle type="target" position="left" />
            </div>
        </div>
    );
}

