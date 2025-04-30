import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Docs from './Pages/Docs.jsx'
import Error from './Pages/Error.jsx'
import {Routes, BrowserRouter, Route} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/docs" element={<Docs />}/>
        <Route path="*" element={<Error />} />
    </Routes>
</BrowserRouter>
)
