import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.scss'
import ImgProvider from './context/imgContext'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ImgProvider>
      <DndProvider backend={HTML5Backend}>
        <App />
      </DndProvider>
    </ImgProvider>
  </React.StrictMode>,
)
