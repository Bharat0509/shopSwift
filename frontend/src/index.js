import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import { positions, transitions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { Toaster } from 'react-hot-toast'

const root = ReactDOM.createRoot(document.getElementById('root'))

const options = {
  timeout: 5000,
  position: positions.BOTTOM_RIGHT,
  transition: transitions.SCALE
}

root.render(
  <Provider store={store}>
    <Toaster position='top-center' reverseOrder={false} />
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>
)
