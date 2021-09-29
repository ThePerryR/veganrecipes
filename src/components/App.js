import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RootStoreProvider from './RootStoreProvider'
import Router from './Router'

function App ({ initialState }) {
  var notyf = new window.Notyf();
  return (
    <BrowserRouter>
      <RootStoreProvider initialState={initialState} notyf={notyf}>
        <Router />
      </RootStoreProvider>
    </BrowserRouter>
  )
}

export default App
