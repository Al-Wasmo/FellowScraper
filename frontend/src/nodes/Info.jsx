import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef, useState } from "react";
import { CopySaveButtons } from "@/components/CopySaveButtons";




// when clicking to show more info on a node
// one of those here are selected, based on the node 


export function ScarappedDataRenderer({ state, data, actions }) {

    return <div className="flex flex-col gap-8 p-4 overflow-y-scroll rounded overflow-scroll">
        {actions && <>
            <OutputIndexesSelector state={state} data={data} actions={actions} />
        </>
        }

        <div className="flex flex-col gap-2 relative">
            <div className="flex flex-row justify-between">
                <Label className={"text-xl"}>Data</Label>
                <div className="self-end">
                    <CopySaveButtons data={data} />
                </div>

            </div>

            <div className="bg-[#202020] relative flex flex-col p-4 max-h-80 overflow-y-scroll rounded overflow-scroll">
                {
                    data.map((item, idx) => {
                        return <p key={idx} style={{ whiteSpace: "pre" }}>{item}</p>
                    })
                }
            </div>
        </div>
    </div>

}


export function ResponseDataRenderer({ body, bodyCropped, headers }) {

    return <div className="flex flex-col gap-8 p-4 overflow-y-scroll rounded overflow-scroll">

        <div className="flex flex-col gap-2 ">
            <h1 className="font-bold text-xl">Headers:</h1>
            <div className="self-end">
                <CopySaveButtons data={headers} />
            </div>
            <div className="bg-[#202020] p-4 max-h-80 overflow-y-scroll rounded overflow-scroll">
                <p style={{ whiteSpace: "pre" }}>{headers}</p>
            </div>
        </div>


        <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Data:</h1>
            <div className="self-end">
                <CopySaveButtons data={body} />
            </div>
            <div className="bg-[#202020] p-4 max-h-80 overflow-y-scroll rounded overflow-scroll">
                <p style={{ whiteSpace: "pre" }}>{bodyCropped}</p>
            </div>
        </div>
    </div>

}




function OutputIndexesSelector({ state, data, actions }) {
    function onInsertIndex() {
        const value = ref.current.value;
        let allSelected = selected;
        if (value && Number.parseInt(value) <= data.length) {
            if (!selected.includes(value)) {
                allSelected = [...allSelected, value];
                setSelected((prev) => [...prev, value])
            }
            actions.onInsertIndex(allSelected);
        }
    }

    function onRemoveIndex(idx) {
        let allSelected = selected;
        if (idx && Number.parseInt(idx) <= data.length) {
            if (selected.includes(idx)) {
                allSelected = selected.filter((v) => v !== idx);
                setSelected((prev) => prev.filter((v) => v !== idx));
            }
            actions.onInsertIndex(allSelected);
        }
    }



    const [selected, setSelected] = useState(state.outputIndexes ?? []);
    const ref = useRef();



    return <div className="flex flex-col gap-2">
        <Label className={"text-xl"}>Output</Label>
        <div className="flex flex-row gap-4 items-start">
            <Input ref={ref} placeholder="insert a index" type={"number"}></Input>
            <Button onClick={onInsertIndex} className={"bg-white py-0 h-8 text-black hover:bg-neutral-300 cursor-pointer"} >
                Insert
            </Button>
        </div>


        <dir className="flex flex-row gap-2">
            {
                selected &&
                selected.map((index, idx) => {
                    return <Button onClick={() => onRemoveIndex(index)} key={idx} className={"bg-white py-0 h-8 text-black hover:bg-red-400 hover:text-white cursor-pointer"} >
                        {index}
                    </Button>
                })
            }
        </dir>
    </div>
}