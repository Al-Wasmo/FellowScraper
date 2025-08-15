import 'reactflow/dist/style.css';
import './App.css'
import 'react-mosaic-component/react-mosaic-component.css';

import { useEffect } from 'react'
import  { useReactFlow, } from 'reactflow';
import { Mosaic } from 'react-mosaic-component';
import * as Listener from '@thednp/event-listener';
import {  useNodeStateStore, useSetWindowMode } from './lib/state';
import {  onRunFlow } from './lib/ws';
import OptionsMenuWindow from './windows/OptionsWindow';
import FlowWindow from './windows/FlowWindow';
import InfoWindow from './windows/InfoWindow';
import { Toaster } from './components/ui/sonner';
import { toast } from 'sonner';
import { NotMobileOverlay } from './components/NotMobileOverlay';





const ELEMENT_MAP = {
  a: <OptionsMenuWindow />,
  b: <FlowWindow />,
  c: <InfoWindow />,
};


const MosaicValue_WithInfoBar = {
  direction: 'row',
  first: 'a',
  second: {
    direction: 'column',
    first: 'b',
    second: 'c',
    splitPercentage: 70,
  },
  splitPercentage: 16,
}
const MosaicValue_NoInfoBar = {
  direction: 'row',
  first: 'a',
  second: 'b',
  splitPercentage: 16,
}


function App() {
  function dumpState() {
    return {
      nodes: getNodes(),
      edges: getEdges(),
      state: Object.fromEntries(useNodeStateStore.getState().nodes),
    }
  }


  function onSaveState() {
    const { nodes, edges, state } = dumpState();
    localStorage.setItem("nodes", JSON.stringify(nodes));
    localStorage.setItem("edges", JSON.stringify(edges));
    localStorage.setItem("state", JSON.stringify(state));

    toast("State saved successfully");
  }
  async function onRun() {
    const state = dumpState();
    onRunFlow(state);
  }

  useEffect(() => {
    // add listener for ctrl+s to save the state
    Listener.on(document, 'keydown', (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
        event.preventDefault();
        onSaveState();
      }

      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "d") {
        event.preventDefault();
        onRun();
      }
    });
  }, []);



  const windowMode = useSetWindowMode((state) => state.mode);
  const { getNodes, getEdges } = useReactFlow();

  return (<>
    <NotMobileOverlay />
    <Toaster duration={500} theme="light" position={"top-center"} />
    <Mosaic
      className=' bg-[#181818] text-white'
      renderTile={(id) => ELEMENT_MAP[id]}
      resize={{ minimumPaneSizePercentage: 16 }}
      initialValue={windowMode == 0 ? MosaicValue_NoInfoBar : MosaicValue_WithInfoBar}
    />

  </>
  );

}

export default App

