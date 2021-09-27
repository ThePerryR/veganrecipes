import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import RootStoreProvider from './RootStoreProvider'
import Router from './Router'

function App ({ initialState }) {
  return (
    <BrowserRouter>
      <RootStoreProvider initialState={initialState}>
        <Router />
      </RootStoreProvider>
    </BrowserRouter>
  )
}

export default App
