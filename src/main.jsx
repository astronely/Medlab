import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ModalProvider} from "./context/ModalContext.jsx";
import {AppContextProvider} from "./context/AppContext.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AppContextProvider>
          <ModalProvider>
              <App />
          </ModalProvider>
      </AppContextProvider>
  </StrictMode>
)
