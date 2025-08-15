import { useCallback, useEffect, useRef, useState } from 'react';
import { useCurrentNodeStore, useNodeStateStore, useSetNodeData, useSetWindowMode } from '../lib/state';
import ReactFlow, { addEdge, Background, Controls, MiniMap, useEdgesState, useNodesState, useOnViewportChange, useReactFlow } from 'reactflow';
import { NodeTypes } from '../nodes/Nodes';


export default function FlowWindow() {
    const reactFlowInstace = useReactFlow();

    useEffect(() => {
        // load from local storage any saved state
        const nodes = localStorage.getItem("nodes");
        const edges = localStorage.getItem("edges");
        const state = localStorage.getItem("state");
        if (state && nodes.toString() != 'null') { setNodes(JSON.parse(nodes)); }
        if (state && edges.toString() != 'null') { setEdges(JSON.parse(edges)); }
        if (state && state.toString() != 'null') { setAllNodes(new Map(Object.entries(JSON.parse(state)))); }
    }, []);

    useEffect(() => {
        let viewport = localStorage.getItem("viewport");
        if (viewport && viewport.toString() != 'null') {
            viewport = JSON.parse(viewport);
            reactFlowInstace.setViewport(viewport);
        }
    }, [reactFlowInstace])

    useOnViewportChange({
        onEnd: (viewport) => {
            localStorage.setItem("viewport", JSON.stringify(viewport))
        },
    });



    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const onConnect = useCallback((params) => {
        setEdges((eds) => addEdge(params, eds)), [setEdges]
    });
    const setAllNodes = useNodeStateStore((state) => state.setAllNodes);


    return <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={NodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        className='text-black'
        viewport={viewport}
    >

        <Controls />
        <Background />
        <MiniMap style={{ "background": "#181818" }} />

    </ReactFlow>

}