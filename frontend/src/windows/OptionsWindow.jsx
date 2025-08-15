
import { useNodeStateStore } from '../lib/state';
import { useReactFlow } from 'reactflow';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { ToolTipWrapper } from '../components/ToolTipWrapper';
import { toast } from 'sonner';
import { DocsMenuButton } from '@/components/DocsMenu';
import { ExampleLoader } from '@/components/ExampleLoader';


export default function OptionsMenuWindow() {

    const { getNodes, setNodes } = useReactFlow();

    const NodesMenu = [
        {
            title: "Start",
            tip: "entry point",
            onClick: () => {
                const nodeExist = getNodes().filter(node => node.type == "startNode").length != 0;
                if (!nodeExist) {
                    const node = { id: Math.random().toString(), type: "startNode", position: { x: 600, y: 600 }, data: { label: 'Start' } }
                    setNodes((nodes) => [...nodes, node])
                } else {
                    toast("start node already exist")
                }
            }
        },
        {
            title: "End",
            tip: "last node to be run, just a indicator for the end",
            onClick: () => {
                const nodeExist = getNodes().filter(node => node.type == "endNode").length != 0;
                if (!nodeExist) {

                    const node = { id: Math.random().toString(), type: "endNode", position: { x: 600, y: 600 }, data: { label: 'End' } }
                    setNodes((nodes) => [...nodes, node])

                } else {
                    toast("end node already exist")
                }

            }
        },
        {
            title: "Request",
            tip: "send get requests",
            onClick: () => {
                const ID = Math.random().toString();

                setAllNodes((old) => {
                    let state = old;
                    state.set(ID, { cache: true });
                    return state;
                });
                const node = { id: ID, type: "requestNode", position: { x: 600, y: 600 }, data: { label: 'Request' } }
                setNodes((nodes) => [...nodes, node])
            }
        },
        {
            title: "Find Elem",
            tip: "filter html elems",
            onClick: () => {
                const ID = Math.random().toString();

                setAllNodes((old) => {
                    let state = old;
                    state.set(ID, { cache: true });
                    return state;
                });
                const node = { id: ID, type: "findElem", position: { x: 600, y: 600 }, data: { label: 'Find Elem By' } }
                setNodes((nodes) => [...nodes, node])
            }
        },

        {
            title: "Extract Attr",
            tip: "extract data from html elems",
            onClick: () => {
                const ID = Math.random().toString();

                setAllNodes((old) => {
                    let state = old;
                    state.set(ID, { cache: true });
                    return state;
                });
                const node = { id: ID, type: "getAttrFromElem", position: { x: 600, y: 600 }, data: { label: 'GetAttrFromElem' } }
                setNodes((nodes) => [...nodes, node])
            }
        },
    ]

    const setAllNodes = useNodeStateStore((state) => state.setAllNodes);


    return (
        <div className='w-80 h-full bg-[#181818] flex flex-col p-8 justify-between'>
            <div className='flex flex-col gap-4'>
                <Label>Nodes</Label>
                {
                    NodesMenu.map((option, idx) => {
                        return <ToolTipWrapper delayDuration={400} key={idx} info={option.tip ?? "tip coming soon"} className="outline-1 outline-[#404040]">
                            <Button onClick={option.onClick} className={"bg-white py-0 h-8 text-black hover:bg-neutral-300 cursor-pointer"} >
                                {option.title}
                            </Button>
                        </ToolTipWrapper>
                    })
                }
            </div>

            <div className='w-full flex flex-col gap-4'>

                <ExampleLoader />
                <DocsMenuButton />
            </div>
        </div>
    );
}
