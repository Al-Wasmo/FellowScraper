# FellowoScraper Frontend

## Overview

* **Canvas Area** – Built with React Flow for visual node editing and linking.
* **Options Panel** – Sidebar for quickly adding new nodes.
* **Info Panel** – Contextual display showing details or controls related to the selected node.
* **Layout Manager** – Powered by React Mosaic for flexible pane arrangements.
* **Persistent Storage** – Saves and restores flow state (nodes, edges, viewport) from `localStorage`.
* **Keyboard Shortcuts** – Supports actions like save and run.

## Architecture

1. **UI Framework**: React provides the base component structure.
2. **Flow Rendering**: React Flow handles the node graph, connections, and interactions.
3. **Pane Layout**: React Mosaic organizes panels for the canvas, options, and info.
4. **State Management**: Zustand maintains global app state, including current node selection and layout mode.
5. **User Feedback**: Sonner delivers toast notifications for key actions.


## Notes
* This is a **frontend-only** application.
* You can design, save, and reload scraping flows entirely in the browser.
* Running the flows would require connecting to a separate backend.
