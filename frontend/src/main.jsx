import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import UserContextProvider from './lib/UserContext.jsx'
import ChatContextProvider from './lib/ChatContext.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './index.css'
import App from './App.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <ChatContextProvider>
          <App />
        </ChatContextProvider>
      </QueryClientProvider>
    </UserContextProvider>
  </BrowserRouter>
)
