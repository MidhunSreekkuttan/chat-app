import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './lib/UserContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </BrowserRouter>
)
