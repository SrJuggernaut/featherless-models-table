import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HomePage from './app/page'
import './main.css'

const rootElement = document.getElementById('root')

if (rootElement !== null) {
  const root = createRoot(rootElement)
  root.render(
    <StrictMode>
      <HomePage />
    </StrictMode>
  )
}
