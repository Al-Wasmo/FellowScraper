import { create } from 'zustand'


// collection of global stores
// some of them are useless since react flow already implements some of the feat i used, aka needs cleaning

export const useNodeStateStore = create((set) => ({
  nodes: new Map(),
  setNodeState: (id, updater) => set((state) => {
    const next = new Map(state.nodes);
    const prevValue = state.nodes.get(id);
    next.set(id, typeof updater === 'function' ? updater(prevValue) : updater);
    return { nodes: next };
  }),

  setAllNodes: (updater) => {
    set((prev) => ({
      nodes: typeof updater == "function" ? updater(prev.nodes) : new Map(updater),
    }));
  },
}));


export const useCurrentNodeStore = create((set) => ({
  current: -1,
  setCurrentNode: (id) => {
    set({ current: id });
  }
}));


export const useSetWindowMode = create((set) => ({
  mode: 0,
  Comp: undefined,
  setMode: (updater) => {
    set((prev) => ({
      ...prev,mode: typeof updater == "function" ? updater(prev.mode) : updater,
    }));
  },
  setComp: (updater) => {
    set((prev) => ({
      ...prev,Comp: typeof updater == "function" ? updater(prev.Comp) : updater,
    }));
  }  
}));


export const useSetNodeData = create((set) => ({
  state: { id: -1, data: {} },
  setNodeData: (id, data) => {
    set({ state: { id, data } });
  }
}));


