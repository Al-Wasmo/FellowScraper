import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ReactFlowProvider } from 'reactflow'

createRoot(document.getElementById('root')).render(
        <ReactFlowProvider > <App /> </ReactFlowProvider >
)
